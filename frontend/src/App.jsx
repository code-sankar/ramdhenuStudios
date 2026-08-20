import { BrowserRouter, Route, Routes } from "react-router-dom";

import Analytics from "./components/Analytics";
import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/HomePage";
import IndustryPage from "./pages/IndustryPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServicePage from "./pages/ServicePage";
import WorkPage from "./pages/WorkPage";

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
 * Trailing slashes are the canonical form — /services/<slug>/,
 * /industries/<slug>/ and /work/ — and the router matches with or without one.
 *
 * Service pages explain a discipline; industry pages explain a trade and route
 * into the services that matter most for it.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
