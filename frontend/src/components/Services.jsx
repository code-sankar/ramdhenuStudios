import { Link } from "react-router-dom";

import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { servicePath } from "../data/seo";
import { services } from "../data/services";

/**
 * SERVICES — an index, not the content.
 *
 * This was an accordion that revealed a project inline. With a full page behind
 * each discipline that job has moved: the row's only remaining task is to say
 * what the service is and get you to the page that explains it. Six ruled rows,
 * each a link — no state, no disclosure, nothing to open by mistake.
 */
export default function Services() {
  return (
    <section id="services" className="section-y bg-panel">
      <div className="shell">
        <Reveal>
          <SectionIndex num="02" label="What we do" />
        </Reveal>

        <Reveal className="mb-[clamp(40px,6vw,72px)] max-w-[640px]">
          <h2 className="display mb-3 text-[clamp(32px,4vw,52px)]">Our Services</h2>
          <p className="text-muted m-0 text-base">
            Six disciplines, one team. Each one has a page explaining what it involves, what it
            includes and how it runs.
          </p>
        </Reveal>

        <ul className="m-0 list-none border-t border-line p-0">
          {services.map((service) => (
            <li key={service.slug} className="service border-b border-line transition-colors">
              <Link
                to={servicePath(service.slug)}
                className="group flex items-center gap-[clamp(16px,3vw,40px)] px-[clamp(0px,1.4vw,18px)] py-[clamp(18px,2.2vw,28px)] no-underline"
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
                <span className="btn btn-icon btn-secondary pointer-events-none flex-none transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
