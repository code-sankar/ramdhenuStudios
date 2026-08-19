/**
 * Generates one real HTML file per service, at services/<slug>/index.html.
 *
 * Run from the package root after adding, removing or renaming a service:
 *
 *   node scripts/generate-service-pages.mjs
 *
 * These are committed, not built artefacts — Vite needs them on disk as build
 * inputs, and keeping them in the repo means the routes are reviewable in a
 * diff. Each carries its own title, description, canonical and Service
 * structured data, which is the entire reason the site is a multi-page build
 * rather than a single-page app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { services } = await import(path.join(root, "src/data/services.js"));
const { siteUrl, brand, contact } = await import(path.join(root, "src/data/site.js"));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const page = (s) => {
  const url = `${siteUrl}/services/${s.slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    serviceType: s.title,
    url,
    provider: {
      "@type": "ProfessionalService",
      name: brand.name,
      url: `${siteUrl}/`,
      telephone: contact.phone,
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: contact.city,
        addressRegion: contact.region,
        addressCountry: contact.country,
      },
    },
    areaServed: { "@type": "State", name: contact.region },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} — what's included`,
      itemListElement: s.includes.map((i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: i },
      })),
    },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/#services` },
      { "@type": "ListItem", position: 3, name: s.short, item: url },
    ],
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1d2d3d" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="canonical" href="${url}" />

    <title>${esc(s.metaTitle)}</title>
    <meta name="description" content="${esc(s.metaDescription)}" />
    <meta name="author" content="${esc(brand.name)}" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${esc(brand.name)}" />
    <meta property="og:title" content="${esc(s.metaTitle)}" />
    <meta property="og:description" content="${esc(s.metaDescription)}" />
    <meta property="og:image" content="${siteUrl}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="preload" as="font" type="font/woff2" href="/fonts/barlow-condensed-600-latin.woff2" crossorigin />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/barlow-400-latin.woff2" crossorigin />

    <!-- The masthead fills the first screen with the steel field; paint it
         before React mounts so there is no paper-white flash. -->
    <style>
      html { background-color: #1d2d3d; }
    </style>

    <script type="application/ld+json">
${JSON.stringify(ld, null, 6).replace(/^/gm, "    ")}
    </script>
    <script type="application/ld+json">
${JSON.stringify(crumbs, null, 6).replace(/^/gm, "    ")}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/service.jsx"></script>
  </body>
</html>
`;
};

let n = 0;
for (const s of services) {
  const dir = path.join(root, "services", s.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(s));
  console.log(`  services/${s.slug}/index.html`);
  n++;
}

/* The sitemap has to list them too, or the whole exercise is invisible. */
const urls = [`${siteUrl}/`, ...services.map((s) => `${siteUrl}/services/${s.slug}/`)];
fs.writeFileSync(
  path.join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${u.endsWith("services/") || !u.includes("/services/") ? "1.0" : "0.8"}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`,
);
console.log(`  public/sitemap.xml (${urls.length} urls)`);
console.log(`\n${n} service pages generated.`);
