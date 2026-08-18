import { useRef } from "react";
import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { services } from "../../data/services";
import { fadeUp, stagger, viewport } from "../../lib/motion";
import { useReducedMotion } from "../../lib/hooks";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-ink-900/40 py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="From strategy to execution, we provide end-to-end solutions to help your business grow online."
            className="lg:max-w-2xl"
          />
          <div className="shrink-0">
            <Button to="contact" variant="secondary" icon="arrowUpRight">
              Discuss your requirement
            </Button>
          </div>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.075, 0.1)}
          className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/**
 * Cards sit on a 1px gap grid so the whole block reads as one ruled table —
 * cleaner than six floating boxes, and it keeps the border language consistent
 * with the rest of the page.
 *
 * Hover does three quiet things: a cursor-tracked spotlight, the icon lifts,
 * and the "Learn more" row slides in. Nothing scales or shadows.
 */
function ServiceCard({ service }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const handlePointerMove = (event) => {
    if (reduced || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${event.clientX - bounds.left}px`);
    ref.current.style.setProperty("--y", `${event.clientY - bounds.top}px`);
  };

  return (
    <motion.li variants={fadeUp} className="group relative">
      <a
        ref={ref}
        href="#contact"
        onPointerMove={handlePointerMove}
        className="relative flex h-full flex-col overflow-hidden bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-900 focus-visible:outline-offset-[-2px] lg:p-8"
      >
        {/* Cursor spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--x, 50%) var(--y, 0%), rgba(30,123,255,0.12), transparent 65%)",
          }}
        />
        {/* Top edge accent, drawn left-to-right on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px w-0 bg-linear-to-r from-volt-500 to-spark transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
        />

        <div className="relative flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-md border border-line bg-white/[0.025] text-volt-300 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-line-volt group-hover:bg-volt-500/10">
            <Icon name={service.icon} className="h-[1.35rem] w-[1.35rem]" />
          </span>
          <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-mist-600 transition-colors duration-300 group-hover:text-volt-400">
            {service.number}
          </span>
        </div>

        <h3 className="relative mt-7 font-display text-[1.1875rem] font-semibold tracking-[-0.02em] text-mist-50">
          {service.title}
        </h3>
        <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-mist-400">
          {service.description}
        </p>

        <ul className="relative mt-6 flex flex-wrap gap-1.5">
          {service.points.map((point) => (
            <li
              key={point}
              className="rounded-sm border border-line px-2 py-1 font-mono text-[0.625rem] tracking-wide text-mist-500 transition-colors duration-300 group-hover:border-line-strong group-hover:text-mist-400"
            >
              {point}
            </li>
          ))}
        </ul>

        <span className="relative mt-8 inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold text-mist-500 transition-colors duration-300 group-hover:text-volt-300">
          Learn More
          <Icon
            name="arrowUpRight"
            className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </a>
    </motion.li>
  );
}
