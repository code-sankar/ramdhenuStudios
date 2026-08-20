import { Link, useParams } from "react-router-dom";

import Blueprint from "../components/Blueprint";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import Plate from "../components/Plate";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import SectionIndex from "../components/ui/SectionIndex";
import { serviceBySlug, services } from "../data/services";
import { serviceSeo, servicePath } from "../data/seo";
import { whatsappLink } from "../data/site";
import { track } from "../lib/track";
import NotFoundPage from "./NotFoundPage";

/**
 * SERVICE PAGE — the component every /services/<slug>/ route renders.
 *
 * These pages exist to be found. Someone searching "website design Guwahati"
 * lands here, not on the home page, so each one has to answer the whole
 * question on its own: what it is, what is included, how it runs, what it
 * changes, and what it costs in effort from them. The home page's services
 * section is an index that points here.
 *
 * The slug comes from the route, the content from src/data/services.js, and
 * the head from src/data/seo.js — so a new service is one entry in that data
 * file and nothing else.
 */
export default function ServicePage() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);

  /* Only reachable if someone types a slug we do not have, or renames one and
     leaves a link behind. Show the 404 at this URL rather than redirecting —
     the address bar should keep saying what was asked for. */
  if (!service) return <NotFoundPage />;

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <Layout skipTo="#service-body">
      <Seo meta={serviceSeo(service)} />

      {/* --------------------------------------------------------------------
          MASTHEAD — steel field, same as the home hero
      -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-steel-900 py-[clamp(56px,7vw,96px)]">
        <div className="hero__grid" aria-hidden="true" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex list-none flex-wrap items-center gap-2 p-0 text-[12px] tracking-[0.08em] text-paper/55 uppercase">
              <li>
                <Link to="/" className="no-underline hover:text-steel-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/#services" className="no-underline hover:text-steel-300">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-paper/85">
                {service.short}
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-4 flex items-center gap-3 font-display text-[13px] tracking-[0.1em] text-steel-300">
                <span>{service.num}</span>
                <span aria-hidden="true" className="h-px w-8 bg-paper/30" />
                <span>Service</span>
              </p>
              <h1 className="display on-steel text-[clamp(34px,5.6vw,72px)] leading-[0.98] tracking-[-0.022em]">
                {service.title}
              </h1>
            </div>

            <p className="text-[16.5px] leading-[1.6] text-paper/75">{service.lede}</p>
          </div>

          <div className="mt-[clamp(32px,4vw,52px)] flex flex-wrap items-center gap-3 border-t border-paper/20 pt-[clamp(24px,3vw,34px)]">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-[9px] border border-steel bg-steel px-[26px] py-[15px] font-display text-[15px] on-steel no-underline transition duration-200 hover:-translate-y-px hover:bg-steel-400"
            >
              <Icon name="plus" size={15} strokeWidth={2} />
              Start a Project
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("WhatsApp click", { from: "service", service: service.title })}
              className="inline-flex items-center gap-[9px] border border-paper/25 px-[26px] py-[15px] font-display text-[15px] text-paper/90 no-underline transition duration-200 hover:border-paper/45 hover:bg-paper/10"
            >
              <Icon name="whatsapp" size={16} />
              Ask a question
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          THE EXPLANATION
      -------------------------------------------------------------------- */}
      <section id="service-body" className="section-y bg-paper">
        <div className="shell grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div>
            <SectionIndex num="01" label="What this is" />
            {service.sections.map((block) => (
              <Reveal key={block.heading} className="mb-[clamp(28px,3.4vw,44px)] last:mb-0">
                <h2 className="display mb-3 text-[clamp(20px,2.2vw,27px)]">{block.heading}</h2>
                <p className="m-0 max-w-[64ch] text-[16.5px] leading-[1.62] text-ink/72">
                  {block.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Who it's for + what's included, as a spec panel */}
          <Reveal delay={0.08} className="lg:sticky lg:top-32">
            <Blueprint className="block bg-panel p-[clamp(22px,2.6vw,30px)]">
              <p className="mb-3 font-display text-[11px] tracking-[0.14em] text-steel-700 uppercase">
                Typically for
              </p>
              <ul className="mb-8 flex list-none flex-wrap gap-[6px] p-0">
                {service.forWho.map((w) => (
                  <li
                    key={w}
                    className="border border-line px-[9px] py-[4px] font-display text-[11px] tracking-[0.03em] text-ink/65 uppercase"
                  >
                    {w}
                  </li>
                ))}
              </ul>

              <p className="mb-3 font-display text-[11px] tracking-[0.14em] text-steel-700 uppercase">
                What's included
              </p>
              <ul className="m-0 list-none p-0">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border-b border-line py-2.5 text-[14.5px] leading-snug last:border-b-0"
                  >
                    <Icon name="check" size={15} className="mt-0.5 flex-none text-steel-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </Blueprint>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          HOW IT RUNS
      -------------------------------------------------------------------- */}
      <section className="section-y bg-panel">
        <div className="shell">
          <Reveal>
            <SectionIndex num="02" label="How it runs" />
            <h2 className="display mb-[clamp(32px,4vw,56px)] text-[clamp(26px,3.2vw,40px)]">
              Four stages, every time
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <ol className="grid list-none gap-px border-t border-ink p-0 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((stage, i) => (
                <li key={stage.step} className="border-line pt-6 pr-6 pb-6 sm:border-r sm:last:border-r-0">
                  <span className="font-display text-[12px] tracking-[0.12em] text-steel-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-2 mb-2 text-[clamp(17px,1.8vw,21px)]">{stage.step}</h3>
                  <p className="text-muted m-0 max-w-[34ch] text-[14.5px] leading-relaxed">
                    {stage.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* What changes — deliberately not numbers we cannot stand behind */}
          <Reveal delay={0.1} className="mt-[clamp(40px,5vw,72px)]">
            <h3 className="display mb-5 text-[clamp(18px,2vw,24px)]">What changes</h3>
            <ul className="grid list-none gap-x-10 gap-y-3 p-0 sm:grid-cols-2">
              {service.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-[15.5px] leading-relaxed">
                  <Icon name="arrowRight" size={16} className="mt-1 flex-none text-steel-700" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          THE WORK
      -------------------------------------------------------------------- */}
      <section className="section-y bg-paper">
        <div className="shell">
          <Reveal>
            <SectionIndex num="03" label="The work" />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex flex-wrap gap-[clamp(24px,4vw,56px)]">
              <Blueprint
                className={`relative block aspect-4/3 min-w-[240px] flex-[0_1_clamp(260px,34vw,460px)] ${
                  service.project.image ? "" : ""
                }`}
              >
                {service.project.image ? (
                  <img
                    src={service.project.image}
                    alt={`${service.project.name} — ${service.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Plate motif={service.project.motif} label={`${service.project.name} — ${service.title}`} />
                )}
              </Blueprint>

              <div className="flex min-w-[260px] flex-[1_1_340px] flex-col justify-center gap-3 py-3">
                <div className="flex flex-wrap gap-2">
                  {service.project.tags.map((tag) => (
                    <span className="tag tag-outline" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="display text-[clamp(22px,2.4vw,30px)]">{service.project.name}</h3>
                <p className="text-muted m-0 text-[15px]">{service.project.desc}</p>
                {service.project.placeholder && (
                  <p className="text-muted mt-2 mb-0 text-[13px]">
                    <span className="tag tag-outline mr-2">Sample</span>
                    Example project shown for layout.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SERVICE FAQ
      -------------------------------------------------------------------- */}
      <section className="section-y bg-panel">
        <div className="shell grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          <Reveal>
            <SectionIndex num="04" label="Before you ask" />
            <h2 className="display text-[clamp(24px,3vw,36px)]">Questions on this service</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <dl className="m-0 border-t border-line">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-b border-line py-6">
                  <dt className="display mb-2.5 text-[clamp(16px,1.5vw,19px)]">{f.q}</dt>
                  <dd className="text-muted m-0 max-w-[64ch] text-[15px] leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          THE OTHER FIVE
      -------------------------------------------------------------------- */}
      <section className="section-y bg-paper">
        <div className="shell">
          <Reveal>
            <SectionIndex num="05" label="Also from us" />
            <h2 className="display mb-[clamp(28px,3.4vw,44px)] text-[clamp(24px,3vw,36px)]">
              One team, five other disciplines
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="m-0 list-none border-t border-line p-0">
              {others.map((s) => (
                <li key={s.slug} className="border-b border-line">
                  <Link
                    to={servicePath(s.slug)}
                    className="group flex items-center gap-[clamp(16px,3vw,40px)] py-5 no-underline"
                  >
                    <span className="w-7 flex-none font-display text-[13px] text-steel-700">{s.num}</span>
                    <span className="flex-1 font-display text-[clamp(17px,2vw,26px)] uppercase transition-colors duration-150 group-hover:text-steel-700">
                      {s.title}
                    </span>
                    <span className="text-muted hidden max-w-[300px] flex-1 text-sm min-[900px]:block">
                      {s.blurb}
                    </span>
                    <span className="btn btn-icon btn-secondary pointer-events-none flex-none">
                      <Icon name="arrowRight" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          CLOSING ASK
      -------------------------------------------------------------------- */}
      <section className="bg-steel-900 py-[clamp(56px,7vw,100px)]">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="display on-steel text-[clamp(28px,4vw,48px)] leading-[1.05]">
              Let&apos;s talk about {service.short.toLowerCase()}.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16px] text-paper/70">
              Tell us where the business is now. We&apos;ll tell you whether this is the right
              place to start — and say so if it isn&apos;t.
            </p>
          </div>
          <Link
            to="/#contact"
            className="inline-flex flex-none items-center gap-[9px] border border-steel bg-steel px-[28px] py-[16px] font-display text-[16px] on-steel no-underline transition duration-200 hover:-translate-y-px hover:bg-steel-400"
          >
            <Icon name="plus" size={16} strokeWidth={2} />
            Start a Project
          </Link>
        </div>
      </section>
    </Layout>
  );
}
