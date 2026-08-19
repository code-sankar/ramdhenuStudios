import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServicePage from "./pages/ServicePage";

/**
 * RAMDHENU — every page of the site, as components.
 *
 * The six service pages used to be six hand-written HTML files that each
 * mounted the same React tree. They are routes now, and the head each one needs
 * to rank — title, description, canonical, Service and BreadcrumbList schema —
 * comes from <Seo> and src/data/seo.js rather than from markup kept in step by
 * hand.
 *
 * The build still writes a real HTML file for each of these paths (see
 * scripts/generate-static-routes.mjs), so deep links keep working on any static
 * host with no rewrite rule, and a crawler that never runs the JavaScript still
 * gets the right head. The router is what serves them once the app has booted.
 *
 * Trailing slashes are the canonical form — /services/<slug>/ — and the router
 * matches with or without one.
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
