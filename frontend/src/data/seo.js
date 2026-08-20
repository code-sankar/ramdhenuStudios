/**
 * SEO
 * ===========================================================================
 * Every route's head, described as data.
 *
 * This used to live in six hand-written `services/<slug>/index.html` files.
 * It has one home now, and two consumers read from it:
 *
 *   <Seo>                            src/components/Seo.jsx — applies the head
 *                                    for the route React is currently showing.
 *   generate-static-routes.mjs       writes the same tags into the built HTML
 *                                    for each route, so a crawler that never
 *                                    runs the JavaScript still sees them.
 *
 * Because both read this file, the static head and the runtime head cannot
 * drift apart. Adding a service to services.js is the whole job again.
 */
import { industries } from "./industries.js";
import { services, serviceBySlug } from "./services.js";
import { work } from "./work.js";
import { brand, contact, siteUrl } from "./site.js";

/** Trailing slash throughout — it is what the canonical URLs and sitemap use. */
export const servicePath = (slug) => `/services/${slug}/`;
export const industryPath = (slug) => `/industries/${slug}/`;
export const workPath = () => "/work/";

export const absoluteUrl = (path = "/") => `${siteUrl}${path}`;

const shareImage = absoluteUrl("/og-image.png");

/**
 * The agency itself, as schema.org sees it. The service pages reference it as
 * their provider, so the two never disagree about the phone number.
 * ⚠ Keep telephone, email and address in step with src/data/site.js.
 */
const provider = {
  "@type": "ProfessionalService",
  name: brand.name,
  url: absoluteUrl("/"),
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
};

/**
 * HOME
 * LocalBusiness (not just Organization) is what earns the knowledge panel and
 * Maps treatment a local agency depends on — the same surface the Google
 * Business service sells to clients.
 */
export const homeSeo = () => ({
  title: `${brand.name} — Digital agency for local businesses in Assam`,
  description:
    "Ramdhenu is a digital agency for local businesses that want more than a website — websites, photography, social media, Google Business and paid campaigns, from one coordinated team.",
  canonical: absoluteUrl("/"),
  og: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Strategy, visuals and campaigns from one coordinated team, built to turn attention into customers.",
    image: shareImage,
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: `${brand.name} Studios — ${brand.tagline.toLowerCase()}`,
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      ...provider,
      description:
        "Digital agency for local businesses — websites, photography, social media, Google Business and paid campaigns.",
      slogan: brand.tagline,
      image: shareImage,
      priceRange: "$$",
      areaServed: { "@type": "State", name: contact.region },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "19:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title },
        })),
      },
    },
  ],
});

/**
 * SERVICE
 * The includes list doubles as the offer catalog — it is the most specific
 * description of the work we have, and writing it twice would guarantee the
 * page and the schema eventually disagree.
 */
export const serviceSeo = (service) => {
  const url = absoluteUrl(servicePath(service.slug));

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    canonical: url,
    og: { image: shareImage },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        serviceType: service.title,
        url,
        provider,
        areaServed: { "@type": "State", name: contact.region },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} — what's included`,
          itemListElement: service.includes.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item },
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/#services") },
          { "@type": "ListItem", position: 3, name: service.short, item: url },
        ],
      },
    ],
  };
};

/**
 * INDUSTRY
 * A service page answers "what is performance marketing?"; these answer "what
 * would you do for my clinic?". So the schema is the same Service type, scoped
 * by audience rather than by discipline — and the FAQ block is published as
 * FAQPage because those questions and answers are genuinely on the page.
 */
export const industrySeo = (industry) => {
  const url = absoluteUrl(industryPath(industry.slug));

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    canonical: url,
    og: { image: shareImage },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Digital marketing for ${industry.name}`,
        description: industry.metaDescription,
        serviceType: industry.priority.map((slug) => serviceBySlug(slug)?.title).filter(Boolean),
        url,
        provider,
        areaServed: { "@type": "State", name: contact.region },
        audience: { "@type": "BusinessAudience", name: industry.name },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Industries", item: absoluteUrl("/#about") },
          { "@type": "ListItem", position: 3, name: industry.short, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: industry.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
};

/**
 * WORK
 * One page, not one per project — see work.js for why. The ItemList gives a
 * crawler the shape of the catalog without needing a URL per entry; each
 * item points at the service page that explains the discipline behind it,
 * which is the only place on the site that project currently has a home of
 * its own.
 */
export const workSeo = () => {
  const url = absoluteUrl(workPath());

  return {
    title: `Our Work in ${contact.region} | ${brand.name}`,
    description:
      "Websites, photography, social content, campaigns, Google Business profiles and branding built for local businesses in Assam — one example from each of our six disciplines.",
    canonical: url,
    og: { image: shareImage },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${brand.name} — Our Work`,
        description: "A look at the work behind each of Ramdhenu's six disciplines.",
        url,
        about: provider,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Work", item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: work.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: project.name,
          url: absoluteUrl(servicePath(project.services[0])),
        })),
      },
    ],
  };
};

/** Nothing here should ever be indexed, and it has no canonical of its own. */
export const notFoundSeo = () => ({
  title: `Page not found — ${brand.name}`,
  description: "That page has moved or never existed. The six services are listed here.",
  robots: "noindex, follow",
});

/**
 * Every route worth writing to disk, in the order the sitemap lists them.
 * `file` is relative to dist/; `path` is the URL it will be served at.
 */
export const staticRoutes = () => [
  { path: "/", file: "index.html", seo: homeSeo(), priority: "1.0" },
  ...services.map((service) => ({
    path: servicePath(service.slug),
    file: `services/${service.slug}/index.html`,
    seo: serviceSeo(service),
    priority: "0.8",
  })),
  ...industries.map((industry) => ({
    path: industryPath(industry.slug),
    file: `industries/${industry.slug}/index.html`,
    seo: industrySeo(industry),
    priority: "0.7",
  })),
  {
    path: workPath(),
    file: "work/index.html",
    seo: workSeo(),
    priority: "0.8",
  },
  /* Not in the sitemap: the host's 404 document, and the SPA fallback for any
     path the router does not know. */
  { path: null, file: "404.html", seo: notFoundSeo() },
];

/**
 * One route's head, as a flat list of tag descriptors.
 *
 * Both consumers build from this list rather than from the meta object, so the
 * head React writes at runtime is tag-for-tag the head the build wrote into the
 * file — the two cannot drift.
 *
 * `title` is returned as a descriptor too, but callers handle it themselves:
 * the document has exactly one and it is replaced, never appended.
 */
export const headTags = (meta) => {
  const tags = [];
  const push = (tag, attrs, text) => tags.push({ tag, attrs, text });
  const meta_ = (attr, key, content) => {
    if (content) push("meta", { [attr]: key, content });
  };

  meta_("name", "description", meta.description);
  meta_("name", "author", brand.name);
  meta_("name", "robots", meta.robots);

  if (meta.canonical) push("link", { rel: "canonical", href: meta.canonical });

  const og = meta.og ?? {};
  const ogTitle = og.title ?? meta.title;
  const ogDescription = og.description ?? meta.description;

  meta_("property", "og:type", "website");
  meta_("property", "og:url", meta.canonical);
  meta_("property", "og:site_name", brand.name);
  meta_("property", "og:title", ogTitle);
  meta_("property", "og:description", ogDescription);
  meta_("property", "og:image", og.image);
  meta_("property", "og:image:width", og.imageWidth);
  meta_("property", "og:image:height", og.imageHeight);
  meta_("property", "og:image:alt", og.imageAlt);

  meta_("name", "twitter:card", og.image ? "summary_large_image" : "summary");
  meta_("name", "twitter:title", ogTitle);
  meta_("name", "twitter:description", ogDescription);
  meta_("name", "twitter:image", og.image);

  for (const block of meta.jsonLd ?? []) {
    push("script", { type: "application/ld+json" }, JSON.stringify(block, null, 2));
  }

  return tags;
};
