/**
 * SITE CONTENT
 * ---------------------------------------------------------------------------
 * Everything a non-developer would realistically edit lives in /src/data —
 * components never hardcode copy.
 *
 * ⚠️  PLACEHOLDERS: phone, email, address and social URLs are stand-ins
 *     carried over from the design. Replace before launch.
 */

export const brand = {
  name: "Ramdhenu",
  wordmark: "RAMDHENU",
  tagline: "A step towards digital presence",
  since: "Since 2024",
};

export const contact = {
  email: "hello@ramdhenu.studio",
  emailHref: "mailto:hello@ramdhenu.studio",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  studio: "Guwahati, Assam, India",
};

export const nav = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

export const socials = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Facebook", href: "#", icon: "facebook" },
];

export const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
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
