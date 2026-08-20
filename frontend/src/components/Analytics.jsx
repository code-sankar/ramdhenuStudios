import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { analyticsScript } from "../data/analytics";
import { markAnalyticsReady, trackPageview } from "../lib/track";

/* Config is static, so resolve it once rather than on every render. */
const script = analyticsScript();

/**
 * Loads the analytics provider and counts a pageview per route.
 *
 * Renders nothing, requests nothing when analytics is off, and sets no cookie
 * when it is on — see src/data/analytics.js for why only cookieless providers
 * are offered.
 *
 * The pageview effect is the part that matters. The site is a client-side
 * router: a visitor who lands on the home page and clicks through to three
 * service pages performs one document load and three route changes. An
 * auto-tracking script would record that as a single pageview, which would
 * make the service pages — the ones built to rank — look like they get no
 * traffic at all.
 */
export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!script || document.querySelector("script[data-analytics]")) return;

    const el = document.createElement("script");
    el.src = script.src;
    el.defer = true;
    el.setAttribute("data-analytics", "");
    for (const [name, value] of Object.entries(script.attrs)) el.setAttribute(name, value);
    el.addEventListener("load", markAnalyticsReady);
    document.head.appendChild(el);
  }, []);

  useEffect(() => {
    trackPageview();
  }, [pathname, search]);

  return null;
}
