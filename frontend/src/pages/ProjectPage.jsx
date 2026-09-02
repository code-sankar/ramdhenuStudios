import { Link, useParams } from "react-router-dom";

import Blueprint from "../components/Blueprint";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import Plate from "../components/Plate";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import SectionIndex from "../components/ui/SectionIndex";
import { Stagger, StaggerItem } from "../components/ui/Stagger";
import { serviceBySlug } from "../data/services";
import { work, workBySlug } from "../data/work";
import { projectPath, projectSeo, servicePath, workPath } from "../data/seo";
import { whatsappLink } from "../data/site";
import { track } from "../lib/track";
import NotFoundPage from "./NotFoundPage";

/**
 * PROJECT — one case study, at /work/<slug>/.
 *
 * WHY THIS EXISTS NOW WHEN THE README SAID IT SHOULD NOT. The original note was
 * that six illustrative projects did not justify six public pages of "Sample"
 * disclaimers, and it ended "add a dedicated case-study template later, once a
 * project has earned one". That objection was about what search engines and
 * visitors would find, not about the template being wrong — so the template is
 * built and every placeholder page carries `noindex` until its entry stops
 * being a placeholder. Nothing unearned is indexed, and the page a real project
 * will need already works.
 *
 * THE SHAPE IS BRIEF → APPROACH → SHIPPED, AND THAT ORDER IS THE ARGUMENT. Most
 * agency case studies open with what was made, which reads as a portfolio: look
 * at this. Opening with the problem the client walked in with reads as a
 * diagnosis, and the same list of deliverables afterwards then answers
 * something instead of just existing. A visitor is on this page to work out
 * whether their own problem is one we recognise.
 *
 * NO RESULTS SECTION, DELIBERATELY. The obvious fourth block is outcomes, and
 * it is missing for the same reason work.js refuses to carry a number: an
 * outcome nobody has agreed to be quoted on is a claim, and this site does not
 * make claims it cannot source. When a client will stand behind one, it belongs
 * here — as their words, not ours.
 */
export default function ProjectPage() {
  const { slug } = useParams();
  const project = workBySlug(slug);

  if (!project) return <NotFoundPage />;

  const primary = serviceBySlug(project.services[0]);
  const related = project.services.map(serviceBySlug).filter(Boolean);
  const others = work
    .filter((entry) => entry.slug !== project.slug)
    .slice(0, 3);

  /* Positional, like the service pages: a project without a gallery must not
     leave a hole in the numbering. */
  const order = [
    "brief",
    "approach",
    "shipped",
    project.gallery?.length && "gallery",
  ].filter(Boolean);
  const num = (key) => String(order.indexOf(key) + 1).padStart(2, "0");
  const band = (key) => (order.indexOf(key) % 2 ? "bg-lav-100" : "bg-lav-50");

  return (
    <Layout skipTo="#project-body">
      <Seo meta={projectSeo(project)} />

      {/* ── MASTHEAD ── */}
      <section className="masthead field-fade grain relative overflow-hidden pb-[clamp(56px,7vw,96px)]">
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex list-none flex-wrap items-center gap-x-2 p-0 text-[12px] tracking-[0.08em] text-white uppercase max-md:text-[12.5px]">
              <li>
                <Link
                  to="/"
                  className="inline-block py-2 text-white no-underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to={workPath()}
                  className="inline-block py-2 text-white no-underline"
                >
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-4 flex flex-wrap items-center gap-3 font-display text-[13px] tracking-[0.1em] text-white">
                <span>{project.category}</span>
                <span aria-hidden="true" className="h-px w-8 bg-white/35" />
                <span>{project.year}</span>
              </p>
              <h1 className="display text-[clamp(34px,5.6vw,72px)] leading-[0.98] tracking-[-0.022em] text-white">
                {project.name}
              </h1>

              {/* THE PLACEHOLDER BANNER IS THE FIRST THING UNDER THE TITLE, not
                  a footnote. A sample case study that has to be scrolled to
                  before it admits what it is has already been read as real. */}
              {project.placeholder && (
                <p className="mt-6 flex max-w-[52ch] flex-wrap items-baseline gap-2 border border-white/30 p-3 text-[13px] leading-relaxed text-white">
                  <span className="tag tag-outline border-white/50 text-white">
                    Sample
                  </span>
                  An example project, shown so this page can be seen working. It
                  is not client work and is not indexed.
                </p>
              )}

              {/* A REAL PROJECT GETS THE SAME TREATMENT FOR THE OPPOSITE
                  REASON. The sample banner exists so nobody reads an invented
                  project as real; this one exists so nobody reads a real build
                  as launched. Both are the first thing under the title,
                  because a status a reader has to scroll to has already been
                  read as the absence of one. */}
              {!project.placeholder && project.stage && (
                <p className="mt-6 flex max-w-[52ch] flex-wrap items-baseline gap-2 border border-white/30 p-3 text-[13px] leading-relaxed text-white">
                  <span className="tag tag-outline border-white/50 text-white">
                    Status
                  </span>
                  {project.stage}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <p className="m-0 text-[16.5px] leading-[1.6] text-white">
                {project.desc}
              </p>

              {/* THE LIVE LINK RENDERS ONLY WHEN THERE IS ONE. `liveUrl` is null
                  on every entry today and that is deliberate — see work.js. A
                  link to a client's site is a claim that we built it, so there
                  is no placeholder URL, no "coming soon" and no disabled
                  button: the row simply is not here until it is true. */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() =>
                    track("Live site opened", { project: project.slug })
                  }
                  className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-[26px] py-[13px] font-display text-[15px] text-coral-700 no-underline shadow-sm transition duration-200 hover:-translate-y-px hover:shadow-md"
                >
                  Visit the live site
                  <Icon name="arrowRight" size={15} />
                </a>
              )}

              {/* Where the live link is not yet true, the source is. On a
                  studio's own case study it is also the stronger of the two
                  for a developer reading it — a screenshot shows the surface,
                  a repository shows the build. */}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => track("Source opened", { project: project.slug })}
                  className="inline-flex w-fit items-center gap-2.5 border border-white/40 px-[24px] py-[12px] font-display text-[15px] text-white no-underline transition-colors duration-200 hover:bg-white/10"
                >
                  View the code
                  <Icon name="arrowRight" size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 THE BRIEF ── */}
      <section id="project-body" className={`section-y ${band("brief")}`}>
        <div className="shell grid gap-[clamp(28px,4vw,72px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <SectionIndex num={num("brief")} label="The brief" />
            </Reveal>
            <Reveal>
              <h2 className="display mb-4 text-[clamp(26px,3.2vw,40px)]">
                What they came with
              </h2>
              <p className="m-0 max-w-[62ch] text-[16.5px] leading-[1.65]">
                {project.brief}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:sticky lg:top-32">
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
                <Plate
                  motif={project.motif}
                  label={`${project.name} — ${project.category}`}
                />
              )}
            </Blueprint>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-[14px]">
              <div>
                <dt className="text-muted mb-1 text-[12px] tracking-[0.08em] uppercase">
                  Client
                </dt>
                <dd className="m-0">{project.client}</dd>
              </div>
              <div>
                <dt className="text-muted mb-1 text-[12px] tracking-[0.08em] uppercase">
                  Year
                </dt>
                <dd className="m-0">{project.year}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted mb-1 text-[12px] tracking-[0.08em] uppercase">
                  Disciplines
                </dt>
                <dd className="m-0 flex flex-wrap gap-2">
                  {related.map((service) => (
                    <Link
                      key={service.slug}
                      to={servicePath(service.slug)}
                      className="tag tag-outline no-underline"
                    >
                      {service.short}
                    </Link>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── 02 WHAT WE DID ── */}
      <section className={`section-y ${band("approach")}`}>
        <div className="shell">
          <Reveal>
            <SectionIndex num={num("approach")} label="What we did" />
            <h2 className="display mb-[clamp(32px,4vw,56px)] max-w-[620px] text-[clamp(26px,3.2vw,40px)]">
              The decisions, and why they were made
            </h2>
          </Reveal>

          <Stagger
            as="ol"
            className="m-0 grid list-none gap-3 p-0 lg:grid-cols-3"
          >
            {project.approach.map((step, i) => (
              <StaggerItem as="li" key={step.heading}>
                <div className="flex h-full flex-col gap-3 rounded-lg border border-ink/8 bg-white p-[clamp(20px,2.4vw,28px)] shadow-xs">
                  <span className="font-display text-[12.5px] tracking-[0.12em] text-coral-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(18px,1.8vw,22px)] leading-[1.16] text-ink">
                    {step.heading}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-[1.6] text-ink/70">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 03 WHAT SHIPPED ── */}
      <section className={`section-y ${band("shipped")}`}>
        <div className="shell grid gap-[clamp(28px,4vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <Reveal>
            <SectionIndex num={num("shipped")} label="What shipped" />
            <h2 className="display mb-4 text-[clamp(26px,3.2vw,40px)]">
              Handed over
            </h2>
            <p className="text-muted m-0 max-w-[46ch] text-[15px] leading-relaxed">
              Everything listed here left with the client — files, accounts and
              access included.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="m-0 grid list-none gap-0 p-0">
              {project.shipped.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-line py-[14px] text-[15px] last:border-b-0"
                >
                  <span className="mt-[3px] flex-none text-coral-700">
                    <Icon name="check" size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 04 GALLERY, only when there is one ── */}
      {project.gallery?.length > 0 && (
        <section className={`section-y ${band("gallery")}`}>
          <div className="shell">
            <Reveal>
              <SectionIndex num={num("gallery")} label="A closer look" />
            </Reveal>
            <Stagger
              as="ul"
              className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3"
            >
              {project.gallery.map((shot) => (
                <StaggerItem as="li" key={shot.src}>
                  <Blueprint className="relative block aspect-4/3 w-full">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </Blueprint>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── MORE WORK ── */}
      {others.length > 0 && (
        <section className="section-y bg-lav-50">
          <div className="shell">
            <Reveal>
              <SectionIndex num="—" label="More work" />
            </Reveal>
            <Stagger
              as="ul"
              className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3"
            >
              {others.map((entry) => (
                <StaggerItem as="li" key={entry.slug}>
                  <Link
                    to={projectPath(entry.slug)}
                    className="rimlight group flex h-full flex-col gap-2 rounded-lg border border-ink/8 bg-white p-[clamp(18px,2.2vw,26px)] no-underline shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="text-muted font-display text-[12px] tracking-[0.1em] uppercase">
                      {entry.category}
                    </span>
                    <span className="font-display text-[clamp(17px,1.7vw,21px)] text-ink transition-colors duration-300 group-hover:text-coral-700">
                      {entry.name}
                    </span>
                    <span className="text-[14px] leading-[1.55] text-ink/70">
                      {entry.desc}
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-char-900 py-[clamp(56px,7vw,100px)]">
        <div className="shell relative">
          <Reveal>
            <h2 className="display mb-4 max-w-[18ch] text-[clamp(28px,4vw,52px)] leading-[1.04] text-white">
              Want something like this?
            </h2>
            <p className="mb-8 max-w-[52ch] text-[16px] leading-relaxed text-white/75">
              Tell us what you are working with and we will say honestly whether{" "}
              {primary ? primary.short.toLowerCase() : "this"} is what you need.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-[30px] py-[15px] font-display text-[15px] text-char-900 no-underline transition duration-200 hover:-translate-y-px"
              >
                <Icon name="plus" size={15} strokeWidth={2} />
                Start a project
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("WhatsApp opened", { from: `work/${project.slug}` })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-[28px] py-[15px] font-display text-[15px] text-white no-underline transition duration-200 hover:border-white hover:bg-white/12"
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
