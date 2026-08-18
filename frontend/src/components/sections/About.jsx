import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import { capabilities, industries } from "../../data/services";
import { growthPath } from "../../data/process";
import { EASE_EXPO, fadeUpTight, stagger, viewport } from "../../lib/motion";
import { cn } from "../../lib/utils";

/* Vertical position of each capability node, as a % of the diagram box. */
const nodeY = [10, 30, 50, 70, 90];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 pt-20 lg:pt-28">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---------------------------------------------------------------
              THE ARGUMENT
          --------------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Who We Are"
              title={
                <>
                  More Than an Agency.
                  <br />
                  Your Digital <span className="accent-serif text-volt-300">Growth</span> Partner.
                </>
              }
              description="Most businesses don't need another vendor. They need one team that understands the whole journey — from the moment someone discovers you, to the moment they become a customer."
            />

            {/* The journey the entire site is built around */}
            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow">The journey we build</p>
              <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
                {growthPath.map((stage, index) => (
                  <li key={stage} className="flex items-center gap-2">
                    <span className="rounded-md border border-line bg-white/[0.02] px-3 py-1.5 font-display text-[0.8125rem] font-medium text-mist-200">
                      {stage}
                    </span>
                    {index < growthPath.length - 1 && (
                      <Icon name="arrowRight" className="h-3.5 w-3.5 text-volt-500/70" />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <Button to="services" variant="secondary" icon="arrowUpRight">
                See what that includes
              </Button>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------------
              CONVERGENCE DIAGRAM
          --------------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <div className="panel relative overflow-hidden p-6 sm:p-9">
              <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

              <div className="relative">
                <p className="eyebrow">The Ramdhenu advantage</p>
                <h3 className="mt-4 font-display text-display-sm">
                  One team.
                  <span className="text-mist-400"> Multiple capabilities.</span>
                </h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist-400">
                  Instead of hiring five specialists who never talk to each other, you get one
                  coordinated team pushing in the same direction.
                </p>
              </div>

              {/* Five roles → one outcome */}
              <div className="relative mt-9 aspect-[5/4] w-full sm:aspect-[16/9]">
                {/* Two geometries: the role chips are wider on small screens, so
                    the threads start further right and the box is taller. */}
                <ConvergeLines startX={61} boxHeight={80} stroke={0.5} className="sm:hidden" />
                <ConvergeLines startX={48} boxHeight={56.25} stroke={0.24} className="hidden sm:block" />

                {/* Role chips */}
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={stagger(0.08)}
                  className="absolute inset-0"
                >
                  {capabilities.map((role, index) => (
                    <motion.li
                      key={role.label}
                      variants={fadeUpTight}
                      style={{ top: `${nodeY[index]}%` }}
                      className="absolute left-0 flex w-[58%] -translate-y-1/2 items-center gap-2.5 rounded-md border border-line bg-ink-800 px-2.5 py-2 sm:w-[46%] sm:gap-3 sm:px-3"
                    >
                      <Icon name={role.icon} className="h-4 w-4 shrink-0 text-volt-400" />
                      <span className="truncate font-display text-[0.75rem] font-medium text-mist-200 sm:text-[0.8125rem]">
                        {role.label}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* The outcome */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.7 }}
                  className="absolute top-1/2 right-0 -translate-y-1/2"
                >
                  <div className="relative grid place-items-center">
                    <div className="animate-pulse-glow absolute -inset-8 rounded-full bg-volt-500/30 blur-2xl" />
                    <div className="absolute -inset-2 rounded-full border border-volt-500/25" />
                    <div className="relative grid h-24 w-24 place-items-center rounded-full border border-volt-400/70 bg-ink-950 text-center shadow-[0_0_40px_-8px_rgba(30,123,255,0.6)] sm:h-28 sm:w-28">
                      <div>
                        <Icon name="chart" className="mx-auto h-4 w-4 text-spark" />
                        <p className="mt-1.5 font-display text-[0.8125rem] font-bold tracking-[-0.01em] text-mist-50">
                          Growth
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who we build this for — a slow, single-direction rail */}
      <Reveal className="mt-16 border-y border-line py-5 lg:mt-20">
        <div className="edge-fade flex overflow-hidden">
          <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 [--tw-enter:0] hover:[animation-play-state:paused]">
            {[...industries, ...industries].map((industry, index) => (
              <li
                key={`${industry}-${index}`}
                aria-hidden={index >= industries.length}
                className="flex shrink-0 items-center gap-10 font-display text-sm font-medium tracking-[-0.01em] whitespace-nowrap text-mist-500"
              >
                {industry}
                <span className="h-1 w-1 rounded-full bg-volt-500/60" />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * The threads that carry each capability into the single growth outcome.
 *
 * The viewBox matches the container's real aspect ratio (100 × boxHeight) so
 * nothing is distorted — which keeps the stroke weight even and lets Framer
 * Motion's pathLength draw-in behave correctly. `startX` is the chip's right
 * edge; the threads must begin there, not underneath it.
 */
function ConvergeLines({ startX, boxHeight, stroke, className }) {
  const centerY = boxHeight / 2;
  const endX = 80;
  const run = endX - startX;

  return (
    <svg
      viewBox={`0 0 100 ${boxHeight}`}
      fill="none"
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient
          id={`converge-${boxHeight}`}
          gradientUnits="userSpaceOnUse"
          x1={startX}
          y1="0"
          x2={endX}
          y2="0"
        >
          <stop offset="0%" stopColor="#1e7bff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5ae4ff" stopOpacity="1" />
        </linearGradient>
      </defs>

      {nodeY.map((percent, index) => {
        const y = (boxHeight * percent) / 100;
        return (
          <motion.path
            key={percent}
            d={`M ${startX} ${y} C ${startX + run * 0.55} ${y}, ${endX - run * 0.45} ${centerY}, ${endX} ${centerY}`}
            stroke={`url(#converge-${boxHeight})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.25 + index * 0.09 }}
          />
        );
      })}
    </svg>
  );
}
