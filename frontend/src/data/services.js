/**
 * SERVICES — the accordion.
 * Each discipline carries one project that demonstrates it. Opening a row
 * reveals that project.
 *
 * `image` is null until real client photography is shot: the figure then
 * renders a drawn blueprint plate rather than stock imagery. To publish a
 * real photograph, drop it in /src/assets/work/ and set:
 *   image: new URL("../assets/work/bamboo-kitchen.jpg", import.meta.url).href
 *
 * ⚠️  The businesses below are illustrative examples supplied for layout.
 *     Replace with real, permissioned client work before launch.
 */

export const PROJECTS_ARE_PLACEHOLDER = true;

export const services = [
  {
    num: "01",
    title: "Website Design & Development",
    blurb: "Modern, responsive websites designed to turn visitors into customers.",
    project: {
      name: "Greenwood Resort",
      tags: ["Web Development", "Hospitality"],
      motif: "web",
      image: null,
      desc: "A booking-focused website with room galleries, enquiry tracking and a fast mobile experience for travellers planning on the move.",
    },
  },
  {
    num: "02",
    title: "Photography & Videography",
    blurb: "Professional visuals that showcase your products, people and brand.",
    project: {
      name: "The Bamboo Kitchen",
      tags: ["Photography", "Restaurant"],
      motif: "photography",
      image: null,
      desc: "A full menu shoot plus a reel series that gave the restaurant a consistent, appetising feed and stronger delivery-app listings.",
    },
  },
  {
    num: "03",
    title: "Social Media Management",
    blurb: "Content calendars, community and channel growth.",
    project: {
      name: "FitLife Gym",
      tags: ["Social Media", "Fitness"],
      motif: "social",
      image: null,
      desc: "A month-by-month content system — transformation stories, trainer reels and offer creatives — built to keep enquiries flowing.",
    },
  },
  {
    num: "04",
    title: "Performance Marketing",
    blurb: "Meta Ads, Google Ads and campaigns measured on enquiries.",
    project: {
      name: "Elite Interiors",
      tags: ["Performance Marketing", "Interiors"],
      motif: "marketing",
      image: null,
      desc: "Meta and Google campaigns paired with a dedicated landing page and call tracking, so every rupee of ad spend is accountable.",
    },
  },
  {
    num: "05",
    title: "Google Business Management",
    blurb: "Local search, Maps visibility and the reviews that follow.",
    project: {
      name: "Aurora Salon & Spa",
      tags: ["Google Business", "Salon"],
      motif: "local",
      image: null,
      desc: "A one-page booking site plus a fully optimised Google Business Profile that put the salon on the map for nearby searches.",
    },
  },
  {
    num: "06",
    title: "Graphic Design & Branding",
    blurb: "Logo systems, packaging, guidelines and visual language.",
    project: {
      name: "Chabua Tea",
      tags: ["Branding & Identity", "Retail"],
      motif: "branding",
      image: null,
      desc: "A visual identity and packaging system that carries the estate's heritage onto shelves and into online listings.",
    },
  },
];
