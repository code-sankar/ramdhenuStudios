/**
 * INDUSTRIES
 * ===========================================================================
 * A service page answers "what is social media management?". An industry page
 * answers "what would you do for my restaurant?" — which is the question
 * people actually search, and the one a generic services page answers badly.
 *
 * One entry drives the row in About, the whole page at /industries/<slug>/,
 * that page's SEO head and its line in the sitemap. Adding an industry here is
 * the entire job; the route follows from the slug.
 *
 * `priority` lists service slugs in the order they matter for that trade, so
 * every page routes into the services rather than competing with them.
 *
 * `plural` and `singular` exist because `name` and `short` are labels, not
 * sentence fragments — "for most Restaurants businesses" is what you get
 * otherwise.
 *
 * Nothing here claims a result, quotes a number, or names a client. These
 * pages describe how we would approach a trade, which is true on day one —
 * the moment they start claiming outcomes we cannot evidence, they stop being
 * worth ranking for.
 */

export const industries = [
  {
    num: "01",
    slug: "restaurants-cafes",
    plural: "restaurants and cafés",
    singular: "restaurant",
    name: "Restaurants & Cafés",
    short: "Restaurants",
    motif: "photography",
    blurb: "Photography, Google Business and social, in the order that fills tables.",
    metaTitle: "Digital Marketing for Restaurants & Cafés in Assam | Ramdhenu",
    metaDescription:
      "Food photography, Google Business management and social media for restaurants and cafés in Assam — built around walk-ins and table bookings, not follower counts.",
    lede: "Someone decides whether to eat at your place in about four seconds, on a phone, usually from a photograph and a star rating. Almost none of that decision happens on your website.",
    situation: [
      {
        heading: "The photograph does the selling",
        body: "A restaurant's single highest-value asset online is a good picture of its food and its room. Most local restaurants have neither — they have phone snaps taken under kitchen lighting, and a Google listing full of customer photos they did not choose. Fixing that is usually the cheapest improvement available to a restaurant.",
      },
      {
        heading: "Google decides before you do",
        body: "\"Restaurants near me\" is where the choice is made, and it is your Google Business Profile answering it — hours, photos, menu, reviews, whether you show as open. A profile that is out of date or unclaimed loses covers to whoever down the road keeps theirs current.",
      },
      {
        heading: "Social is a reminder, not a menu",
        body: "Regulars follow you; strangers rarely find you there. So we treat social as the thing that keeps you in mind between visits — today's special, a full room on a Friday, the new place setting — rather than as a catalogue nobody reads.",
      },
    ],
    priority: ["photography-videography", "google-business-management", "social-media-management"],
    firstMoves: [
      { step: "Shoot the food", body: "One session covering the dishes people actually order, the room at its best, and the team at work — cropped in advance for menu, listing, site and social." },
      { step: "Claim and finish Google", body: "Hours, menu, photos, service options and the categories that decide which searches you appear in." },
      { step: "Set a review habit", body: "A simple, repeatable way to ask happy customers at the right moment, and a plan for answering the negative ones without arguing." },
      { step: "Keep it current", body: "Seasonal menus, festival hours and specials, posted where they will be seen rather than left to go stale." },
    ],
    outcomes: [
      "Photographs you own, sized for every surface a customer sees",
      "A Google listing that answers hours, menu and location correctly",
      "A steady flow of reviews rather than a stagnant rating",
      "One clear route from a phone to a booking or a call",
    ],
    faqs: [
      {
        q: "We are busy already. Is any of this worth it?",
        a: "Possibly not, and we will say so. If you are full every service, the honest advice is usually to protect what works and fix only the Google listing. We would rather tell you that than sell you a package you do not need.",
      },
      {
        q: "Do you shoot during service?",
        a: "Rarely. Most sessions run before service or on a quiet day, agreed in the planning call so the shoot fits around trading rather than interrupting it.",
      },
      {
        q: "Do we need a website at all?",
        a: "Less urgently than most agencies will tell you. For a single-location restaurant, a finished Google profile and real photography usually earn more than a website does. A site becomes worth it when you take bookings, run events, or have more than one branch.",
      },
    ],
  },

  {
    num: "02",
    slug: "hotels-resorts",
    plural: "hotels and resorts",
    singular: "hotel or resort",
    name: "Hotels & Resorts",
    short: "Hotels",
    motif: "photography",
    blurb: "Rooms shot honestly, found in search, and booked without a middleman.",
    metaTitle: "Marketing for Hotels & Resorts in Assam | Ramdhenu",
    metaDescription:
      "Photography, websites and search for hotels, resorts and homestays in Assam — built to win direct enquiries instead of paying commission on every booking.",
    lede: "Every booking that arrives through a travel platform costs you a commission you never stop paying. A direct enquiry costs you once. Most of what follows is about shifting the balance between those two.",
    situation: [
      {
        heading: "The commission problem",
        body: "Listing platforms bring volume, and for a new property they are worth using. But a guest who could have found you directly and booked through a platform anyway is pure margin lost. The work is making yourself findable and credible enough that some of them come straight to you.",
      },
      {
        heading: "Rooms have to look like the room",
        body: "The fastest way to earn a bad review is a photograph that oversells. We shoot the property as it actually is, at its best — which is a different thing from making it look like somewhere else. Guests who arrive to what they expected leave better ratings.",
      },
      {
        heading: "Travellers plan on a phone, in transit",
        body: "Assam's visitors are often planning between other things — on a train, at an airport, on patchy data. A page that takes eight seconds to load has already lost them, whatever is on it.",
      },
    ],
    priority: ["photography-videography", "website-design-development", "google-business-management"],
    firstMoves: [
      { step: "Shoot the property", body: "Every room type, the grounds, the food, and the details that make the place itself — stills and vertical video in one visit." },
      { step: "Build the direct route", body: "A fast, mobile-first site where checking availability and sending an enquiry take one tap each." },
      { step: "Own the map", body: "Google Business finished properly — photos, amenities, check-in times, and the categories that put you in local and travel searches." },
      { step: "Measure the split", body: "Track which enquiries came direct versus through a platform, so the shift is visible rather than assumed." },
    ],
    outcomes: [
      "A property that photographs honestly and still looks worth booking",
      "A direct enquiry route that works on a train with two bars of signal",
      "Search and map presence you own rather than rent",
      "Visibility of what each channel actually brings you",
    ],
    faqs: [
      {
        q: "Should we stop using booking platforms?",
        a: "No. They fill rooms, particularly out of season and for a property nobody knows yet. The goal is not to leave them — it is to stop them being your only channel.",
      },
      {
        q: "Do you handle the booking engine?",
        a: "We build the enquiry route and integrate whichever booking system you use. We do not build payment and inventory systems ourselves, and we will tell you when an off-the-shelf one is the right answer.",
      },
      {
        q: "We are a small homestay. Is this over-scaled?",
        a: "Often, yes. For a homestay the honest starting point is photography and a finished Google listing. We would scope to that rather than sell you a hotel's programme.",
      },
    ],
  },

  {
    num: "03",
    slug: "clinics",
    plural: "clinics and practices",
    singular: "clinic",
    name: "Clinics & Healthcare",
    short: "Clinics",
    motif: "local",
    blurb: "Findable, credible and easy to contact — without overclaiming.",
    metaTitle: "Digital Marketing for Clinics & Doctors in Assam | Ramdhenu",
    metaDescription:
      "Websites, Google Business and local search for clinics, dentists and diagnostic centres in Assam — built for trust and appointments, within advertising rules.",
    lede: "Nobody chooses a clinic for its branding. They choose it because it came up in search, looked legitimate, was close enough, and answered the phone. That is the whole job, in order.",
    situation: [
      {
        heading: "Trust is the product",
        body: "A patient is deciding whether to hand you something that matters. Qualifications stated plainly, real photographs of the actual premises, named practitioners, honest timings — those do more than any design flourish. Stock photography of foreign hospitals does the opposite.",
      },
      {
        heading: "Local search is the whole funnel",
        body: "\"Dentist near me\", \"child specialist Guwahati\" — this is almost entirely a Google Business and local SEO problem. Getting the profile right, with correct hours and a steady flow of reviews, usually matters more than anything on your website.",
      },
      {
        heading: "Claims have limits, and they are real",
        body: "Healthcare advertising is governed, and outcome claims can get a practice into genuine trouble. We write to what you do and who does it, not to what results a patient might get. If a request would cross that line we will say so rather than quietly publish it.",
      },
    ],
    priority: ["google-business-management", "website-design-development", "graphic-design-branding"],
    firstMoves: [
      { step: "Fix the listing", body: "Correct hours including holidays, the right categories, real photos of the premises, and appointment links that work." },
      { step: "State the credentials", body: "Practitioners, qualifications, registrations and services, written plainly enough that a worried person can read them quickly." },
      { step: "Make contact trivial", body: "Click-to-call on every screen, WhatsApp where you can staff it, and clear guidance on what needs an appointment." },
      { step: "Build the review habit", body: "A compliant, repeatable way to ask — and a considered approach to answering criticism in public without disclosing anything about a patient." },
    ],
    outcomes: [
      "A practice that appears for the searches patients actually make",
      "Credentials and services stated clearly, without overclaiming",
      "Appointment and call routes that work one-handed on a phone",
      "Reviews accumulating rather than sitting at three from 2021",
    ],
    faqs: [
      {
        q: "Can you guarantee more patients?",
        a: "No, and be careful with anyone who does. We can make you findable, credible and easy to contact. What happens after someone walks in is your practice, not our marketing.",
      },
      {
        q: "Is advertising for a clinic even allowed?",
        a: "Advertising a healthcare practice is permitted within limits, and those limits are about claims, comparisons and inducements rather than about existing online. We keep to describing services and practitioners factually, and we flag anything we think is close to a line.",
      },
      {
        q: "Do you handle patient data?",
        a: "No. We build the routes that let someone reach you — form, call, WhatsApp — and we do not build or host systems that store patient records. That belongs with software built and certified for it.",
      },
    ],
  },

  {
    num: "04",
    slug: "salons-spas",
    plural: "salons and spas",
    singular: "salon",
    name: "Salons & Spas",
    short: "Salons",
    motif: "social",
    blurb: "Work worth showing, posted often, with booking one tap away.",
    metaTitle: "Social Media & Marketing for Salons & Spas in Assam | Ramdhenu",
    metaDescription:
      "Social media, photography and Google Business for salons, spas and beauty studios in Assam — built to turn a scroll into a booked appointment.",
    lede: "Your work is already visual and already finished — it walks out of the door several times a day. The gap is almost never the quality of the work; it is that nobody photographed it.",
    situation: [
      {
        heading: "Before and after is the whole format",
        body: "It is the most persuasive content a salon can post, it costs nothing but consistency, and almost nobody does it properly. We set up how to shoot it — same spot, same light, permission asked once — so your team can keep it going without us.",
      },
      {
        heading: "Booking has to be one tap",
        body: "Someone convinced by a photo at 11pm will not fill in a form or ring you in the morning. A WhatsApp or booking link in the profile, in the bio and on every post is what converts that moment before it passes.",
      },
      {
        heading: "Regulars are the business",
        body: "A salon lives on repeat visits, not on reach. Content that reminds existing clients you exist — new services, offers, the stylist they like — is usually worth more than anything aimed at strangers.",
      },
    ],
    priority: ["social-media-management", "photography-videography", "google-business-management"],
    firstMoves: [
      { step: "Set the shooting routine", body: "One consistent spot and light in the salon, plus a simple consent habit, so good before-and-afters happen daily without a photographer present." },
      { step: "Shoot the space and the team", body: "A proper session for the interior, the stylists and the service menu — the images that carry your profile and listing." },
      { step: "Open the booking route", body: "WhatsApp or a booking link everywhere someone might decide, so an 11pm scroll becomes a Saturday appointment." },
      { step: "Get on the map", body: "Google Business with real photos, correct hours and services, and reviews asked for at the chair rather than never." },
    ],
    outcomes: [
      "A repeatable way to capture your own work daily",
      "A profile that looks like the salon people will actually walk into",
      "Booking reachable in one tap from anywhere someone sees you",
      "Reminders that reach regulars, not just strangers",
    ],
    faqs: [
      {
        q: "Do we need to post every day?",
        a: "No. Consistent beats frequent — three good posts a week you can sustain beat daily posting you abandon in a month. We set a rhythm your team can actually keep.",
      },
      {
        q: "Our clients may not want their photos posted.",
        a: "Then they are not posted. We set up a simple way to ask before the chair, and plenty of strong content — hands, detail, the space, the process — needs no face at all.",
      },
      {
        q: "Can our staff run it after you set it up?",
        a: "That is usually the goal. We would rather hand you a routine that works than keep you on a retainer for something your front desk can do in ten minutes a day.",
      },
    ],
  },

  {
    num: "05",
    slug: "real-estate",
    plural: "property businesses",
    singular: "property business",
    name: "Real Estate",
    short: "Real Estate",
    motif: "marketing",
    blurb: "Properties shot properly and put in front of people actually looking.",
    metaTitle: "Real Estate Marketing & Property Photography in Assam | Ramdhenu",
    metaDescription:
      "Property photography, video walkthroughs, websites and paid campaigns for builders and property agents in Assam — built around qualified enquiries.",
    lede: "One enquiry is worth more here than in almost any other local trade, which changes the maths completely. It makes proper photography obviously worth it, and it makes wasted ad spend expensive in a way a café would never feel.",
    situation: [
      {
        heading: "Bad photographs cost you real money",
        body: "A flat shot on a phone in the afternoon looks like every other flat shot on a phone. Wide, level, properly lit images and a walkthrough video are the difference between a listing people scroll past and one they call about — and at these values, that difference is not a small number.",
      },
      {
        heading: "Targeting is where the budget goes to die",
        body: "Property ads are easy to spend money on and hard to spend well. Most of the work is exclusion — location, intent, and cutting the audiences that generate enquiries no salesperson can use.",
      },
      {
        heading: "Speed of response beats everything",
        body: "A buyer enquiring at nine in the evening has probably enquired with three others too. Whoever replies first usually gets the viewing. We build the routing so enquiries reach a person quickly, not a mailbox checked on Monday.",
      },
    ],
    priority: ["photography-videography", "performance-marketing", "website-design-development"],
    firstMoves: [
      { step: "Shoot the inventory", body: "Stills and walkthrough video of the units that are actually selling, planned so one visit covers listings, site and ads." },
      { step: "Build the landing route", body: "A page per project or unit type where the enquiry form is the point, not an afterthought below the fold." },
      { step: "Run tight campaigns", body: "Narrow location and intent targeting, with the audiences that waste budget excluded before launch rather than after." },
      { step: "Route and time the leads", body: "Enquiries reaching a person fast, tracked back to the campaign and the unit that produced them." },
    ],
    outcomes: [
      "Listings that photograph like the property is worth its asking price",
      "Ad spend aimed at people in the right place with the right intent",
      "Enquiries that reach a salesperson while they are still warm",
      "A clear view of which project and channel produced each enquiry",
    ],
    faqs: [
      {
        q: "What should we budget for ads?",
        a: "Less than you think, to start. We would rather run a small budget long enough to learn what converts than spend heavily in month one and have nothing to show but reach.",
      },
      {
        q: "Do you use drone footage?",
        a: "Where it earns its place — plots, layouts and locations genuinely benefit. For a two-bedroom flat it is usually a distraction from the rooms someone is actually buying.",
      },
      {
        q: "Can you guarantee qualified leads?",
        a: "No. We can make the targeting tight and the enquiry route fast, and we can show you exactly what each campaign produced. Qualifying and closing is your sales team's work, and any agency promising otherwise is selling you something they cannot deliver.",
      },
    ],
  },

  {
    num: "06",
    slug: "coaching-centres",
    plural: "coaching centres",
    singular: "coaching centre",
    name: "Coaching Centres",
    short: "Coaching",
    motif: "branding",
    blurb: "Admissions-season visibility, built on proof parents can check.",
    metaTitle: "Marketing for Coaching Centres & Institutes in Assam | Ramdhenu",
    metaDescription:
      "Websites, branding and campaigns for coaching centres and institutes in Assam — built around admission enquiries, parent trust and the seasons that decide your year.",
    lede: "Your year is decided in a few weeks. Everything else is preparation for the admission window, and an agency that does not plan around that calendar is not much use to you.",
    situation: [
      {
        heading: "The calendar rules everything",
        body: "Results come out, parents start looking, and the decision is made quickly. Work that lands after that window is work wasted for a year. So we plan backwards from your admission dates rather than running a flat monthly programme.",
      },
      {
        heading: "Parents are the audience, students are the users",
        body: "The student may find you on Instagram; the parent decides. Those two need different things — one needs to feel it is where their friends are, the other needs faculty, fees, timings and something they can verify.",
      },
      {
        heading: "Proof has to be real and permissioned",
        body: "Results are your strongest asset and your biggest risk. We publish what you can evidence, with the consent of the families involved — never inflated numbers or a wall of stock faces. A parent who catches one exaggeration stops believing the rest.",
      },
    ],
    priority: ["website-design-development", "performance-marketing", "graphic-design-branding"],
    firstMoves: [
      { step: "Plan to the calendar", body: "Work back from your admission window so the site, the creative and the campaigns are ready before enquiries start, not during." },
      { step: "Answer the parent's questions", body: "Faculty, batches, fees, timings and location, stated plainly on one page rather than scattered or withheld until a phone call." },
      { step: "Publish provable results", body: "Only what you can evidence, only with the families' permission — presented so a parent can check it rather than take it on faith." },
      { step: "Run the season", body: "Local campaigns concentrated in the weeks that decide the year, with enquiries tracked from ad to admission." },
    ],
    outcomes: [
      "A site that answers a parent's questions before they ring",
      "Campaigns concentrated where the year is actually decided",
      "Results presented in a form that stands up to scrutiny",
      "Enquiries traceable from the ad to the admission",
    ],
    faqs: [
      {
        q: "When should we start?",
        a: "Six to eight weeks before your admission window, so everything is live before enquiries begin. Starting during the window means building while the season passes.",
      },
      {
        q: "Can we advertise our toppers?",
        a: "With their permission, and accurately. We will ask you to evidence any figure that goes on the site — not to be difficult, but because a claim a parent can disprove costs you more admissions than it wins.",
      },
      {
        q: "Is social media worth it for us?",
        a: "For reaching students, often yes. For convincing the parent who signs the cheque, a clear website and a findable location usually do more. We would rather start there.",
      },
    ],
  },
];

/** Look one up by slug — used by the industry route. */
export const industryBySlug = (slug) => industries.find((i) => i.slug === slug);

/** Match a plain label from site.js `industries` to a page, if one exists. */
export const industryByLabel = (label) =>
  industries.find((i) => i.name.toLowerCase() === String(label).toLowerCase());
