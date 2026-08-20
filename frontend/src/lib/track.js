import { analytics } from "../data/analytics";

/**
 * Sending events, without every caller having to know whether analytics is on.
 *
 * `track()` and `trackPageview()` are always safe to call: with no provider
 * configured they do nothing, and calls made before the script finishes
 * loading are held and replayed once it does — otherwise the pageview for the
 * page someone actually landed on, the one that fires first, would be the one
 * that got lost.
 */
let loaded = false;
let queue = [];

/** Called by <Analytics> when the provider's script has loaded. */
export function markAnalyticsReady() {
  loaded = true;
  for (const run of queue) run();
  queue = [];
}

const whenReady = (run) => (loaded ? run() : queue.push(run));

/**
 * One named event, with optional properties.
 *
 *   track("Enquiry sent", { via: "whatsapp", service: "Website Design" })
 *
 * Keep names human — they are what you read in the dashboard, and renaming one
 * later splits its history in two.
 */
export function track(event, props = {}) {
  if (!analytics.provider) return;
  whenReady(() => {
    if (analytics.provider === "plausible") window.plausible?.(event, { props });
    else if (analytics.provider === "umami") window.umami?.track?.(event, props);
  });
}

/** A pageview for whatever the URL currently is. */
export function trackPageview() {
  if (!analytics.provider) return;
  whenReady(() => {
    if (analytics.provider === "plausible") window.plausible?.("pageview");
    else if (analytics.provider === "umami") window.umami?.track?.();
  });
}
