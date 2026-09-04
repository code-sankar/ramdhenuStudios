/**
 * Fills each built page's <div id="root"> with the markup React would render.
 *
 *   npm run build   (vite build && generate-static-routes.mjs && this)
 *
 * generate-static-routes.mjs gives every route its own <head> — title,
 * description, canonical, structured data. It leaves the body alone, so what
 * shipped was 25 pages whose entire visible content was an empty <div>. A
 * crawler that runs JavaScript eventually sees the copy; one that does not
 * sees nothing at all, and even Google defers rendering to a second pass that
 * a new site waits at the back of. For a site whose whole job is to be found,
 * the words belong in the HTML.
 *
 * WHY A BROWSER RATHER THAN react-dom/server. Server rendering needs every
 * component to survive with no window, no IntersectionObserver and no layout —
 * this app's figures measure themselves, Parallax reads scroll, and the motion
 * components want a document. Guarding all of that is a change to dozens of
 * files and a new way for the site to break. A real browser runs the app the
 * way a visitor's browser does, so there is nothing to guard and nothing new
 * to keep in step.
 *
 * WHY REDUCED MOTION IS THE WHOLE TRICK. Reveal, Stagger, SectionIndex, Hero
 * and the figures all check `prefers-reduced-motion` and render their final
 * state outright when it is set — no entrance, no `opacity: 0` waiting on a
 * viewport intersection. Captured in that mode every section is present and
 * visible, including the ones far below the fold that would otherwise be
 * serialised mid-animation, i.e. as hidden text. Emulating it is what makes
 * the output honest rather than a snapshot of a page still animating in.
 *
 * NOTHING IS HYDRATED. src/main.jsx calls createRoot, not hydrateRoot, so
 * React replaces this markup wholesale when it mounts. That is deliberate: it
 * means the prerendered HTML cannot desynchronise from the app, and a mismatch
 * between them is not an error to chase. It exists for readers that never run
 * the bundle, and as something to paint before the bundle arrives.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const { staticRoutes } = await import(path.join(root, "src/data/seo.js"));

/* The 404 page is the one route with no URL of its own — nothing links to it
   and nothing should index it, so there is nothing to gain by rendering it. */
const routes = staticRoutes().filter((route) => route.path);

/**
 * Chromium comes from the environment, not from a path written down here.
 * Playwright finds its own download unaided; PRERENDER_CHROMIUM covers the
 * machines where the browser lives somewhere else, which is the case in CI
 * images that ship one preinstalled.
 */
const executablePath = process.env.PRERENDER_CHROMIUM || undefined;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

/**
 * The pages are written with a trailing slash and live at <path>/index.html,
 * which is exactly what the host serves in production. Serving them the same
 * way here means the app resolves the same routes it will resolve live —
 * a server that redirected or rewrote differently would prerender the wrong
 * page into the right file, which is the one failure that would not be
 * obvious afterwards.
 */
const serve = () =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(dist, url);
      /* Resolve inside dist or not at all. */
      if (!file.startsWith(dist)) {
        res.writeHead(403).end();
        return;
      }
      if (!path.extname(file)) file = path.join(file, "index.html");
      if (!fs.existsSync(file)) {
        res.writeHead(404, { "content-type": "text/html" }).end("not found");
        return;
      }
      res.writeHead(200, {
        "content-type": TYPES[path.extname(file)] || "application/octet-stream",
      });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "\n  ⚠ PRERENDER SKIPPED — playwright is not installed.\n" +
      "    The pages keep their heads but ship an empty body, which is what\n" +
      "    shipped before this script existed. The site works; it is just\n" +
      "    harder to find. Install playwright to restore it.\n",
  );
  process.exit(0);
}

const server = await serve();
const origin = `http://127.0.0.1:${server.address().port}`;

let browser;
try {
  browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
} catch (error) {
  server.close();
  /* A missing browser must not take the deployment down with it. The build
     stays green and the pages stay valid — they just go out thin, and this
     says so loudly enough to be caught in a build log. */
  console.error(
    "\n  ⚠ PRERENDER SKIPPED — chromium would not start.\n" +
      `    ${error.message.split("\n")[0]}\n` +
      "    The pages ship with an empty body. Run `npx playwright install\n" +
      "    chromium`, or point PRERENDER_CHROMIUM at an existing binary.\n",
  );
  process.exit(0);
}

/* Reduced motion is the reason the output is usable at all — see the top of
   this file. The viewport is tall so that anything keyed to the viewport has
   room to settle; the width is a desktop one because the layout's widest
   arrangement carries the most content. */
const context = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 1280, height: 2000 },
});

/* The film is 3MB of splash that no crawler will ever watch, and waiting for
   it to arrive on every one of 25 pages is the difference between a build that
   takes a minute and one that takes five. Nothing it does touches the DOM. */
await context.route("**/*.mp4", (route) => route.abort());

let filled = 0;
for (const route of routes) {
  const page = await context.newPage();
  const file = path.join(dist, route.file);

  try {
    await page.goto(origin + route.path, {
      waitUntil: "networkidle",
      timeout: 45000,
    });
    /* networkidle says the traffic stopped, not that React committed. */
    await page.waitForFunction(
      () => document.getElementById("root")?.children.length > 0,
      null,
      { timeout: 20000 },
    );

    /**
     * LET THE ENTRANCES FINISH, THEN INSIST.
     *
     * Reduced motion is not quite the whole story. Reveal and the figures do
     * render their final state under it, but Hero, Stagger and SectionIndex
     * only zero the *delay* — they still run `initial="hidden"` → `animate`,
     * so for the length of that animation their content sits at `opacity: 0`.
     * Serialising then writes the headline into the HTML as invisible text,
     * which is worse than leaving the body empty: an empty body is nothing to
     * read, hidden text is something to distrust.
     *
     * So wait for them to land, which is the honest state of the page, and
     * then strip whatever inline opacity and transform are left over anyway.
     * Nothing is lost by stripping: motion writes those properties itself on
     * mount, this markup is replaced wholesale by createRoot, and anything
     * genuinely meant to stay hidden is hidden by a class or the `hidden`
     * attribute rather than by an animation frame.
     */
    await page
      .waitForFunction(
        () =>
          ![...document.getElementById("root").querySelectorAll("*")].some(
            (el) => el.style.opacity !== "" && Number(el.style.opacity) < 1,
          ),
        null,
        { timeout: 4000 },
      )
      .catch(() => {}); /* stragglers are handled below */

    const markup = await page.evaluate(() => {
      const root = document.getElementById("root");
      for (const el of root.querySelectorAll("[style]")) {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
      }
      return root.innerHTML;
    });

    /* An empty or near-empty capture means the page did not actually render,
       and writing it would replace a known-empty body with a differently
       empty one while reporting success. Leave the file as it was. */
    if (markup.trim().length < 500) {
      console.error(`  ⚠ ${route.file} rendered nothing — left as built`);
      await page.close();
      continue;
    }

    const html = fs.readFileSync(file, "utf8");
    const slot = '<div id="root"></div>';
    if (!html.includes(slot)) {
      console.error(`  ⚠ ${route.file} has no empty #root to fill — skipped`);
      await page.close();
      continue;
    }

    fs.writeFileSync(file, html.replace(slot, `<div id="root">${markup}</div>`));
    filled += 1;
    const kb = String(Math.round(markup.length / 1024)).padStart(4);
    console.log(`  ${kb}kb  dist/${route.file}`);
  } catch (error) {
    /* One bad route does not justify shipping 24 thin pages. */
    console.error(`  ⚠ ${route.file} — ${error.message.split("\n")[0]}`);
  }

  await page.close();
}

await browser.close();
server.close();

console.log(`\n${filled}/${routes.length} routes prerendered`);

/* Every route failing is not a slow page, it is a broken setup, and it should
   not reach production disguised as a successful build. */
if (filled === 0) {
  console.error("Prerendering produced nothing — check the errors above.");
  process.exit(1);
}
