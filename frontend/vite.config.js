import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { resolveIndexable, resolveSiteUrl } from "./src/data/site-url.js";

/**
 * One entry, many pages.
 *
 * The pages themselves are React components under src/pages, routed by
 * src/App.jsx — there is no HTML file per service to keep in step any more.
 * What used to justify the multi-page build is preserved after it instead:
 * `npm run build` runs scripts/generate-static-routes.mjs, which writes a real
 * HTML file at every route with that route's own title, description, canonical
 * and structured data. Deep links land on a real file on any static host, and
 * a crawler that never runs the JavaScript still reads the right head.
 *
 * THE DEPLOYMENT'S IDENTITY IS BAKED IN HERE, and it has to be. `VERCEL_ENV`
 * and `VERCEL_URL` are ordinary environment variables, not `VITE_` ones, so
 * they never reach the bundle on their own — the browser would fall back to
 * the default domain while the prerender, which runs in Node and can see them,
 * used the real one. Two different canonical URLs for the same page, one shown
 * to a crawler and one written after the first client-side navigation.
 *
 * So the build resolves both values once and defines them. src/data/site.js
 * reads the same two names from whichever runtime it finds itself in.
 */
export default defineConfig(() => {
  const siteUrl = resolveSiteUrl(process.env);
  const indexable = resolveIndexable(process.env);

  if (!indexable) {
    console.log(`  · ${siteUrl} — non-production build, marked noindex`);
  }

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
      "import.meta.env.VITE_INDEXABLE": JSON.stringify(String(indexable)),
    },
  };
});
