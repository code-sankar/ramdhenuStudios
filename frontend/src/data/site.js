/**
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Brand-level content and contact details. Everything a non-developer would
 * realistically need to change lives in /src/data — components never hardcode
 * copy.
 *
 * ⚠️  PLACEHOLDERS: phone, WhatsApp, email, address and social URLs below are
 *     stand-ins. Replace them with real details before the site goes live.
 */

export const brand = {
  name: "Ramdhenu Studios",
  shortName: "Ramdhenu",
  tagline: "A step towards digital presence",
  positioning: "Digital Growth Partner for Local Businesses",
  description:
    "We are a digital growth agency helping businesses build their brand, get visibility and generate more leads and sales.",
};

export const contact = {
  phoneLabel: "+91 98640 00000",
  phoneHref: "tel:+919864000000",
  whatsappNumber: "919864000000", // country code + number, digits only
  whatsappMessage:
    "Hi Ramdhenu Studios, I'd like to know more about growing my business online.",
  email: "hello@ramdhenustudios.com",
  emailHref: "mailto:hello@ramdhenustudios.com",
  location: "Dibrugarh, Assam, India",
  locationNote: "Serving local businesses across Upper Assam",
  hours: "Mon – Sat · 10:00 AM – 7:00 PM",
};

export const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

export const nav = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Our Work", id: "work" },
  { label: "Process", id: "process" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
];

export const socials = [
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
];

export const legal = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
];
