/**
 * PRICING
 * ---------------------------------------------------------------------------
 * Three packages that map to the growth journey: get found → stay visible →
 * acquire customers. Each tier explicitly builds on the one before it so the
 * value ladder is readable at a glance.
 */

/** The five stages of the growth journey, mirrored from the About section. */
export const journey = ["Discovery", "Trust", "Enquiry", "Customer", "Growth"];

export const packages = [
  {
    id: "presence",
    step: "Step 01",
    name: "Digital Presence",
    intent: "Get found and look credible.",
    price: "₹19,999",
    period: "One-time",
    priceNote: "Foundation build · delivered in 3–4 weeks",
    covers: 2, // Discovery, Trust
    inherits: null,
    features: [
      "Professional Website",
      "Google Business Setup / Optimization",
      "Basic SEO",
      "Professional Photography",
      "Social Media Setup",
      "Basic Branding Assets",
    ],
    cta: { label: "Get Started", target: "contact" },
    popular: false,
  },
  {
    id: "growth",
    step: "Step 02",
    name: "Business Growth",
    intent: "Stay visible and build trust every month.",
    price: "₹24,999",
    period: "/month",
    priceNote: "Ongoing retainer · rolling monthly",
    covers: 3, // Discovery, Trust, Enquiry
    inherits: null,
    features: [
      "Monthly Photography",
      "Social Media Management",
      "Reels",
      "Social Media Creatives",
      "Google Business Management",
      "Website Maintenance",
      "Monthly Reporting",
    ],
    cta: { label: "Get Started", target: "contact" },
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "acquisition",
    step: "Step 03",
    name: "Customer Acquisition",
    intent: "Turn visibility into a predictable flow of customers.",
    price: "₹39,999",
    period: "/month",
    priceNote: "+ ad spend, billed directly to your ad account",
    covers: 5, // the full journey through to Growth
    inherits: "Business Growth",
    features: [
      "Meta Ads",
      "Google Ads",
      "Landing Pages",
      "Lead Tracking",
      "Conversion Optimization",
      "Performance Reporting",
    ],
    cta: { label: "Book a Strategy Call", target: "contact" },
    popular: false,
  },
];

/** Reassurance line under the pricing grid. */
export const pricingNotes = [
  "GST applicable as per Indian tax regulations.",
  "Custom scopes available for multi-location and franchise businesses.",
  "No long lock-in — monthly plans run on a rolling basis.",
];
