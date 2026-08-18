import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Counter from "../ui/Counter";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { metrics, RESULTS_ARE_ILLUSTRATIVE } from "../../data/results";
import { fadeUp, stagger, viewport } from "../../lib/motion";

/**
 * RESULTS
 * ---------------------------------------------------------------------------
 * Built so a number's provenance is part of the design, not a footnote. Each
 * tile carries its own status: `verified: true` promotes it to a confirmed
 * client result with a source line; anything else is labelled "Illustrative"
 * in the tile itself. Nothing here can be mistaken for a proven claim.
 */
export default function Results() {
  return (
    <section
      aria-labelledby="results-heading"
      className="relative overflow-hidden border-y border-line bg-ink-900/60 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(30,123,255,0.16),transparent)]"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Outcome"
              title={
                <span id="results-heading">
                  Creative Is Only Half the Job.
                  <br />
                  <span className="text-mist-400">Results Complete It.</span>
                </span>
              }
              description="Good design gets attention. What we're measured on is what happens next — the calls, the messages, the bookings and the repeat customers."
            />

            {RESULTS_ARE_ILLUSTRATIVE && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-9 flex gap-3.5 rounded-lg border border-line bg-ink-950/60 p-4"
              >
                <Icon name="spark" className="mt-0.5 h-4 w-4 shrink-0 text-volt-400" />
                <p className="text-[0.8125rem] leading-relaxed text-mist-400">
                  <span className="font-semibold text-mist-200">
                    These are illustrative targets, not verified results.
                  </span>{" "}
                  They show the kind of movement our work is built to produce. Every figure here is
                  replaced with a named, permissioned client report as campaigns complete.
                </p>
              </motion.div>
            )}

            <div className="mt-8">
              <Button to="contact" variant="secondary" icon="arrowUpRight">
                Ask what's realistic for your business
              </Button>
            </div>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.09, 0.1)}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:col-span-7"
          >
            {metrics.map((metric) => (
              <motion.li
                key={metric.id}
                variants={fadeUp}
                className="group relative flex flex-col justify-center bg-ink-950 p-7 lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-[3.25rem] leading-none font-bold tracking-[-0.045em] text-glow lg:text-[3.75rem]">
                    <Counter
                      value={metric.value}
                      decimals={metric.decimals ?? 0}
                      prefix={metric.prefix ?? ""}
                      suffix={metric.suffix ?? ""}
                    />
                  </p>
                  <span
                    className={
                      metric.verified
                        ? "mt-1.5 inline-flex items-center gap-1 rounded-sm border border-line-volt bg-volt-500/10 px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-widest text-volt-300 uppercase"
                        : "mt-1.5 rounded-sm border border-line px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-widest text-mist-600 uppercase"
                    }
                  >
                    {metric.verified && <Icon name="check" className="h-2.5 w-2.5" />}
                    {metric.verified ? "Verified" : "Illustrative"}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-mist-50">
                    {metric.label}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mist-500">
                    {metric.detail}
                  </p>
                  {metric.source && (
                    <p className="mt-2 font-mono text-[0.625rem] tracking-wide text-mist-600">
                      {metric.source}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
