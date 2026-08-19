import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Plate from "./Plate";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { services, PROJECTS_ARE_PLACEHOLDER } from "../data/services";

/**
 * SERVICES — an accordion rather than a card grid.
 *
 * Six ruled rows, one open at a time, each revealing the project that proves
 * the discipline. It keeps the section to one screen of structure while still
 * showing work, and the rules carry the system's grid.
 *
 * The open row is marked with an accent edge as well as the chevron, so the
 * list always shows where you are — that lives in app.css because it needs
 * :has() on the parent.
 */
export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="section-y bg-panel">
      <div className="shell">
        <Reveal>
          <SectionIndex num="02" label="What we do" />
        </Reveal>

        <Reveal className="mb-[clamp(40px,6vw,72px)] max-w-[640px]">
          <h2 className="display mb-3 text-[clamp(32px,4vw,52px)]">Our Services &amp; Work</h2>
          <p className="text-muted m-0 text-base">
            Six disciplines, one team. Select a service to see it in action.
          </p>
        </Reveal>

        <div className="border-t border-line">
          {services.map((service, index) => {
            const isOpen = index === openIndex;
            const panelId = `service-panel-${index}`;
            const headingId = `service-heading-${index}`;

            return (
              <div className="service border-b border-line transition-colors" key={service.num}>
                <h3 className="m-0">
                  <button
                    type="button"
                    id={headingId}
                    className="service__toggle group flex w-full cursor-pointer items-center gap-[clamp(16px,3vw,40px)] px-[clamp(0px,1.4vw,18px)] py-[clamp(18px,2.2vw,28px)] text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="w-7 flex-none font-display text-sm text-steel-700">
                      {service.num}
                    </span>
                    <span className="flex-1 font-display text-[clamp(19px,2.2vw,30px)] uppercase transition-colors duration-150 group-hover:text-steel-700">
                      {service.title}
                    </span>
                    <span className="text-muted hidden max-w-[300px] flex-1 text-sm min-[900px]:block">
                      {service.blurb}
                    </span>
                    <span className="btn btn-icon btn-secondary pointer-events-none flex-none">
                      <Icon name={isOpen ? "chevronDown" : "arrowRight"} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-[clamp(24px,4vw,56px)] pb-[clamp(32px,4vw,56px)]">
                        <Blueprint
                          className={`relative block aspect-4/3 min-w-[240px] flex-[0_1_clamp(260px,34vw,440px)] ${
                            service.project.image ? "duotone" : ""
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
                            <Plate
                              motif={service.project.motif}
                              label={`${service.project.name} — ${service.title}`}
                            />
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
                          <h4 className="display text-[clamp(22px,2.4vw,30px)]">
                            {service.project.name}
                          </h4>
                          <p className="text-muted m-0 text-[15px]">{service.project.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {PROJECTS_ARE_PLACEHOLDER && (
          <p className="text-muted mt-6 mb-0 text-[13px]">
            <span className="tag tag-outline mr-2">Sample</span>
            Example projects shown for layout — replaced with real case studies as they publish.
          </p>
        )}
      </div>
    </section>
  );
}
