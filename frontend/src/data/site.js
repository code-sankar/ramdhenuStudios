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
 * │  5. services.js      PROJECTS_ARE_PLACEHOLDER → false, once work is real │
 * │  6. testimonials.js  TESTIMONIALS_ARE_PLACEHOLDER → false                │
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
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  /** Country code + number, digits only — this is what wa.me expects. */
  whatsappNumber: "919876543210",
  studio: "Guwahati, Assam, India",
  city: "Guwahati",
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

export const nav = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

/** ⚠ PLACEHOLDER — replace "#" with the real profile URLs. */
export const socials = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Facebook", href: "#", icon: "facebook" },
];

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

/** Industries the agency starts with — drives the structured data's service area. */
export const industries = [
  "Restaurants & Cafés",
  "Hotels & Resorts",
  "Salons",
  "Gyms",
  "Clinics",
  "Coaching Centres",
  "Real Estate",
  "Boutiques",
  "Local Retail",
  "Tourism",
];
