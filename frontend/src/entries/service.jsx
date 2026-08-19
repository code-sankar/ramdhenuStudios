import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../styles/theme.css";
import "../styles/app.css";

import ServicePage from "../pages/ServicePage";
import { serviceBySlug, services } from "../data/services";

/**
 * Shared entry for every /services/<slug>/ page.
 *
 * The site is a multi-page build rather than a single-page app: each service is
 * a real HTML file at a real URL. That matters here specifically — these pages
 * exist to rank, and a client-side router would serve one index.html for every
 * URL, leaving the title, description and structured data identical for all six
 * unless JavaScript runs. It also means deep links work on any static host with
 * no rewrite rule.
 *
 * So the markup differs per page and this entry is shared: it reads the slug
 * back out of the path and renders the matching service.
 */
const slug = window.location.pathname.replace(/\/+$/, "").split("/").pop();
const service = serviceBySlug(slug);

if (service) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ServicePage service={service} />
    </StrictMode>,
  );
} else {
  /* Only reachable if an HTML file exists without a matching data entry —
     i.e. someone renamed a slug and did not regenerate. Fail loudly in dev. */
  console.error(
    `No service matches "${slug}". Known slugs: ${services.map((s) => s.slug).join(", ")}. ` +
      "Re-run: node scripts/generate-service-pages.mjs",
  );
  window.location.replace("/#services");
}
