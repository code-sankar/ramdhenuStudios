/**
 * SERVICES
 * ===========================================================================
 * One entry drives four things: the row on the home page, the whole detail page
 * at /services/<slug>/, that page's SEO head (via seo.js), and its line in the
 * sitemap. Adding a service here is the entire job — the route follows from the
 * slug and there is nothing to regenerate.
 *
 * The example project shown in "The work" section lives in src/data/work.js
 * now, not here — one catalog, so a project proving more than one discipline
 * is never duplicated into two copies that can drift apart. See work.js for
 * the launch checklist on replacing placeholder work with the real thing.
 *
 * Nothing here claims a result. Outcomes are written as what the work changes,
 * not as numbers we cannot yet stand behind.
 */

export const services = [
  {
    num: "01",
    slug: "website-design-development",
    title: "Website Design & Development",
    short: "Website Design",
    blurb:
      "Modern, responsive websites designed to turn visitors into customers.",
    motif: "web",
    metaTitle: "Website Design & Development in Assam | Ramdhenu",
    metaDescription:
      "Fast, mobile-first business websites for local companies in Assam — built around enquiries, not decoration. Design, build, SEO foundations and analytics from one team.",
    lede: "Most local business websites are brochures. They describe the business and stop there. We build the other kind — a site whose job is to turn someone who is already interested into someone who calls, messages or books.",
    forWho: [
      "Restaurants & cafés",
      "Hotels & resorts",
      "Clinics",
      "Real estate",
      "Coaching centres",
    ],

    /* THE FIGURE ON THIS PAGE. `kind` picks the drawing; the rest is the copy
       that frames it, which lives here with the other copy rather than in the
       page component. Six services, six different shapes — see
       src/components/figures/index.jsx for why they are not one shape reused. */
    figure: {
      kind: "anatomy",
      label: "What goes into it",
      heading: "Six disciplines, one build",
      body: "None of these is an add-on. A site with the design but not the performance work is slow and beautiful; one with the back end but not the search groundwork is a shop with no street. They ship together or the site does not do its job.",
      nodes: [
        { label: "UX & UI Design", icon: "design" },
        { label: "Frontend Development", icon: "frontend" },
        { label: "SEO & Security", icon: "seo" },
        { label: "Backend Development", icon: "backend" },
        { label: "Responsive & Performance", icon: "performance" },
        { label: "Database & APIs", icon: "data" },
      ],
    },
    sections: [
      {
        heading: "What we actually build",
        body: "A site sized to your business, not a template stretched to fit. For most local businesses that means five to eight pages: what you do, who it is for, proof, prices or packages where it helps, and an obvious way to get in touch on every screen. Built mobile-first, because that is where your customers are — usually eight or nine in ten of them.",
      },
      {
        heading: "Built to be found",
        body: "The technical groundwork is part of the build, not an upsell: clean page titles and descriptions, headings that match how people actually search, structured data so Google understands what your business is and where it operates, a sitemap, and a fast first paint on a mid-range phone. A site nobody can find is a very expensive business card.",
      },
      {
        heading: "Built to be measured",
        body: "Every enquiry route is tracked — form submissions, click-to-call, WhatsApp taps. You will know which pages bring enquiries and which do nothing, which is the only way to improve the site rather than redesign it every two years on a hunch.",
      },
      {
        heading: "Yours to keep",
        body: "On full payment the site is yours: the domain, the hosting account, the content. We hand over access rather than holding it. If you ever move to another agency, nothing about that is our decision to make difficult.",
      },
    ],
    includes: [
      "Design and build, mobile-first",
      "Copywriting support for every page",
      "Google-ready titles, descriptions and structured data",
      "Enquiry form, click-to-call and WhatsApp routes",
      "Analytics and enquiry tracking",
      "Speed and accessibility pass before launch",
      "Handover of domain, hosting and accounts",
      "Thirty days of post-launch fixes",
    ],
    process: [
      {
        step: "Audit",
        body: "We look at what you have, what competitors rank for, and how people currently reach you.",
      },
      {
        step: "Structure",
        body: "Pages, priorities and the path to an enquiry, agreed before any design happens.",
      },
      {
        step: "Design & build",
        body: "Screens first on mobile, then desktop, with your photography in place rather than stock.",
      },
      {
        step: "Launch & measure",
        body: "Go live, verify tracking works, then watch the first weeks and fix what the data shows.",
      },
    ],
    outcomes: [
      "A site that loads fast on a mid-range phone on mobile data",
      "One obvious next step on every page",
      "Search engines that can read and place your business",
      "Enquiries you can attribute to a page rather than guess at",
    ],
    faqs: [
      {
        q: "I already have a website. Do I need a new one?",
        a: "Often not. We audit what you have first and tell you honestly whether it is worth improving or rebuilding — rebuilding is not always the right answer, and we will say so when it isn't.",
      },
      {
        q: "How long does it take?",
        a: "Three to four weeks for most local business sites, assuming content and photography arrive when agreed. The timeline in your proposal will say exactly what it depends on.",
      },
      {
        q: "Who pays for the domain and hosting?",
        a: "You do, in your own name, on your own account. It is your business asset and it should never sit inside an agency's account.",
      },
    ],
  },

  {
    num: "02",
    slug: "photography-videography",
    title: "Photography & Videography",
    short: "Photography",
    blurb:
      "Professional visuals that showcase your products, people and brand.",
    motif: "photography",
    metaTitle: "Business, Food & Product Photography in Assam | Ramdhenu",
    metaDescription:
      "Food, product, interior and brand photography plus reels for local businesses in Assam. Shot for where they will be used — menus, listings, ads and social.",
    lede: "People decide whether to visit your restaurant, salon or resort from a phone screen, in about four seconds, on the strength of a photograph. That photograph is doing more selling than anything else you own.",
    forWho: [
      "Restaurants & cafés",
      "Hotels & resorts",
      "Salons",
      "Boutiques",
      "Local retail",
    ],
    figure: {
      kind: "pipeline",
      label: "The four stages",
      heading: "The camera is one stage of four",
      body: "Most of the work happens when the camera is in its bag. What we agree beforehand decides what there is to shoot, and what happens afterwards decides whether you can actually use any of it. The shutter is the short part.",
      nodes: [
        { label: "Brief & Shotlist", icon: "brief" },
        { label: "The Shoot", icon: "camera" },
        { label: "Edit & Grade", icon: "edit" },
        { label: "Delivery & Rights", icon: "deliver" },
      ],
    },
    sections: [
      {
        heading: "Shot for where it will be used",
        body: "A photograph that works on a menu does not automatically work as a square on Instagram, a wide banner on your site, or a Google Business cover. We plan crops before the shoot, so one session gives you images that fit every surface instead of a folder you have to re-crop badly later.",
      },
      {
        heading: "What we shoot",
        body: "Food and drink, products, interiors and exteriors, the team at work, and the details that make a place feel like itself. For most businesses the highest-value shot is not the hero image — it is the honest one that shows what a customer will actually walk into.",
      },
      {
        heading: "Reels and short video",
        body: "Vertical video shot alongside the stills, in the same session, so the look holds together. Short pieces built to be watched without sound, because most of them will be.",
      },
      {
        heading: "You own the files",
        body: "Edited images are delivered in full resolution and in web-ready sizes, and they are yours to use anywhere — print, delivery apps, listings, ads. No per-use licensing, no coming back to us for a file you already paid for.",
      },
    ],
    includes: [
      "Half or full-day shoot, on location",
      "Shot list agreed in advance",
      "Food, product, interior and team coverage",
      "Vertical video for reels in the same session",
      "Colour-graded edits in full and web resolution",
      "Crops prepared for site, social and Google Business",
      "Full usage rights, delivered as files you keep",
    ],
    process: [
      {
        step: "Plan",
        body: "We agree the shot list against where each image needs to work — menu, site, listing, ad.",
      },
      {
        step: "Prep",
        body: "Timing, styling and what needs to be ready on the day, so the session is not spent waiting.",
      },
      {
        step: "Shoot",
        body: "Stills and vertical video in one visit, usually half a day for a single location.",
      },
      {
        step: "Deliver",
        body: "Edited files in every crop you need, organised by where they are used.",
      },
    ],
    outcomes: [
      "One consistent look across your site, social and listings",
      "Images that hold up on delivery apps and Google Business",
      "Reels you can post without a separate shoot",
      "A library you own outright and can reuse",
    ],
    faqs: [
      {
        q: "Do we need to close for the shoot?",
        a: "Rarely. Most sessions run before service or during a quiet window. We agree the timing in the planning call so the shoot fits around trading rather than interrupting it.",
      },
      {
        q: "How many images do we get?",
        a: "It depends on the scope, and the number is agreed in the proposal. We would rather hand you thirty images you will genuinely use than two hundred you will never open.",
      },
      {
        q: "Can we use the photos in printed menus and ads?",
        a: "Yes. Usage is unrestricted once the work is paid for — print, digital, delivery platforms, paid ads, anywhere.",
      },
    ],
  },

  {
    num: "03",
    slug: "social-media-management",
    title: "Social Media Management",
    short: "Social Media",
    blurb: "Content calendars, community and channel growth.",
    motif: "social",
    metaTitle:
      "Social Media Management for Local Businesses in Assam | Ramdhenu",
    metaDescription:
      "Content calendars, reels, creatives and community management for local businesses in Assam. Two channels done properly rather than five done badly.",
    lede: "Posting is not a strategy. A feed earns its keep when someone who has never heard of you can scroll it for ten seconds and understand what you sell, what it costs, and why they should come in.",
    forWho: [
      "Restaurants & cafés",
      "Gyms",
      "Salons",
      "Boutiques",
      "Coaching centres",
    ],
    figure: {
      kind: "loop",
      label: "The monthly cycle",
      heading: "A cycle, not a campaign",
      body: "This is the one service with no finish line, and that is the argument for paying monthly rather than once. What the last month taught changes what the next month plans — break the loop anywhere and the rest of it stops compounding.",
      nodes: [
        { label: "Plan", icon: "plan" },
        { label: "Create", icon: "create" },
        { label: "Publish", icon: "publish" },
        { label: "Listen", icon: "listen" },
        { label: "Learn", icon: "learn" },
      ],
    },
    sections: [
      {
        heading: "Two channels, properly",
        body: "We will usually advise against being everywhere. Which two channels depends on your business — a restaurant and a real estate office do not need the same presence, and spreading thin is the most common reason a feed stalls.",
      },
      {
        heading: "A calendar, not a scramble",
        body: "Content is planned a month ahead against what is actually happening in your business: what is in season, what is slow, what you want to sell more of. You approve the month before anything goes out, so nothing is a surprise.",
      },
      {
        heading: "The replies matter more than the posts",
        body: "Most enquiries arrive in comments and DMs, and most are lost there. We handle the first response and route anything real to you — a question answered in twenty minutes converts very differently from one answered in two days.",
      },
      {
        heading: "Reporting you can act on",
        body: "Monthly, in plain language: what was posted, what reached people, what brought messages, and what we are changing next month because of it. Not a screenshot of a dashboard.",
      },
    ],
    includes: [
      "Channel strategy and monthly content calendar",
      "Creatives and captions, designed not templated",
      "Reels and short-form video",
      "Scheduling and publishing",
      "Comment and DM first response",
      "Hashtag and local discovery setup",
      "Monthly report in plain language",
    ],
    process: [
      {
        step: "Set the base",
        body: "Profiles, bios, highlights and link routing fixed before any posting starts.",
      },
      {
        step: "Plan the month",
        body: "Themes and a calendar built around your trading pattern, approved by you.",
      },
      {
        step: "Produce & post",
        body: "Creatives, captions and reels made and published on schedule.",
      },
      {
        step: "Review & adjust",
        body: "What worked, what did not, and what changes next month.",
      },
    ],
    outcomes: [
      "A feed that explains the business without you narrating it",
      "Messages answered while the person is still interested",
      "A month of content you approved before it went out",
      "A clear read on which posts bring enquiries",
    ],
    faqs: [
      {
        q: "Do we need to appear on camera?",
        a: "It helps, but no. Plenty of strong feeds are built on food, product, space and process. We will tell you where a face would genuinely lift results rather than insisting on it.",
      },
      {
        q: "Who replies to messages — you or us?",
        a: "We take the first response and anything routine. Real enquiries, bookings and complaints come straight to you, because those should be answered by the business.",
      },
      {
        q: "How soon does a feed start working?",
        a: "Consistency shows before growth does. Expect the feed to look coherent within the first month and discovery to build over several — anyone promising a number in week two is guessing.",
      },
    ],
  },

  {
    num: "04",
    slug: "performance-marketing",
    title: "Performance Marketing",
    short: "Ads",
    blurb: "Meta Ads, Google Ads and campaigns measured on enquiries.",
    motif: "marketing",
    metaTitle: "Meta & Google Ads Management in Assam | Ramdhenu",
    metaDescription:
      "Meta and Google Ads for local businesses in Assam, measured on enquiries rather than impressions. Landing pages, call tracking and honest reporting.",
    lede: "Ads are the fastest way to find out whether your offer works — and the fastest way to spend money finding out that it doesn't. The difference is entirely in what you measure.",
    forWho: [
      "Real estate",
      "Clinics",
      "Coaching centres",
      "Hotels & resorts",
      "Local retail",
    ],
    figure: {
      kind: "funnel",
      label: "Where the money goes",
      heading: "Most of it falls away, and that is the job",
      body: "Anyone can buy impressions. Almost all of them go nowhere, which is normal and not a failure — the work is making the narrow end wider, and being honest about which number you are actually being charged for.",
      nodes: [
        { label: "Impressions", icon: "reach" },
        { label: "Clicks", icon: "click" },
        { label: "Enquiries", icon: "enquiry" },
        { label: "Customers", icon: "customer" },
      ],
    },
    sections: [
      {
        heading: "Measured on enquiries, not impressions",
        body: "Reach and impressions are the easiest numbers to make look good and the least connected to your bank account. We set up conversion tracking first — calls, forms, WhatsApp — so every campaign is judged on enquiries and what each one cost.",
      },
      {
        heading: "The landing page is half the campaign",
        body: "Sending paid traffic to a homepage wastes most of it. Campaigns get a page built for the specific offer, with one action on it. This is usually the single biggest difference between ad spend that works and ad spend that doesn't.",
      },
      {
        heading: "Your ad account, your money",
        body: "Campaigns run inside your own Meta and Google accounts. The ad budget goes from you to the platform directly — we never hold it — so you can see exactly what was spent and you keep the account and its history if we ever part ways.",
      },
      {
        heading: "A learning period is real",
        body: "New campaigns need one to two weeks before the numbers mean anything. We will tell you when a result is signal and when it is noise, rather than reacting to a bad Tuesday.",
      },
    ],
    includes: [
      "Conversion tracking setup and verification",
      "Campaign strategy and audience build",
      "Ad creatives and copy",
      "Dedicated landing page per offer",
      "Call, form and WhatsApp tracking",
      "Ongoing optimisation and budget shifts",
      "Monthly reporting on cost per enquiry",
    ],
    process: [
      {
        step: "Track first",
        body: "Nothing runs until conversions are firing correctly — otherwise the data is fiction.",
      },
      {
        step: "Build",
        body: "Audiences, creatives and a landing page for the specific offer.",
      },
      {
        step: "Learn",
        body: "One to two weeks at a controlled budget while the platform settles.",
      },
      {
        step: "Scale or stop",
        body: "Spend moves toward what produces enquiries; what doesn't gets cut.",
      },
    ],
    outcomes: [
      "A known cost per enquiry rather than a guess",
      "Ad spend visible in your own account, to the rupee",
      "A landing page built for the offer, not a homepage",
      "A clear call on what to scale and what to stop",
    ],
    faqs: [
      {
        q: "Is the ad budget included in your fee?",
        a: "No. Our fee covers strategy, creative and campaign management. The ad budget goes directly to Meta or Google from your own account, so you keep full visibility and control of what you spend.",
      },
      {
        q: "What is a sensible starting budget?",
        a: "It depends on your market and what a customer is worth to you. We would rather start smaller and prove the cost per enquiry than spend big while still guessing — the proposal will say what we recommend and why.",
      },
      {
        q: "What if the ads don't work?",
        a: "Then we say so. Some offers do not survive contact with paid traffic, and the useful outcome is finding that out in three weeks for a controlled budget rather than in six months.",
      },
    ],
  },

  {
    num: "05",
    slug: "google-business-management",
    title: "Google Business Management",
    short: "Google Business",
    blurb: "Local search, Maps visibility and the reviews that follow.",
    motif: "local",
    metaTitle: "Google Business Profile Management in Assam | Ramdhenu",
    metaDescription:
      "Google Business Profile setup, optimisation and management for local businesses in Assam — Maps visibility, photos, posts and reviews.",
    lede: 'For a local business this is usually the highest-return thing on the list, and the most neglected. Someone searching "cafe near me" is not browsing — they are deciding, now, from whatever Google shows them.',
    forWho: [
      "Restaurants & cafés",
      "Salons",
      "Clinics",
      "Gyms",
      "Local retail",
    ],
    figure: {
      kind: "catchment",
      label: "Why it works",
      heading: "You, and everyone searching near you",
      body: "This one is not really about a website. It is about being the result when somebody a few streets away searches for what you sell — a listing that is kept current reaches further, and the searches inside that radius arrive on their own.",
      nodes: [
        { label: "Profile & Hours", icon: "profile" },
        { label: "Photos", icon: "photos" },
        { label: "Reviews", icon: "reviews" },
        { label: "Posts & Offers", icon: "posts" },
      ],
    },
    sections: [
      {
        heading: "The profile is the storefront",
        body: "Categories, hours, service areas, attributes, the description, the photos — every field is a ranking and conversion signal. Most profiles are half filled in, which is why a competitor with a worse business often sits above them on Maps.",
      },
      {
        heading: "Photos do the deciding",
        body: "Profiles with strong, current photography get meaningfully more direction requests and calls. This is where our photography work and this service compound: the same shoot feeds the profile, the site and the feed.",
      },
      {
        heading: "Reviews, asked for properly",
        body: "We set up a system for requesting reviews at the right moment and reply to every one that arrives, including the bad ones. A well-handled complaint in public does more for trust than a wall of five stars.",
      },
      {
        heading: "Posts and questions",
        body: "Offers, events and updates published to the profile, and the Q&A section seeded and monitored — a section most businesses never look at, where a competitor can answer a question about you.",
      },
    ],
    includes: [
      "Profile claim, verification and full setup",
      "Category, attribute and service-area optimisation",
      "Photo strategy and upload schedule",
      "Google Posts for offers and updates",
      "Review request system and reply management",
      "Q&A seeding and monitoring",
      "Monthly report on calls, directions and clicks",
    ],
    process: [
      {
        step: "Claim & audit",
        body: "Verify ownership and fix what is wrong, missing or duplicated.",
      },
      {
        step: "Complete",
        body: "Every field filled, categories chosen deliberately, photos loaded.",
      },
      {
        step: "Activate",
        body: "Posts, review requests and Q&A running on a schedule.",
      },
      {
        step: "Report",
        body: "Monthly on the actions that matter — calls, directions, website clicks.",
      },
    ],
    outcomes: [
      "A profile that is actually complete, not half filled",
      "Current photography where customers decide",
      "Reviews arriving steadily instead of after complaints",
      "A monthly read on calls and direction requests",
    ],
    faqs: [
      {
        q: "How fast does this show results?",
        a: "This is the quickest of the channels. A properly completed and active profile can shift local visibility within a few weeks — faster than SEO, slower than ads, and far cheaper than either.",
      },
      {
        q: "We have duplicate listings. Can that be fixed?",
        a: "Usually yes. Duplicates and unclaimed listings split your reviews and confuse Google about which entry is real. Sorting that out is part of the audit.",
      },
      {
        q: "Can you remove a bad review?",
        a: "Only if it breaks Google's policies, and we will report those. Otherwise the answer is to reply well in public — which, handled properly, reads better to a prospective customer than no bad reviews at all.",
      },
    ],
  },

  {
    num: "06",
    slug: "graphic-design-branding",
    title: "Graphic Design & Branding",
    short: "Branding",
    blurb: "Logo systems, packaging, guidelines and visual language.",
    motif: "branding",
    metaTitle: "Branding, Logo & Graphic Design in Assam | Ramdhenu",
    metaDescription:
      "Logo systems, brand guidelines, packaging, menus and ad creatives for local businesses in Assam — a visual language that holds together everywhere.",
    lede: "A brand is not a logo. It is the reason someone recognises your post in a crowded feed before they read the name on it — and that only happens when everything you put out looks like it came from the same place.",
    forWho: [
      "Boutiques",
      "Restaurants & cafés",
      "Local retail",
      "Hotels & resorts",
      "Coaching centres",
    ],
    figure: {
      kind: "radiate",
      label: "What you are buying",
      heading: "One decision, six surfaces",
      body: "A logo is not the deliverable. The deliverable is a decision made once and then held on a shopfront, a menu, a phone screen and a printed card — surfaces with nothing in common except that the same identity has to survive all of them.",
      nodes: [
        { label: "Logo & Mark", icon: "logo" },
        { label: "Colour", icon: "palette" },
        { label: "Typography", icon: "type" },
        { label: "Signage", icon: "signage" },
        { label: "Print & Menus", icon: "print" },
        { label: "Social Kit", icon: "social" },
      ],
    },
    sections: [
      {
        heading: "A system, not a single file",
        body: "A logo on its own solves very little. What holds a brand together is the system around it — the typefaces, the colours, the spacing, the way a photograph is treated — so that a menu, a hoarding and an Instagram story are obviously the same business.",
      },
      {
        heading: "Guidelines someone can actually follow",
        body: "The guide is written for whoever ends up making a poster at short notice, not for a design conference. What to use, at what size, with what spacing, and what not to do. A brand fails between agencies, not during them.",
      },
      {
        heading: "The things you print",
        body: "Menus, brochures, packaging, signage, hoardings, price lists. Set up correctly for print — bleed, resolution, colour — so the press does not send it back and the printed piece matches what you approved on screen.",
      },
      {
        heading: "Ad and social creatives",
        body: "Templates built on the same system so monthly creative stays consistent without being redesigned from scratch each time — which is what keeps a brand recognisable through a year of posting.",
      },
    ],
    includes: [
      "Logo design or refinement, in every format",
      "Typography, colour and spacing system",
      "Written brand guidelines",
      "Menus, brochures and print collateral",
      "Packaging and label design",
      "Signage and hoarding artwork",
      "Social and ad creative templates",
      "Source files handed over",
    ],
    process: [
      {
        step: "Understand",
        body: "What the business is, who it serves, and what it should feel like beside its competitors.",
      },
      {
        step: "Direction",
        body: "Two or three routes explored properly, rather than a page of thumbnails.",
      },
      {
        step: "Build the system",
        body: "The chosen route extended into type, colour, layout and image treatment.",
      },
      {
        step: "Document & hand over",
        body: "Guidelines, templates and source files, all yours.",
      },
    ],
    outcomes: [
      "Recognisable before the name is read",
      "Print that matches what you approved on screen",
      "Templates that keep monthly creative consistent",
      "Source files you own and can hand to anyone",
    ],
    faqs: [
      {
        q: "We already have a logo. Do we have to change it?",
        a: "Not necessarily. Often the logo is fine and the problem is that nothing around it is defined. We will tell you honestly whether it needs replacing or just a system built around it.",
      },
      {
        q: "How many logo options do we see?",
        a: "Two or three explored properly. A page of twenty thumbnails looks generous and is usually a sign that none of them were thought through.",
      },
      {
        q: "Do we get the editable files?",
        a: "Yes. Source files and every export format are handed over on completion. They are your brand assets and you should never need to ask us for them.",
      },
    ],
  },
];

/** Look one up by slug — used by the service page entry. */
export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);
