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
 * ── TWO KINDS OF ENTRY, AND THE DIFFERENCE IS LOAD-BEARING ────────────────
 *
 * The first six are REAL BUILDS. The code exists, it is public, and each
 * entry's screenshot is of that project's own home page rendered from its own
 * repository — not a mockup and not a stock frame. They carry a `stage`, and
 * they are indexed.
 *
 * The rest still carry `placeholder: true`: they are invented, they exist so
 * the disciplines with no real work yet — photography, social, ads, Google
 * Business, branding — are not blank, and they are labelled "Sample" on the
 * card, banner-marked on their own page, and `noindex`. Replace one with real
 * permissioned work and drop its flag; never the other way round.
 *
 * ⚠️  `stage` SAYS WHAT A LIVE LINK CANNOT, which is why a link appearing is
 *     not on its own a reason to remove one. Five of the six are live and
 *     carry a `liveUrl`. Two of those needed nothing else, because "not
 *     launched yet" was the whole of what their `stage` said and they are
 *     launched. The three that keep one are each saying something a URL does
 *     not answer: a site that is up but still carrying the client's sample
 *     copy, a product deployed while it is still in development, a build whose
 *     branding is not in place. Drop a `stage` when it stops being true — not
 *     when a link turns up beside it.
 *
 *     JusticeGuard has no `liveUrl` and will never get one: the brand is
 *     invented, so there is no site to visit.
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
 *   liveUrl    the client's live site — null until it genuinely is one
 *   stage      short status, on a real project that is not yet launched
 *   year       displayed in the masthead
 *   image      a root-relative path under /public, or an absolute URL. seo.js
 *              absolutises it for og:image, which cannot take a relative one.
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
    slug: "borghar-piyola",
    name: "Borghar Piyola",
    client: "Borghar Piyola",
    category: "Café",
    year: "2026",
    services: ["website-design-development"],
    tags: ["Web Development", "Café", "Bilingual"],
    motif: "web",
    image: "/work/borghar-piyola.webp",
    liveUrl: "https://borghar-piyola.vercel.app/",
    desc: "A bilingual site for an Assamese tea and coffee house on the Tionhjalia Bypass, with a gamosa border system generated from counted weave grids rather than drawn by hand.",
    brief:
      "A tea and coffee house in Chabua that did not want to look like a café template with Assam-coloured paint on it. The brief ruled out the entire default kit — centred hero, gradient wash, stock photographs of latte art — and asked for something that could not belong to any other house.",
    approach: [
      {
        heading: "The border is woven, not drawn",
        body: "A weaver counts one warp thread against one weft, so every motif on a gamosa is built from square cells and its diagonals come out stepped rather than smooth. Each motif is stored the way it would actually be counted — a grid of characters — and turned into an SVG pattern at render. The stepping is correct because the data is correct, not because someone drew it that way.",
      },
      {
        heading: "The name set as a dictionary entry",
        body: "Borghar is the principal house of an Assamese homestead; piyola is the cup. Rather than explain that in a paragraph nobody reads, the opening screen sets both as lexicon entries with pronunciation — which does the explaining and the branding in the same block.",
      },
      {
        heading: "Assamese first, and all the way down",
        body: "Bilingual navigation, Assamese numerals for the section numbers, and self-hosted typefaces so the Assamese sets properly instead of falling back mid-word on a phone that has never seen the script.",
      },
    ],
    shipped: [
      "Bilingual site — Assamese and English throughout",
      "A generated gamosa border system with six counted motifs",
      "Original line art — japi, xorai, tekeli, sunga",
      "Self-hosted typefaces, fetched by a build script",
      "React 19 and Tailwind v4 on Vite",
    ],
    gallery: [],
  },
  {
    slug: "mickey-mobile",
    name: "Mickey Mobile",
    client: "Mickey Mobile",
    category: "Retail",
    year: "2026",
    services: ["website-design-development"],
    tags: ["Web Development", "Retail", "Web App"],
    motif: "web",
    image: "/work/mickey-mobile.webp",
    liveUrl: "https://mickey-mobile.vercel.app/",
    desc: "A site for a phone shop running sales, repair and accessories from one counter — with a repair estimator and a catalogue whose filters live in the URL.",
    brief:
      "A counter in TDA Market, Tinsukia doing three different businesses at once, each of which a visitor arrives with a different question about. Someone with a cracked screen wants a price and a time; someone buying a case wants to browse. A single page of feature blocks serves neither of them.",
    approach: [
      {
        heading: "The estimator answers the question the phone call was for",
        body: "Pick a device and a fault and the page returns a price range without anybody having to be asked. It is the single most common enquiry a repair counter takes, so it became the thing the site does rather than the thing the site invites you to ring about.",
      },
      {
        heading: "The catalogue's state lives in the URL",
        body: "Filters write to the query string, so a filtered view can be sent to a customer over WhatsApp and open the same way at their end. A catalogue you cannot link to is a catalogue that gets screenshotted instead.",
      },
      {
        heading: "Four dependencies, and nothing else",
        body: "No animation library and no UI kit — the movement is CSS keyframes driven by an IntersectionObserver. Every route past the home page is a separate chunk of a few kilobytes fetched on navigation, because this audience is on a mid-range phone on mobile data.",
      },
    ],
    shipped: [
      "Multi-page site — repairs, shop, accessories, students, reviews, visit",
      "Interactive repair estimator returning a price range",
      "URL-driven catalogue, so any filtered view is linkable",
      "Opening hours computed live from the shop's own schedule",
      "An Express and MongoDB API for bookings, deployable on its own",
    ],
    gallery: [],
  },
  {
    slug: "north-east-academy",
    name: "North East Academy",
    client: "North East Academy",
    category: "Education",
    year: "2026",
    stage: "Built · awaiting client content",
    services: ["website-design-development"],
    tags: ["Web Development", "Education", "Content System"],
    motif: "web",
    image: "/work/north-east-academy.webp",
    liveUrl: "https://northeast-college.vercel.app/",
    desc: "A ten-page college site — programmes, faculty, notices, admissions and campus life — with every editable field lifted out of the components into one data folder.",
    brief:
      "A college in Chabua with no website, and the usual reason behind that: the content which would fill one is held by a dozen different people. The build had to be finishable before any of it arrived, and editable by the office afterwards without a developer in the room.",
    approach: [
      {
        heading: "Content out of the components",
        body: "Every field the college will ever want to change — programmes, departments, faculty, notices, events, fees, scholarships — lives in one data folder rather than inside a page. Updating a notice is editing one file, not finding it inside JSX.",
      },
      {
        heading: "Drawn, not stocked",
        body: "The campus is illustrated as vector artwork rather than filled with stock photography, so nothing on the page misrepresents a building somebody might turn up to. Seven scenes, each inside a fixed-aspect wrapper, so real photographs drop in later without the layout moving.",
      },
      {
        heading: "Honest about what is still standing in",
        body: "Where the institutional copy is sample, the page says so — including a visible note on the faculty directory. A college site that quietly invents a pass rate is worse than one that admits it is waiting for the real one.",
      },
    ],
    shipped: [
      "Ten pages plus a not-found route, including departments and faculty",
      "Admissions — steps, eligibility, fees, documents, scholarships, FAQs",
      "Notice board and events, both driven from data",
      "Seven hand-drawn campus scenes in place of stock photography",
      "Validated admission and contact forms, ready for an endpoint",
    ],
    gallery: [],
  },
  {
    slug: "kirtify",
    name: "Kirtify",
    client: "Kirtify",
    category: "SaaS",
    year: "2026",
    stage: "Product build · in development",
    services: ["website-design-development"],
    tags: ["Web Development", "SaaS", "Full Stack"],
    motif: "web",
    image: "/work/kirtify.webp",
    liveUrl: "https://getrankrise.vercel.app/",
    desc: "A full-stack reputation platform for local businesses — review aggregation from Google, Yelp and Facebook, drafted replies, competitor tracking and review campaigns, on a Postgres backend.",
    brief:
      "A product rather than a client site. Local businesses lose reviews because replying to them is a job nobody owns, so the build had to cover the whole loop — pull the reviews in, draft the reply, send the request that earns the next one — and be fully clickable long before a single third-party API key existed.",
    approach: [
      {
        heading: "Every integration has an offline path",
        body: "Google Business Profile, Facebook and Yelp all sit behind mock modes, so a fresh clone runs end to end before the API approvals — which take weeks — have come back. The alternative is a codebase nobody but its author can start.",
      },
      {
        heading: "Migrations, not a schema someone remembers",
        body: "PostgreSQL through Sequelize with versioned migrations, so the database has a history that can be replayed rather than a current state somebody has to reconstruct from the models.",
      },
      {
        heading: "The boring routes are the product too",
        body: "Onboarding, team invitations, email verification, password reset, a help centre, terms and privacy. A product is not a dashboard — it is a dashboard plus everything that has to exist before anyone can reach it. Every text colour in the app was taken through a WCAG AA pass.",
      },
    ],
    shipped: [
      "React dashboard — analytics, campaigns, competitors, settings",
      "Express API with JWT auth, rate limiting and schema validation",
      "PostgreSQL via Sequelize, with versioned migrations",
      "Review sync from Google Business Profile, Yelp and Facebook",
      "SMS and WhatsApp review campaigns, and subscription billing",
    ],
    gallery: [],
  },
  {
    slug: "justiceguard",
    name: "JusticeGuard",
    client: "Concept build",
    category: "Legal",
    year: "2026",
    stage: "Concept build",
    services: ["website-design-development"],
    tags: ["Web Development", "Legal", "Concept"],
    motif: "web",
    image: "/work/justiceguard.webp",
    liveUrl: null,
    desc: "A litigation practice site — seven practice areas, a lawyer directory and search — built as a concept, with an invented brand and invented figures.",
    brief:
      "Not client work, and it says so on the page. The brand, the statistics and the contact details are all invented; what is real is the structure. A visitor to a law firm arrives with one specific problem and has to reach the one practice area and the one person who handles it without reading the rest of the site first.",
    approach: [
      {
        heading: "A page per practice area, not a list of them",
        body: "Criminal defence, family, corporate, intellectual property, litigation, real estate and technology law each get their own page. Someone arriving with a specific problem should land on the answer, not on a homepage paragraph that mentions it in passing.",
      },
      {
        heading: "Search across people as well as practice",
        body: "The two things a visitor is actually looking for are a problem and a person, so search resolves to both — practice areas and individual advocates — rather than running over page text.",
      },
      {
        heading: "Movement kept to the chrome",
        body: "Transitions and reveals only. A legal practice is selling composure, and motion that performs undercuts the one thing the page exists to convey.",
      },
    ],
    shipped: [
      "Seven practice-area pages",
      "Lawyer profiles with their own detail route",
      "Search across advocates and practice areas",
      "Redux Toolkit state and React Router routing",
      "Responsive dark editorial layout",
    ],
    gallery: [],
  },
  {
    slug: "chhimphei-chicken",
    name: "Chhimphei Chicken",
    client: "Chhimphei Chicken",
    category: "E-commerce",
    year: "2025",
    stage: "Build in progress",
    services: ["website-design-development"],
    tags: ["Web Development", "E-commerce", "Retail"],
    motif: "web",
    image: "/work/chhimphei-chicken.webp",
    liveUrl: "https://e-commerce-meat-theta.vercel.app/",
    desc: "A meat delivery storefront — catalogue, categories, accounts and profile — with a scroll-driven front end built on GSAP and parallax.",
    brief:
      "A storefront for a meat business: a catalogue somebody can move through, product cards that add to a basket, and an account that remembers where to deliver. The build is still in progress — the branding is not yet in place and the product photography is standing in.",
    approach: [
      {
        heading: "The shop before the shopfront",
        body: "Categories, search, product cards and the account came first. A storefront that looks finished and cannot take an order is a brochure with a cart icon on it.",
      },
      {
        heading: "Motion that carries a long scroll",
        body: "GSAP and layered parallax down the home page, which suits a product that is sold by being photographed rather than described.",
      },
      {
        heading: "The basket is application state",
        body: "Held in a store rather than in a page, because it has to survive navigation — which is the one thing a cart must do and the thing page state cannot.",
      },
    ],
    shipped: [
      "Catalogue with categories and search",
      "Product cards with add-to-basket",
      "Account creation, sign-in and a profile area",
      "Scroll-driven home page with GSAP and parallax",
      "About and contact pages",
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
