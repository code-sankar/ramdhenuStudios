import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import ProjectCover from "../ui/ProjectCover";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";
import { filters, projects, PROJECTS_ARE_PLACEHOLDER } from "../../data/projects";
import { EASE_EXPO, viewport } from "../../lib/motion";

export default function Work() {
  const [active, setActive] = useState("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="work" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            description="A closer look at how strategy, visuals and campaigns come together for local businesses."
            className="lg:max-w-2xl"
          />

          {/* Filters */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 lg:mx-0 lg:px-0"
          >
            {filters.map((filter) => {
              const isActive = active === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(filter.id)}
                  className={cn(
                    "relative shrink-0 rounded-md px-3.5 py-2 font-display text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-200",
                    isActive ? "text-ink-950" : "text-mist-400 hover:text-mist-50",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-filter"
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                      className="absolute inset-0 rounded-md bg-mist-50"
                    />
                  )}
                  <span className="relative">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                /* The two lead projects run wide when nothing is filtered. */
                wide={active === "all" && project.featured}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          {PROJECTS_ARE_PLACEHOLDER && (
            <p className="flex items-center gap-2.5 text-[0.8125rem] text-mist-500">
              <span className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.625rem] tracking-widest text-mist-400 uppercase">
                Sample
              </span>
              Example projects shown for layout — replaced with real case studies as they publish.
            </p>
          )}
          <Button to="contact" variant="secondary" icon="arrowUpRight">
            Start your project
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, wide }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: EASE_EXPO, delay: Math.min(index * 0.05, 0.25) }}
      viewport={viewport}
      className="group relative overflow-hidden rounded-xl border border-line bg-ink-900 transition-colors duration-300 hover:border-line-volt"
    >
      <a href="#contact" className="block focus-visible:outline-offset-[-3px]">
        <div className={cn("relative overflow-hidden", wide ? "aspect-16/10" : "aspect-3/2")}>
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
            <ProjectCover project={project} />
          </div>

          <span className="absolute top-4 left-4 rounded-sm border border-line-strong bg-ink-950/70 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-mist-200 uppercase backdrop-blur-sm">
            {project.categoryLabel}
          </span>

          <span className="absolute right-4 bottom-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-line-strong bg-ink-950/70 text-mist-50 opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </span>
        </div>

        <div className="p-6 lg:p-7">
          <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.025em] text-mist-50">
            {project.name}
          </h3>
          <p className="mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-mist-400">
            {project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {project.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-wide text-mist-500 uppercase">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-volt-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.article>
  );
}
