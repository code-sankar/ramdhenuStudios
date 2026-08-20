import { Link, useParams } from "react-router-dom";

import Blueprint from "../components/Blueprint";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import SectionIndex from "../components/ui/SectionIndex";
import { Stagger, StaggerItem } from "../components/ui/Stagger";
import { industryBySlug, industries } from "../data/industries";
import { industryPath, industrySeo, servicePath } from "../data/seo";
import { serviceBySlug } from "../data/services";
import { contact, whatsappLink } from "../data/site";
import { track } from "../lib/track";
import NotFoundPage from "./NotFoundPage";

/**
 * INDUSTRY PAGE — the component every /industries/<slug>/ route renders.
 *
 * The service pages explain a discipline. These explain a trade: what is
 * different about marketing a clinic or a restaurant, which of the six
 * services matter most for it and in what order, and what the first weeks
 * look like. Someone searching "restaurant marketing Guwahati" gets a page
 * about restaurants rather than a generic services list.
 *
 * Every page routes into the services rather than competing with them — the
 * `priority` list is the spine of the page and each entry links through.
 */
export default function IndustryPage() {
  const { slug } = useParams();
  const industry = industryBySlug(slug);

  if (!industry) return <NotFoundPage />;

  const priority = industry.priority.map(serviceBySlug).filter(Boolean);
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <Layout skipTo="#industry-body">
      <Seo meta={industrySeo(industry)} />

      {/* --------------------------------------------------------------------
          MASTHEAD
      -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-steel-900 py-[clamp(56px,7vw,96px)]">
        <div className="hero__grid" aria-hidden="true" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex list-none flex-wrap items-center gap-x-2 p-0 text-[12px] tracking-[0.08em] text-paper/55 uppercase max-md:text-[12.5px]">
              <li>
                <Link to="/" className="inline-block py-2 no-underline hover:text-steel-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/#about" className="inline-block py-2 no-underline hover:text-steel-300">
                  Industries
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-paper/85">
                {industry.short}
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-4 flex items-center gap-3 font-display text-[13px] tracking-[0.1em] text-steel-300">
                <span>{industry.num}</span>
                <span aria-hidden="true" className="h-px w-8 bg-paper/30" />
                <span>Industry</span>
              </p>
              <h1 className="display on-steel text-[clamp(30px,5vw,64px)] leading-[1] tracking-[-0.022em]">
                {industry.name} in {contact.region}
              </h1>
            </div>

            <p className="text-[16.5px] leading-[1.6] text-paper/75">{industry.lede}</p>
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
              onClick={() => track("WhatsApp click", { from: "industry", industry: industry.name })}
              className="inline-flex items-center gap-[9px] border border-paper/25 px-[26px] py-[15px] font-display text-[15px] text-paper/90 no-underline transition duration-200 hover:border-paper/45 hover:bg-paper/10"
            >
              <Icon name="whatsapp" size={16} />
              Ask a question
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          WHAT IS DIFFERENT ABOUT THIS TRADE
      -------------------------------------------------------------------- */}
      <section id="industry-body" className="section-y bg-paper">
        <div className="shell grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div>
            <SectionIndex num="01" label="What's different here" />
            {industry.situation.map((block) => (
              <Reveal key={block.heading} className="mb-[clamp(28px,3.4vw,44px)] last:mb-0">
                <h2 className="display mb-3 text-[clamp(20px,2.2vw,27px)]">{block.heading}</h2>
                <p className="m-0 max-w-[64ch] text-[16.5px] leading-[1.62] text-ink/72">
                  {block.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Which services matter, in order — the spine of the page */}
          <Reveal delay={0.08} className="lg:sticky lg:top-32">
            <Blueprint className="block bg-panel p-[clamp(22px,2.6vw,30px)]">
              <p className="mb-1 font-display text-[11px] tracking-[0.14em] text-steel-700 uppercase">
                Where we'd start
              </p>
              <p className="text-muted mt-2 mb-5 text-[13.5px] leading-relaxed">
                In this order, for most {industry.plural}.
              </p>
              <ol className="m-0 list-none p-0">
                {priority.map((service, i) => (
                  <li key={service.slug} className="border-b border-line last:border-b-0">
                    <Link
                      to={servicePath(service.slug)}
                      className="group flex items-start gap-3 py-3.5 no-underline"
                    >
                      <span className="mt-0.5 font-display text-[12px] tracking-[0.1em] text-steel-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-[15.5px] uppercase transition-colors duration-150 group-hover:text-steel-700">
                          {service.title}
                        </span>
                        <span className="text-muted mt-0.5 block text-[13.5px] leading-snug">
                          {service.blurb}
                        </span>
                      </span>
                      <Icon
                        name="arrowRight"
                        size={15}
                        className="mt-1 flex-none text-steel-700 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </Blueprint>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          THE FIRST MOVES
      -------------------------------------------------------------------- */}
      <section className="section-y bg-panel">
        <div className="shell">
          <Reveal>
            <SectionIndex num="02" label="Where it starts" />
            <h2 className="display mb-[clamp(32px,4vw,56px)] text-[clamp(26px,3.2vw,40px)]">
              The first things we'd do
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <Stagger
              as="ol"
              className="grid list-none gap-px border-t border-ink p-0 sm:grid-cols-2 lg:grid-cols-4"
            >
              {industry.firstMoves.map((move, i) => (
                <StaggerItem
                  as="li"
                  key={move.step}
                  className="border-line pt-6 pr-6 pb-6 sm:border-r sm:last:border-r-0"
                >
                  <span className="font-display text-[12px] tracking-[0.12em] text-steel-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-2 mb-2 text-[clamp(17px,1.8vw,21px)]">{move.step}</h3>
                  <p className="text-muted m-0 max-w-[34ch] text-[14.5px] leading-relaxed">
                    {move.body}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal delay={0.1} className="mt-[clamp(40px,5vw,72px)]">
            <h3 className="display mb-5 text-[clamp(18px,2vw,24px)]">What changes</h3>
            <ul className="grid list-none gap-x-10 gap-y-3 p-0 sm:grid-cols-2">
              {industry.outcomes.map((o) => (
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
          FAQ
      -------------------------------------------------------------------- */}
      <section className="section-y bg-paper">
        <div className="shell grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          <Reveal>
            <SectionIndex num="03" label="Before you ask" />
            <h2 className="display text-[clamp(24px,3vw,36px)]">
              Questions from {industry.plural}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <dl className="m-0 border-t border-line">
              {industry.faqs.map((f) => (
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
          THE OTHER TRADES
      -------------------------------------------------------------------- */}
      <section className="section-y bg-panel">
        <div className="shell">
          <Reveal>
            <SectionIndex num="04" label="Also from us" />
            <h2 className="display mb-[clamp(28px,3.4vw,44px)] text-[clamp(24px,3vw,36px)]">
              Who else we work with
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <Stagger as="ul" className="m-0 list-none border-t border-line p-0">
              {others.map((i) => (
                <StaggerItem as="li" key={i.slug} className="border-b border-line">
                  <Link
                    to={industryPath(i.slug)}
                    className="group flex items-center gap-[clamp(16px,3vw,40px)] py-5 no-underline"
                  >
                    <span className="w-7 flex-none font-display text-[13px] text-steel-700">
                      {i.num}
                    </span>
                    <span className="flex-1 font-display text-[clamp(17px,2vw,26px)] uppercase transition-colors duration-150 group-hover:text-steel-700">
                      {i.name}
                    </span>
                    <span className="text-muted hidden max-w-[320px] flex-1 text-sm min-[900px]:block">
                      {i.blurb}
                    </span>
                    <span className="btn btn-icon btn-secondary pointer-events-none flex-none">
                      <Icon name="arrowRight" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
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
              Run a {industry.singular} in {contact.region}?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16px] text-paper/70">
              Tell us where it is now. We&apos;ll tell you which of these is worth doing first —
              and which of them you can skip.
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
