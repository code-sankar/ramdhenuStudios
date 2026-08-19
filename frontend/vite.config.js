import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

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
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
