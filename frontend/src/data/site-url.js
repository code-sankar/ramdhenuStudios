/**
 * WHERE THIS SITE LIVES — resolved once, from the environment.
 * ===========================================================================
 * `siteUrl` is not decoration. Every canonical link, every `og:url`, every
 * absolute URL in the structured data and every entry in the sitemap is built
 * from it. Hard-coded, it is the one value that is wrong the moment the site
 * is deployed anywhere other than the domain someone typed months earlier —
 * and a canonical pointing at a domain that does not resolve is worse than no
 * canonical at all: it tells a crawler the real page is somewhere else, and
 * that somewhere else is nowhere.
 *
 * So it comes from the environment, in this order:
 *
 *   1. VITE_SITE_URL             the custom domain, set explicitly. Always wins.
 *   2. the Vercel production URL on a production deployment with no custom
 *                                domain set yet — better than a guess.
 *   3. the Vercel deployment URL on a preview build, so a preview's canonicals
 *                                point at the preview rather than at production.
 *   4. the fallback below        local builds, and anything not on Vercel.
 *
 * TWO PROCESSES HAVE TO AGREE ON THE ANSWER, which is the whole reason this is
 * a function rather than four `||`s at the point of use. `vite build` bakes it
 * into the bundle the browser runs; `scripts/generate-static-routes.mjs` is a
 * separate Node process that writes the same head into the HTML. If the two
 * resolved it differently, a crawler and a visitor would be told different
 * canonical URLs for the same page.
 */

/** ⚠ The intended live domain. Used when nothing in the environment says otherwise. */
const FALLBACK = "https://ramdhenu.studio";

/* Vercel hands out its URLs bare — "project.vercel.app", no scheme. */
const https = (host) => (host ? `https://${host.replace(/^https?:\/\//, "")}` : null);

/** No trailing slash, ever: every path this is joined to already starts with one. */
const trim = (url) => url.replace(/\/+$/, "");

export const resolveSiteUrl = (env = {}) =>
  trim(
    env.VITE_SITE_URL ||
      (env.VERCEL_ENV === "production" && https(env.VERCEL_PROJECT_PRODUCTION_URL)) ||
      https(env.VERCEL_URL) ||
      FALLBACK,
  );

/**
 * WHETHER THIS BUILD MAY BE INDEXED.
 *
 * Every Vercel branch and pull request gets its own public URL, and left alone
 * those get crawled — a dozen copies of the same six service pages on a dozen
 * hostnames, competing with the real ones. That is the classic way a site with
 * otherwise good SEO ends up ranking its own staging build.
 *
 * Only a production deployment is indexable. Anything else — a preview, a
 * branch, a local build someone uploads by hand — is marked `noindex` in every
 * page's head AND disallowed wholesale in robots.txt, because the two answer
 * different questions: robots.txt stops the crawl, the meta tag stops anything
 * already in the index from staying there.
 */
export const resolveIndexable = (env = {}) => {
  /* VITE_INDEXABLE is what vite.config.js bakes in for the browser, because
     VERCEL_ENV is not a `VITE_` variable and so never reaches the bundle. The
     build decides; both runtimes read the same decision. */
  if (env.VITE_INDEXABLE != null) return String(env.VITE_INDEXABLE) !== "false";
  return env.VERCEL_ENV ? env.VERCEL_ENV === "production" : true;
};
