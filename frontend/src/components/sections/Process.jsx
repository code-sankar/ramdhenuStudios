import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { steps } from "../../data/process";
import { EASE_EXPO, viewport } from "../../lib/motion";

/**
 * PROCESS
 * ---------------------------------------------------------------------------
 * A vertical timeline whose connecting line fills as the section scrolls, so
 * the animation carries meaning — it is literally the progress of an
 * engagement. Steps reveal one at a time as the line reaches them.
 */
export default function Process() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="process" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Our Process"
                title="How We Work"
                description="A clear, repeatable six-step system. You always know what stage you're in, what's coming next and what we need from you."
              />
              <div className="mt-9 hidden lg:block">
                <Button to="contact" icon="arrowUpRight">
                  Start at step one
                </Button>
              </div>
            </div>
          </div>

          <div ref={railRef} className="relative lg:col-span-8">
            {/* Rail */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line [mask-image:linear-gradient(to_bottom,#000_88%,transparent)] sm:left-[1.75rem]"
            >
              <motion.span
                style={{ scaleY: fill }}
                className="absolute inset-0 origin-top bg-linear-to-b from-volt-500 via-volt-400 to-spark"
              />
            </div>

            <ol className="space-y-2">
              {steps.map((step, index) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.65, ease: EASE_EXPO, delay: index * 0.06 }}
                  className="group relative flex gap-6 pb-8 last:pb-0 sm:gap-8"
                >
                  {/* Node */}
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-ink-950 font-mono text-[0.6875rem] font-medium tracking-wider text-mist-400 transition-colors duration-500 group-hover:border-line-volt group-hover:text-volt-300 sm:h-14 sm:w-14 sm:text-xs">
                    {step.number}
                  </span>

                  <div className="pt-1.5 sm:pt-3">
                    <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.028em] text-mist-50 sm:text-[1.625rem]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-mist-400">
                      {step.description}
                    </p>
                    <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.08em] text-mist-600">
                      {step.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="mt-4 pl-[4.25rem] lg:hidden">
              <Button to="contact" icon="arrowUpRight">
                Start at step one
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
