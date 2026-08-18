/**
 * PORTFOLIO
 * ---------------------------------------------------------------------------
 * Each project renders as a case-study card. `image` is intentionally null:
 * until real client photography is shot, cards render a designed brand cover
 * (see components/ui/ProjectCover.jsx) rather than fake stock imagery.
 *
 * To publish a real project, drop the photo in /src/assets/work/ and set:
 *   image: new URL("../assets/work/bamboo-kitchen.jpg", import.meta.url).href
 *
 * ⚠️  The businesses below are illustrative examples supplied for layout.
 *     Replace with real, permissioned client work before launch.
 */

export const PROJECTS_ARE_PLACEHOLDER = true;

export const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "photography", label: "Photography" },
  { id: "branding", label: "Branding" },
  { id: "social", label: "Social Media" },
  { id: "marketing", label: "Marketing" },
];

const catalogue = [
  {
    id: "bamboo-kitchen",
    name: "The Bamboo Kitchen",
    category: "photography",
    categoryLabel: "Food Photography",
    description:
      "A full menu shoot plus a reel series that gave the restaurant a consistent, appetising feed and stronger delivery-app listings.",
    deliverables: ["Menu shoot", "Reels", "Google photos"],
    image: null,
    featured: true,
  },
  {
    id: "greenwood-resort",
    name: "Greenwood Resort",
    category: "web",
    categoryLabel: "Website Design & Development",
    description:
      "A booking-focused website with room galleries, enquiry tracking and a fast mobile experience for travellers planning on the move.",
    deliverables: ["Website", "Booking flow", "SEO setup"],
    image: null,
    featured: true,
  },
  {
    id: "fitlife-gym",
    name: "FitLife Gym",
    category: "social",
    categoryLabel: "Social Media Management",
    description:
      "A month-by-month content system — transformation stories, trainer reels and offer creatives — built to keep enquiries flowing.",
    deliverables: ["Content calendar", "Reels", "Creatives"],
    image: null,
  },
  {
    id: "chabua-tea",
    name: "Chabua Tea",
    category: "branding",
    categoryLabel: "Branding & Packaging",
    description:
      "A visual identity and packaging system that carries the estate's heritage onto shelves and into online listings.",
    deliverables: ["Identity", "Packaging", "Brand guide"],
    image: null,
  },
  {
    id: "elite-interiors",
    name: "Elite Interiors",
    category: "marketing",
    categoryLabel: "Performance Marketing",
    description:
      "Meta and Google campaigns paired with a dedicated landing page and call tracking, so every rupee of ad spend is accountable.",
    deliverables: ["Meta Ads", "Landing page", "Lead tracking"],
    image: null,
  },
  {
    id: "aurora-salon",
    name: "Aurora Salon & Spa",
    category: "web",
    categoryLabel: "Website & Google Business",
    description:
      "A one-page booking site plus a fully optimised Google Business Profile that put the salon on the map for nearby searches.",
    deliverables: ["Website", "Google Business", "Photography"],
    image: null,
  },
];

/**
 * Covers are assigned deterministically rather than at random:
 *   coverVariant — the project's rank inside its own category, so two web
 *                  projects never draw the same wireframe.
 *   coverWash    — its position in the catalogue, so the light source moves
 *                  across the grid instead of tiling.
 * Both are stable regardless of which filter is active.
 */
const rank = {};
export const projects = catalogue.map((project, index) => {
  rank[project.category] = (rank[project.category] ?? -1) + 1;
  return { ...project, coverVariant: rank[project.category], coverWash: index };
});
