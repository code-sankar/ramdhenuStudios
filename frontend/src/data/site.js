/**
 * SITE CONFIGURATION
 * ===========================================================================
 * Everything a non-developer would realistically edit lives in /src/data —
 * components never hardcode copy.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LAUNCH CHECKLIST — every ⚠ below is a placeholder. Work down the list.  │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  1. `contact`        real phone, WhatsApp number, email, studio address  │
 * │  2. `socials`        real profile URLs (currently "#")                   │
 * │  3. `enquiry`        set `endpoint` if the host handles form POSTs       │
 * │  4. `siteUrl`        the live domain — used by SEO tags + structured data │
 * │  5. work.js          drop `placeholder` on each project as it goes live  │
 * │  6. testimonials.js  drop `placeholder` on each quote you have rights to │
 * │  7. legal.js         have the privacy policy and terms reviewed          │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/** ⚠ PLACEHOLDER — the live domain. Used for canonical URL and structured data. */
export const siteUrl = "https://ramdhenu.studio";

export const brand = {
  name: "Ramdhenu",
  wordmark: "RAMDHENU",
  tagline: "A step towards digital presence",
  since: "Since 2024",
  description:
    "Ramdhenu is a digital agency for local businesses that want more than a website — strategy, visuals and campaigns, working as one.",
};

/** ⚠ PLACEHOLDER — every value here is a stand-in. */
export const contact = {
  email: "hello@ramdhenu.studio",
  emailHref: "mailto:hello@ramdhenu.studio",
  phone: "+91 6002830014 || +91 9395805628",
  phoneHref: "tel:+916002830014",
  /**
   * Country code + number, DIGITS ONLY — no +, no spaces, no dashes.
   * wa.me percent-encodes anything else into the path and the link dies with
   * "phone number shared via url is invalid", so "91 9395805628" does not work
   * where "919395805628" does.
   */
  whatsappNumber: "919395805628",
  studio: "Dibrugarh, Assam, India",
  city: "Dibrugarh",
  region: "Assam",
  country: "IN",
  hours: "Mon – Sat · 10:00 – 19:00",
};

/**
 * ENQUIRY HANDLING
 * ---------------------------------------------------------------------------
 * The form works today with no backend: it composes the enquiry and hands it
 * to WhatsApp, with email as a fallback. Both land somewhere the team already
 * reads.
 *
 * To store submissions instead, set `endpoint` to a URL that accepts a POST
 * (Formspree, a serverless function, a CRM webhook). The form then posts JSON
 * and reports success inline; WhatsApp stays available as the second path.
 * Nothing else needs to change.
 */
export const enquiry = {
  endpoint: null,
  whatsappGreeting:
    "Hi Ramdhenu, I'd like to talk about growing my business online.",
};

export const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  enquiry.whatsappGreeting,
)}`;

/**
 * Each item is either a home-page anchor (`id`, highlighted by scroll
 * position) or a real route (`path`, highlighted by the current URL). "Work"
 * is the only one of the second kind — it is not a section of the home page.
 */
export const nav = [
  /* `menu` marks the one item that opens a dropdown. The six entries inside it
     are built by the Header from services.js rather than listed here: this
     module is imported by seo.js, so importing the route helpers back out of
     seo.js to build hrefs would close a cycle. One boolean avoids that, and
     the menu can never fall out of step with the services themselves. */
  { label: "Services", id: "services", menu: true },
  { label: "Work", path: "/work/" },
  { label: "About", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

/** Where a nav item points: its own route, or a hash into the home page. */
export const navHref = (item) => item.path ?? `/#${item.id}`;

/** ⚠ PLACEHOLDER — replace "#" with the real profile URLs. */
export const socials = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Facebook", href: "#", icon: "facebook" },
];

/**
 * ABOUT VIDEO
 * ---------------------------------------------------------------------------
 * The "who we are" film in the About section.
 *
 * Set `id` to the YouTube video ID — the part after `?v=` in the watch URL:
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  id: "dQw4w9WgXcQ"
 *
 * Until then the block renders a drawn blueprint plate marked as a sample, the
 * same way unpublished project work does, so nothing on the page pretends to be
 * finished.
 *
 * ⚠️  `poster` should be your own still, exported at 1600×900 into
 *     src/assets/ and referenced as:
 *       poster: new URL("../assets/about-poster.jpg", import.meta.url).href
 *
 *     Do NOT point it at https://i.ytimg.com/… — that is a third-party request
 *     on every page load, and the privacy policy states that nothing reaches
 *     YouTube until a visitor presses play. A local still keeps that true.
 */
export const aboutVideo = {
  id: "Iy-dJwHVX84",
  title: "Ramdhenu — who we are",
  poster: "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797",
  caption: "A short introduction to the team, how we work, and who we build for.",
};

/** The disciplines listed down the right of the hero. */
export const disciplines = ["Web & Landing Pages", "Photography & Video", "Ads & Google Business"];

/**
 * ABOUT — capability facts, true on day one.
 * Deliberately not "120+ projects delivered": a new agency claiming volume it
 * hasn't earned is the fastest way to lose a local business owner's trust.
 * These describe how the team is built, which is verifiable now.
 */
export const stats = [
  { value: "06", label: "Disciplines under one roof" },
  { value: "01", label: "Coordinated team, one point of contact" },
  { value: "10", label: "Local industries served" },
  { value: "48h", label: "Typical first response" },
];

/**
 * Industries the agency starts with, shown as chips in the About section.
 *
 * Any label matching an entry in /src/data/industries.js renders as a link to
 * that page — so the order here decides which get linked from the home page.
 * The six with pages are listed first for that reason.
 */
export const industries = [
  "Restaurants & Cafés",
  "Hotels & Resorts",
  "Clinics & Healthcare",
  "Salons & Spas",
  "Real Estate",
  "Coaching Centres",
  "Gyms",
  "Boutiques",
  "Local Retail",
  "Tourism",
];
