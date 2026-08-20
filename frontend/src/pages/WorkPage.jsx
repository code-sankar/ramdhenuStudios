import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Blueprint from "../components/Blueprint";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import Plate from "../components/Plate";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import SectionIndex from "../components/ui/SectionIndex";
import { Stagger, StaggerItem } from "../components/ui/Stagger";
import { serviceBySlug } from "../data/services";
import { servicePath, workSeo } from "../data/seo";
import { whatsappLink } from "../data/site";
import { work, workCategories } from "../data/work";
import { track } from "../lib/track";

/**
 * WORK PAGE — every project in one place, filterable by discipline.
 *
 * A service page shows one example, chosen for that discipline. This is the
 * same catalog (src/data/work.js) shown whole, so someone deciding between
 * agencies can see the breadth in one screen rather than clicking through six
 * service pages to find it.
 *
 * There is no per-project route. Six illustrative projects do not justify six
 * more pages of "Sample" disclaimers — each card links instead to the service
 * page behind it, which is where the real depth already lives. Add a
 * dedicated case-study template later if a project earns one.
 */
export default function WorkPage() {
  const [filter, setFilter] = useState("all");
  const categories = useMemo(() => workCategories(), []);
  const anyPlaceholder = useMemo(() => work.some((project) => project.placeholder), []);

  const filtered =
    filter === "all" ? work : work.filter((project) => project.services.includes(filter));

  return (
    <Layout skipTo="#work-body">
      <Seo meta={workSeo()} />

      {/* --------------------------------------------------------------------
          MASTHEAD
      -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-steel-900 py-[clamp(56px,7vw,96px)]">
        <div className="hero__grid" aria-hidden="true" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex list-none flex-wrap items-center gap-x-2 p-0 text-[12px] tracking-[0.08em] text-paper/55 uppercase max-md:text-[12.5px]">
              <li>
                <Link
                  to="/"
                  className="inline-block py-2 text-paper/70 no-underline transition-colors duration-150 hover:text-paper"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-paper/85">
                Work
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-4 flex items-center gap-3 font-display text-[13px] tracking-[0.1em] text-steel-300">
                <span aria-hidden="true" className="h-px w-8 bg-paper/30" />
                <span>Portfolio</span>
              </p>
              <h1 className="display on-steel text-[clamp(34px,5.6vw,72px)] leading-[0.98] tracking-[-0.022em]">
                Our Work
              </h1>
            </div>

            <p className="text-[16.5px] leading-[1.6] text-paper/75">
              One example from each of our six disciplines — websites, photography, social
              content, campaigns, Google Business profiles and branding, built for local
              businesses in Assam.
            </p>
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
              onClick={() => track("WhatsApp click", { from: "work" })}
              className="inline-flex items-center gap-[9px] border border-paper/25 px-[26px] py-[15px] font-display text-[15px] text-paper/90 no-underline transition duration-200 hover:border-paper/45 hover:bg-paper/10"
            >
              <Icon name="whatsapp" size={16} />
              Ask a question
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          THE PROJECTS
      -------------------------------------------------------------------- */}
      <section id="work-body" className="section-y bg-paper">
        <div className="shell">
          <Reveal>
            <SectionIndex num="01" label="Selected projects" />
          </Reveal>

          <Reveal delay={0.05} className="mb-[clamp(28px,3.4vw,40px)] flex flex-wrap gap-[8px]">
            <div
              role="group"
              aria-label="Filter by service"
              className="flex flex-wrap gap-[8px]"
            >
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
                All work
              </FilterChip>
              {categories.map((slug) => {
                const service = serviceBySlug(slug);
                if (!service) return null;
                return (
                  <FilterChip key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
                    {service.short}
                  </FilterChip>
                );
              })}
            </div>
          </Reveal>

          <Stagger
            as="ul"
            className="m-0 grid list-none grid-cols-1 gap-[clamp(24px,3vw,40px)] p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => {
              const primaryService = serviceBySlug(project.services[0]);
              return (
                <StaggerItem as="li" key={project.slug} className="flex flex-col">
                  <Blueprint className="relative block aspect-4/3 w-full">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.name} — ${project.category}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Plate motif={project.motif} label={`${project.name} — ${project.category}`} />
                    )}
                  </Blueprint>

                  <div className="flex flex-1 flex-col gap-2.5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span className="tag tag-outline" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="display text-[clamp(19px,2vw,23px)]">{project.name}</h3>
                    <p className="text-muted m-0 flex-1 text-[14.5px] leading-relaxed">
                      {project.desc}
                    </p>
                    {project.placeholder && (
                      <p className="text-muted m-0 text-[13px]">
                        <span className="tag tag-outline mr-2">Sample</span>
                        Example project shown for layout.
                      </p>
                    )}
                    {primaryService && (
                      <Link
                        to={servicePath(primaryService.slug)}
                        className="linkish mt-1 inline-flex w-fit items-center gap-1.5 text-[14px]"
                      >
                        See how we did it
                        <Icon name="arrowRight" size={14} />
                      </Link>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {anyPlaceholder && (
            <p className="text-muted mt-[clamp(24px,3vw,36px)] max-w-[64ch] text-[13.5px] leading-relaxed">
              Some work above is shown for layout while we gather permission to publish real
              client projects — each is marked "Sample" rather than left to look genuine.
            </p>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------------------
          CLOSING ASK
      -------------------------------------------------------------------- */}
      <section className="bg-steel-900 py-[clamp(56px,7vw,100px)]">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="display on-steel text-[clamp(28px,4vw,48px)] leading-[1.05]">
              Want to see your business here?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16px] text-paper/70">
              Tell us where it is now. We&apos;ll tell you which of our six disciplines is worth
              starting with.
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

/** One toggle in the discipline filter — plain bordered chip, no Blueprint
    marks. The corner-mark treatment reads well at card scale; on a chip this
    small it would clutter more than it frames. */
function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`border px-[13px] py-[8px] font-display text-[12px] tracking-[0.04em] uppercase transition-colors duration-150 max-md:min-h-[44px] ${
        active
          ? "border-steel bg-steel text-paper"
          : "border-line text-ink/65 hover:border-steel/45 hover:text-steel-700"
      }`}
    >
      {children}
    </button>
  );
}
