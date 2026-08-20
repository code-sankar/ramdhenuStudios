/**
 * ANALYTICS
 * ===========================================================================
 * Off by default. Set `provider` and `siteId` and the site starts measuring;
 * leave `provider: null` and not one byte is requested from anyone.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TO TURN IT ON                                                          │
 * │                                                                         │
 * │  Plausible  → sign up, add your domain, then:                           │
 * │                 provider: "plausible", siteId: "ramdhenu.studio"        │
 * │  Umami      → create a website, copy its ID, then:                       │
 * │                 provider: "umami", siteId: "<the website id>"           │
 * │                                                                         │
 * │  Self-hosting either one? Put your own script URL in `src`.             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Both are cookieless and store no personal data, which is why they are the
 * two offered here: the privacy policy can stay short and true, and there is
 * no consent banner to put between a visitor and the enquiry form. Google
 * Analytics would change both of those things.
 *
 * ⚠️  src/data/legal.js reads `provider` and changes what the privacy policy
 *     says about tracking. Turning this on rewrites that paragraph for you —
 *     but have the policy reviewed before launch either way.
 */

export const analytics = {
  /** "plausible" | "umami" | null. null keeps the site tracker-free. */
  provider: null,

  /** Plausible: the domain you registered. Umami: the website ID. */
  siteId: "",

  /** Override only when self-hosting. Empty uses the provider's cloud. */
  src: "",
};

/**
 * The script each provider needs.
 *
 * Both are the MANUAL variants. The site is a client-side router now, so the
 * automatic ones would count the first page a visitor lands on and nothing
 * after it — every service page reached by clicking a link would be invisible.
 * <Analytics> sends the pageviews itself instead, on every route change.
 */
const scripts = {
  plausible: {
    src: "https://plausible.io/js/script.manual.js",
    attrs: (siteId) => ({ "data-domain": siteId }),
  },
  umami: {
    src: "https://cloud.umami.is/script.js",
    attrs: (siteId) => ({ "data-website-id": siteId, "data-auto-track": "false" }),
  },
};

/** Null when analytics is off or half-configured — callers treat that as "do nothing". */
export const analyticsScript = () => {
  const config = scripts[analytics.provider];
  if (!config || !analytics.siteId) return null;
  return {
    src: analytics.src || config.src,
    attrs: config.attrs(analytics.siteId),
  };
};

export const analyticsEnabled = () => analyticsScript() !== null;
