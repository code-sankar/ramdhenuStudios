/**
 * WORK
 * ===========================================================================
 * The portfolio catalog — one entry per project, and the single source for
 * two things: the full grid at /work/, and the one example shown in "The
 * work" section of the service page each project demonstrates.
 *
 * That second use is why entries are shaped as `services: [slug, …]` rather
 * than living inside a single service's data. A project can prove more than
 * one discipline (a shoot that also fed the social calendar, a site built
 * alongside a rebrand), and duplicating the same project once per service it
 * touched would let the two copies drift the moment one was edited.
 *
 * ⚠️  Every project below is illustrative, supplied for layout — see
 *     `placeholder` on each entry. Replace with real, permissioned work
 *     before launch: swap the image, correct the description to what
 *     actually happened, and drop that entry's `placeholder`. Never before
 *     the client has agreed to be named — see PORTFOLIO-README below.
 *
 * Nothing here claims a result. Descriptions say what was built, not a
 * number this agency cannot yet stand behind.
 */

export const work = [
  {
    slug: "m-fitness",
    placeholder: true,
    name: "M Fitness",
    client: "M Fitness",
    category: "Fitness",
    services: ["website-design-development"],
    tags: ["Web Development", "Fitness", "Landing Page"],
    motif: "web",
    image:
      "https://res.cloudinary.com/dx7b8hfwm/image/upload/v1787157619/Screenshot_2026-08-19_220941_dripzc.png",
    desc: "A fast, mobile-first website with class schedules, trainer profiles and a booking flow built to turn a scroll into a signed-up member.",
  },
  {
    slug: "the-bamboo-kitchen",
    placeholder: true,
    name: "The Bamboo Kitchen",
    client: "The Bamboo Kitchen",
    category: "Restaurant",
    services: ["photography-videography"],
    tags: ["Photography", "Restaurant"],
    motif: "photography",
    image: null,
    desc: "A full menu shoot plus a reel series that gave the restaurant a consistent, appetising feed and stronger delivery-app listings.",
  },
  {
    slug: "fitlife-gym",
    placeholder: true,
    name: "FitLife Gym",
    client: "FitLife Gym",
    category: "Fitness",
    services: ["social-media-management"],
    tags: ["Social Media", "Fitness"],
    motif: "social",
    image: null,
    desc: "A month-by-month content system — transformation stories, trainer reels and offer creatives — built to keep enquiries flowing.",
  },
  {
    slug: "elite-interiors",
    placeholder: true,
    name: "Elite Interiors",
    client: "Elite Interiors",
    category: "Interiors",
    services: ["performance-marketing"],
    tags: ["Performance Marketing", "Interiors"],
    motif: "marketing",
    image: null,
    desc: "Meta and Google campaigns paired with a dedicated landing page and call tracking, so every rupee of ad spend is accountable.",
  },
  {
    slug: "aurora-salon-spa",
    placeholder: true,
    name: "Aurora Salon & Spa",
    client: "Aurora Salon & Spa",
    category: "Salon",
    services: ["google-business-management"],
    tags: ["Google Business", "Salon"],
    motif: "local",
    image: null,
    desc: "A one-page booking site plus a fully optimised Google Business Profile that put the salon on the map for nearby searches.",
  },
  {
    slug: "chabua-tea",
    placeholder: true,
    name: "Chabua Tea",
    client: "Chabua Tea",
    category: "Retail",
    services: ["graphic-design-branding"],
    tags: ["Branding & Identity", "Retail"],
    motif: "branding",
    image: null,
    desc: "A visual identity and packaging system that carries the estate's heritage onto shelves and into online listings.",
  },
];

/**
 * The example shown in a service page's "The work" section. First match by
 * position in the array, which is also displayed order — so promoting a
 * project to the top of `work` is how you change which one a service shows,
 * without touching the service page itself.
 */
export const workByService = (slug) => work.find((project) => project.services.includes(slug));

export const workBySlug = (slug) => work.find((project) => project.slug === slug);

/** Every discipline actually represented, in the order they first appear. */
export const workCategories = () => {
  const seen = new Set();
  const out = [];
  for (const project of work) {
    for (const service of project.services) {
      if (!seen.has(service)) {
        seen.add(service);
        out.push(service);
      }
    }
  }
  return out;
};
