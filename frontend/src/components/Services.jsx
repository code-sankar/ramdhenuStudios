import { Link } from "react-router-dom";

import { Stagger, StaggerItem } from "./ui/Stagger";

import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { servicePath, workPath } from "../data/seo";
import { services } from "../data/services";

/**
 * SERVICES — an index, not the content.
 *
 * Each row's only job is to say what the discipline is and get you to the page
 * that explains it. No state, no disclosure, nothing to open by mistake.
 *
 * IT IS A GRID NOW, NOT A RULED LIST. The list was six hairline rows with the
 * blurb hidden below 900px — so on the device most of this site's visitors
 * actually use, all six read as six near-identical titles with no way to tell
 * them apart. Cards give the blurb room at every width, which is the whole
 * reason the section exists.
 */
export default function Services() {
  return (
    <section id="services" className="section-y bg-panel">
      <div className="shell">
        <Reveal>
          <SectionIndex num="02" label="What we do" />
        </Reveal>

        <Reveal className="mb-[clamp(36px,5vw,64px)] max-w-[640px]">
          <h2 className="display mb-3 text-[clamp(32px,4vw,52px)]">Our Services</h2>
          <p className="text-muted m-0 text-base">
            Six disciplines, one team. Each one has a page explaining what it involves, what it
            includes and how it runs.
          </p>
        </Reveal>

        <Stagger as="ul" className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem as="li" key={service.slug}>
              <Link
                to={servicePath(service.slug)}
                className="rimlight group flex h-full flex-col gap-3 rounded-lg border border-ink/8 bg-paper-bright p-[clamp(20px,2.4vw,28px)] no-underline shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex items-center justify-between">
                  <span className="font-display text-[12.5px] tracking-[0.12em] text-prism-indigo">
                    {service.num}
                  </span>
                  <span className="text-ink/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-prism-indigo">
                    <Icon name="arrowRight" size={17} />
                  </span>
                </span>

                <span className="font-display text-[clamp(19px,1.8vw,24px)] leading-[1.14] text-ink uppercase transition-colors duration-300 group-hover:text-prism-indigo">
                  {service.title}
                </span>

                <span className="text-[14px] leading-[1.55] text-ink/70">{service.blurb}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-[clamp(28px,3.4vw,40px)]">
          <Link to={workPath()} className="linkish inline-flex items-center gap-2 text-[15px]">
            See the work behind these six disciplines
            <Icon name="arrowRight" size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
