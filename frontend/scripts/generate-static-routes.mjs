/**
 * Writes one real HTML file per route, straight after `vite build`.
 *
 *   npm run build            (vite build && node scripts/generate-static-routes.mjs)
 *
 * The pages are React components now — src/pages, routed by src/App.jsx — so
 * there is no HTML per service to hand-edit. But the reason those files existed
 * has not gone away:
 *
 *   Deep links. A single index.html plus a client-side router needs a rewrite
 *   rule on the host before /services/photography-videography/ resolves to
 *   anything. A real file at that path works on any static host, unconfigured.
 *
 *   Search. These pages exist to rank. One index.html for every URL means one
 *   title, one description and one set of structured data for all six unless
 *   the crawler runs the JavaScript.
 *
 * So every route gets the built index.html with its own head substituted in.
 * The head comes from src/data/seo.js — the same module <Seo> reads at runtime,
 * which is what stops the static head and the rendered one drifting apart.
 *
 * Add a service to src/data/services.js and it appears here on the next build.
 * Nothing else to run.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const { staticRoutes, headTags, absoluteUrl } = await import(path.join(root, "src/data/seo.js"));
const { indexable, siteUrl } = await import(path.join(root, "src/data/site.js"));

const template = (() => {
  const file = path.join(dist, "index.html");
  if (!fs.existsSync(file)) {
    console.error("dist/index.html is missing — run `vite build` first.");
    process.exit(1);
  }
  return fs.readFileSync(file, "utf8");
})();

/* Everything between the markers in index.html belongs to whichever route is
   being written. Nothing else in the document changes. */
const SLOT = /[ \t]*<!--seo:start-->[\s\S]*?<!--seo:end-->/;

if (!SLOT.test(template)) {
  console.error("index.html has no <!--seo:start--> … <!--seo:end--> block to write into.");
  process.exit(1);
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* `</script` inside JSON-LD would close the block early — escaping the angle
   bracket keeps the JSON valid and the document intact. */
const escapeScript = (text) => text.replace(/</g, "\\u003c");

/**
 * One route's head. Every tag carries `data-seo`, which is how <Seo> knows
 * which tags are the route's: on a client-side navigation it removes exactly
 * this set and writes the next route's, rather than appending a second
 * canonical to the first one.
 */
const renderHead = (meta, indent = "    ") => {
  const open = (tag, attrs) =>
    `<${tag} data-seo` +
    Object.entries(attrs)
      .map(([name, value]) => ` ${name}="${escapeAttr(value)}"`)
      .join("");

  /* The title is not stamped: a document has exactly one, and <Seo> replaces
     its text through document.title rather than replacing the element. */
  const lines = [`${indent}<title>${escapeAttr(meta.title)}</title>`];

  for (const { tag, attrs, text } of headTags(meta)) {
    if (text == null) {
      lines.push(`${indent}${open(tag, attrs)} />`);
    } else {
      lines.push(`${indent}${open(tag, attrs)}>`);
      lines.push(escapeScript(text).replace(/^/gm, indent));
      lines.push(`${indent}</${tag}>`);
    }
  }

  return lines.join("\n");
};

const routes = staticRoutes();

for (const route of routes) {
  const file = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, template.replace(SLOT, renderHead(route.seo)));
  console.log(`  dist/${route.file}`);
}

/* The sitemap has to list them, or the whole exercise is invisible. */
const listed = routes.filter((route) => route.path && !route.seo.robots);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${listed
  .map(
    (route) =>
      `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`,
);
console.log(`  dist/sitemap.xml (${listed.length} urls)`);

/**
 * robots.txt, WRITTEN HERE RATHER THAN KEPT IN public/.
 *
 * It used to be a static file naming the domain in plain text, one copy of a
 * value that also lives in the canonical of every page — and the two would
 * have parted company the first time the site was deployed anywhere else. A
 * `Sitemap:` line pointing at a hostname that is not this one is worse than no
 * line: it sends the crawler somewhere else entirely.
 *
 * A NON-PRODUCTION BUILD DISALLOWS EVERYTHING. Preview deployments are public
 * URLs, and an indexed preview is a second copy of the whole site competing
 * with the real one. The head carries `noindex` on those builds too — this
 * stops the crawl, that clears anything already indexed, and neither does the
 * other's job.
 */
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
    : `# Non-production deployment — not for indexing.\nUser-agent: *\nDisallow: /\n`,
);
console.log(`  dist/robots.txt (${indexable ? "indexable" : "noindex — non-production"})`);

console.log(`\n${routes.length} routes written for ${siteUrl}`);
