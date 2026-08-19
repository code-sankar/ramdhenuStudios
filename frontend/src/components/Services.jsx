import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Plate from "./Plate";
import Reveal from "./Reveal";
import { services, PROJECTS_ARE_PLACEHOLDER } from "../data/services";

/**
 * SERVICES — an accordion rather than a card grid.
 *
 * Six ruled rows, one open at a time, each revealing the project that proves
 * the discipline. It keeps the section to one screen of structure while still
 * showing work, and the horizontal rules carry the system's grid.
 */
export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="section section--surface">
      <div className="shell">
        <Reveal>
          <p className="section-index">
            <span className="section-index__num">02</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span className="kicker">What we do</span>
          </p>
        </Reveal>

        <Reveal className="services__head">
          <h2 className="section-title services__title">Our Services &amp; Work</h2>
          <p className="text-muted" style={{ fontSize: 16, margin: 0 }}>
            Six disciplines, one team. Select a service to see it in action.
          </p>
        </Reveal>

        <div className="services__list">
          {services.map((service, index) => {
            const isOpen = index === openIndex;
            const panelId = `service-panel-${index}`;
            const headingId = `service-heading-${index}`;

            return (
              <div className="service" key={service.num}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={headingId}
                    className="service__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="service__num">{service.num}</span>
                    <span className="service__title">{service.title}</span>
                    <span className="service__blurb text-muted">{service.blurb}</span>
                    <span className="btn btn-icon btn-secondary" style={{ pointerEvents: "none", flex: "none" }}>
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
                      style={{ overflow: "hidden" }}
                    >
                      <div className="service__panel">
                        <Blueprint
                          className={`service__figure${service.project.image ? " duotone" : ""}`}
                        >
                          {service.project.image ? (
                            <img
                              src={service.project.image}
                              alt={`${service.project.name} — ${service.title}`}
                              loading="lazy"
                              decoding="async"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <Plate
                              motif={service.project.motif}
                              label={`${service.project.name} — ${service.title}`}
                            />
                          )}
                        </Blueprint>

                        <div className="service__meta">
                          <div className="service__tags">
                            {service.project.tags.map((tag) => (
                              <span className="tag tag-outline" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h4 className="service__project">{service.project.name}</h4>
                          <p className="text-muted" style={{ fontSize: 15, margin: 0 }}>
                            {service.project.desc}
                          </p>
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
          <p
            className="text-muted"
            style={{ fontSize: 13, marginTop: "var(--space-6)", marginBottom: 0 }}
          >
            <span className="tag tag-outline" style={{ marginRight: "var(--space-2)" }}>
              Sample
            </span>
            Example projects shown for layout — replaced with real case studies as they publish.
          </p>
        )}
      </div>
    </section>
  );
}
