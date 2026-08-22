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
 * number this agency cannot yet stand behind. That rule extends to `brief`,
 * `approach` and `shipped`: they describe work, never an outcome. The moment
 * one of these says "doubled enquiries", it needs a client willing to be quoted
 * saying it.
 *
 * ── THE FIELDS A CASE STUDY NEEDS ──────────────────────────────────────────
 *
 *   desc       one line, used on the grid card
 *   brief      what the client arrived with — the problem, not the solution
 *   approach   [{ heading, body }] — what was done and, more usefully, why
 *   shipped    the deliverables, plainly listed
 *   gallery    [{ src, alt }] — optional, rendered only when it has entries
 *   liveUrl    the client's live site
 *   year       displayed in the masthead
 *
 * ⚠️  `liveUrl` IS NULL ON EVERY ENTRY BELOW AND THAT IS DELIBERATE. A link to
 *     a client's site is a claim that we built it, and inventing one would be
 *     the single most damaging thing in this file. Fill it in only with a real
 *     URL for a real project the client has agreed to be named for. Where it is
 *     null the "Visit site" link is not rendered at all, on the card or on the
 *     project page — there is no broken state to tidy up later.
 *
 * A placeholder project still gets its own page, so the template can be seen
 * working, but that page is `noindex` until `placeholder` is dropped. Sample
 * case studies are for looking at, not for Google to file.
 */

export const work = [
  {
    slug: "m-fitness",
    placeholder: true,
    name: "M Fitness",
    client: "M Fitness",
    category: "Fitness",
    year: "2025",
    services: ["website-design-development"],
    tags: ["Web Development", "Fitness", "Landing Page"],
    motif: "web",
    image:
      "https://res.cloudinary.com/dx7b8hfwm/image/upload/v1787157619/Screenshot_2026-08-19_220941_dripzc.png",
    liveUrl: null,
    desc: "A fast, mobile-first website with class schedules, trainer profiles and a booking flow built to turn a scroll into a signed-up member.",
    brief:
      "A gym with a full timetable and no way for anyone to see it without messaging first. Enquiries arrived as WhatsApp questions about class times, one at a time, and every one of them had to be answered by hand.",
    approach: [
      {
        heading: "Put the timetable where the questions were",
        body: "The schedule became the second thing on the page rather than a PDF nobody opened. Most of the enquiries were the same question, so answering it before it was asked was the shortest route to fewer messages and more sign-ups.",
      },
      {
        heading: "Built for a phone on mobile data",
        body: "Mobile-first, with the trainer photography compressed and lazy-loaded. The site had to open quickly on the walk between the gym and the car park, which is where most people were looking at it.",
      },
      {
        heading: "One obvious action on every screen",
        body: "A trial booking route on every page — form, click-to-call and WhatsApp — with each one tracked separately so it is clear which one people actually use.",
      },
    ],
    shipped: [
      "Five-page mobile-first site",
      "Class timetable and trainer profiles",
      "Trial booking form with WhatsApp and click-to-call routes",
      "Google-ready titles, descriptions and structured data",
      "Analytics with each enquiry route tracked separately",
    ],
    gallery: [],
  },
  {
    slug: "the-bamboo-kitchen",
    placeholder: true,
    name: "The Bamboo Kitchen",
    client: "The Bamboo Kitchen",
    category: "Restaurant",
    year: "2025",
    services: ["photography-videography"],
    tags: ["Photography", "Restaurant"],
    motif: "photography",
    image: null,
    liveUrl: null,
    desc: "A full menu shoot plus a reel series that gave the restaurant a consistent, appetising feed and stronger delivery-app listings.",
    brief:
      "A kitchen doing good food and photographing it on a phone under the ceiling lights. The delivery apps were showing the same dishes as everyone else's, and the feed had no two pictures that looked like they came from the same restaurant.",
    approach: [
      {
        heading: "One shoot, one light",
        body: "The whole menu photographed in a single session against one lighting setup, so a listing built from twelve of the images still reads as one kitchen rather than twelve occasions.",
      },
      {
        heading: "Shot for the crop that matters",
        body: "Delivery apps square-crop and the feed does not. Every dish was framed with both in mind, which is cheaper than reshooting the ones that lost their plate to a crop.",
      },
      {
        heading: "Enough for a month, not a day",
        body: "The reel series was cut so the restaurant had something to post beyond the week the photographer left, which is the part most shoots skip.",
      },
    ],
    shipped: [
      "Full menu shoot, edited and colour-graded",
      "Square and portrait crops of every dish",
      "A series of short-form reels",
      "Delivery-app listing images at the platforms' own sizes",
      "Full usage rights, handed over on completion",
    ],
    gallery: [],
  },
  {
    slug: "fitlife-gym",
    placeholder: true,
    name: "FitLife Gym",
    client: "FitLife Gym",
    category: "Fitness",
    year: "2025",
    services: ["social-media-management"],
    tags: ["Social Media", "Fitness"],
    motif: "social",
    image: null,
    liveUrl: null,
    desc: "A month-by-month content system — transformation stories, trainer reels and offer creatives — built to keep enquiries flowing.",
    brief:
      "Posting when someone remembered to, which meant four posts in a good week and nothing for a fortnight after. The account had followers and no rhythm, and the gym could not tell whether any of it was bringing anyone in.",
    approach: [
      {
        heading: "A calendar, agreed a month ahead",
        body: "Three recurring formats rather than a new idea every day: member stories, a trainer explaining one thing properly, and the current offer. Deciding the shape once is what makes the month possible.",
      },
      {
        heading: "Shot in batches",
        body: "One filming session per month covering four weeks of posts. The alternative is asking a trainer to be camera-ready on a Tuesday between clients, which is how content calendars quietly die.",
      },
      {
        heading: "Replies are part of the job",
        body: "Comments and DMs answered rather than collected, with anything that reads like a genuine enquiry passed to the gym the same day.",
      },
    ],
    shipped: [
      "Monthly content calendar, agreed in advance",
      "One filming session per month",
      "Feed posts, stories and short-form reels",
      "Comment and DM handling, with enquiries passed on",
      "A monthly note on what was posted and what was engaged with",
    ],
    gallery: [],
  },
  {
    slug: "elite-interiors",
    placeholder: true,
    name: "Elite Interiors",
    client: "Elite Interiors",
    category: "Interiors",
    year: "2025",
    services: ["performance-marketing"],
    tags: ["Performance Marketing", "Interiors"],
    motif: "marketing",
    image: null,
    liveUrl: null,
    desc: "Meta and Google campaigns paired with a dedicated landing page and call tracking, so every rupee of ad spend is accountable.",
    brief:
      "Money going into boosted posts with no way to tell what came back. The traffic that did arrive landed on a homepage that asked it to go and find the relevant page itself.",
    approach: [
      {
        heading: "A page for the ad, not the business",
        body: "Every campaign points at a page about the one thing the ad promised. Sending paid traffic to a homepage means paying for a click and then asking the visitor to do the navigating.",
      },
      {
        heading: "Made the phone measurable",
        body: "Interiors enquiries come by phone, so a call is the conversion. Call tracking was set up before any spend, because a campaign you cannot measure is a campaign you cannot improve.",
      },
      {
        heading: "Small budgets, narrow targeting",
        body: "A tight radius and a short list of intent terms rather than a wide net. On a local budget, reach bought cheaply is reach spent on people who will never travel.",
      },
    ],
    shipped: [
      "Meta and Google Search campaigns",
      "Dedicated landing page per campaign",
      "Call tracking and form-conversion tracking",
      "Monthly spend and enquiry reporting",
      "Account and ad access retained by the client",
    ],
    gallery: [],
  },
  {
    slug: "aurora-salon-spa",
    placeholder: true,
    name: "Aurora Salon & Spa",
    client: "Aurora Salon & Spa",
    category: "Salon",
    year: "2025",
    services: ["google-business-management"],
    tags: ["Google Business", "Salon"],
    motif: "local",
    image: null,
    liveUrl: null,
    desc: "A one-page booking site plus a fully optimised Google Business Profile that put the salon on the map for nearby searches.",
    brief:
      "A profile with the wrong hours, three photographs and no replies to any of its reviews — appearing, when it appeared at all, below salons further away.",
    approach: [
      {
        heading: "Fixed the record first",
        body: "Hours, categories, services and holiday closures corrected before anything else. A profile that says you are open when you are shut costs more than one that ranks a little lower.",
      },
      {
        heading: "Photographed the actual room",
        body: "Interior, exterior and treatment photography, because the profile is where someone decides whether the place looks like somewhere they want to sit for an hour.",
      },
      {
        heading: "Made reviews a routine",
        body: "A standing process for asking after an appointment and replying to every review, good or bad. Reviews are the one part of a listing that cannot be written in an afternoon.",
      },
    ],
    shipped: [
      "Google Business Profile audited and corrected",
      "Interior, exterior and treatment photography",
      "Services and pricing loaded onto the profile",
      "Review request and response routine",
      "One-page booking site linked from the listing",
    ],
    gallery: [],
  },
  {
    slug: "chabua-tea",
    placeholder: true,
    name: "Chabua Tea",
    client: "Chabua Tea",
    category: "Retail",
    year: "2025",
    services: ["graphic-design-branding"],
    tags: ["Branding & Identity", "Retail"],
    motif: "branding",
    image: null,
    liveUrl: null,
    desc: "A visual identity and packaging system that carries the estate's heritage onto shelves and into online listings.",
    brief:
      "An estate with a long history and a logo that existed in one resolution, redrawn slightly differently every time it was needed. On a shelf, the packets did not look like they belonged to each other.",
    approach: [
      {
        heading: "Drawn once, properly",
        body: "The mark rebuilt as vector artwork with a size below which it is not used, so it stops being redrawn by whoever needs it next.",
      },
      {
        heading: "A system, not a packet",
        body: "Colour and type decided across the range rather than per product, so a new blend can be added later without a designer inventing a new rule for it.",
      },
      {
        heading: "Built for the shelf and the thumbnail",
        body: "Every layout checked at arm's length on a shelf and at the size an online listing actually shows it. Packaging that only works at one of those two is packaging that works half the time.",
      },
    ],
    shipped: [
      "Primary mark, secondary mark and favicon set",
      "Colour palette and type scale",
      "Packaging layouts across the range",
      "Label artwork prepared to the printer's specification",
      "A short usage guide, and the source files",
    ],
    gallery: [],
  },
];

/**
 * The example shown in a service page's "The work" section. First match by
 * position in the array, which is also displayed order — so promoting a
 * project to the top of `work` is how you change which one a service shows,
 * without touching the service page itself.
 */
export const workByService = (slug) =>
  work.find((project) => project.services.includes(slug));

export const workBySlug = (slug) =>
  work.find((project) => project.slug === slug);

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
