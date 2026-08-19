import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Multi-page build, not a single-page app.
 *
 * The six service pages exist to be found in search. A client-side router would
 * serve one index.html for every URL, leaving the title, description and
 * structured data identical for all of them unless JavaScript runs — and it
 * would need a host rewrite rule before deep links worked at all. Real HTML
 * files at real paths avoid both problems and work on any static host.
 *
 * Inputs are discovered from services/*\/index.html, so adding a service is
 * `node scripts/generate-service-pages.mjs` and nothing else.
 */
const servicePages = Object.fromEntries(
  fs
    .readdirSync(path.resolve(root, "services"), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => [`service-${e.name}`, path.resolve(root, "services", e.name, "index.html")]),
);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(root, "index.html"),
        ...servicePages,
      },
    },
  },
});
