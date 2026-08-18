import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { cn } from "../../lib/utils";
import { journey, packages, pricingNotes } from "../../data/pricing";
import { fadeUp, stagger, viewport } from "../../lib/motion";

/**
 * PRICING
 * ---------------------------------------------------------------------------
 * The hard problem here is making the gap between tiers obvious in one glance.
 * Three devices do that work:
 *   1. Step 01 / 02 / 03 labels — these are rungs on a ladder, not variants.
 *   2. A journey meter on every card showing how far through
 *      Discovery → Growth that package actually takes the client.
 *   3. An explicit "Everything in <previous tier>" block, so the top tier
 *      visibly contains the one below it instead of listing features again.
 */
export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 border-t border-line bg-ink-900/40 py-20 lg:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Packages"
          title="Built to Match Where You Are"
          description="Three steps on the same ladder. Start where it makes sense for your business and move up when you're ready — each package carries everything you've already built."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1, 0.1)}
          className="mt-16 grid items-start gap-6 lg:grid-cols-3"
        >
          {packages.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8"
        >
          {pricingNotes.map((note) => (
            <li key={note} className="flex items-center gap-2 text-center text-[0.8125rem] text-mist-500">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-volt-500/70" />
              {note}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function PricingCard({ plan }) {
  const featured = plan.popular;

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border p-7 transition-colors duration-300 lg:p-8",
        featured
          ? "border-line-volt bg-ink-850 shadow-glow lg:-mt-4 lg:pt-11 lg:pb-11"
          : "border-line bg-ink-950/60 hover:border-line-strong",
      )}
    >
      {featured && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-volt-400 to-transparent"
          />
          <span className="absolute -top-3 left-7 rounded-sm bg-volt-500 px-2.5 py-1 font-mono text-[0.5625rem] font-medium tracking-[0.18em] text-white uppercase lg:left-8">
            {plan.badge}
          </span>
        </>
      )}

      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-mist-600 uppercase">
          {plan.step}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[1.5rem] font-bold tracking-[-0.03em] text-mist-50">
        {plan.name}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist-400">{plan.intent}</p>

      {/* Price */}
      <div className="mt-7 flex items-end gap-1.5">
        <span className="nums font-display text-[2.5rem] leading-none font-bold tracking-[-0.04em] text-mist-50">
          {plan.price}
        </span>
        <span className="pb-1 font-display text-[0.9375rem] font-medium text-mist-400">
          {plan.period}
        </span>
      </div>
      <p className="mt-2.5 text-[0.75rem] text-mist-600">{plan.priceNote}</p>

      {/* Journey meter — how far this package carries the client */}
      <div className="mt-7 border-t border-line pt-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-mist-600 uppercase">
            Covers
          </span>
          <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-volt-400 uppercase">
            {journey[0]} → {journey[plan.covers - 1]}
          </span>
        </div>
        <div className="mt-2.5 flex gap-1" role="img" aria-label={`Covers ${plan.covers} of ${journey.length} growth stages`}>
          {journey.map((stage, index) => (
            <span
              key={stage}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-500",
                index < plan.covers ? "bg-volt-500" : "bg-white/8",
              )}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-7 flex-1">
        {plan.inherits && (
          <div className="mb-5 flex items-center gap-2.5 rounded-md border border-line bg-white/[0.02] px-3 py-2.5">
            <Icon name="plus" className="h-3.5 w-3.5 shrink-0 text-volt-400" />
            <span className="font-display text-[0.8125rem] font-medium text-mist-200">
              Everything in {plan.inherits}
            </span>
          </div>
        )}
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Icon
                name="check"
                strokeWidth={2}
                className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", featured ? "text-volt-300" : "text-volt-500")}
              />
              <span className="text-[0.875rem] leading-relaxed text-mist-200">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        to={plan.cta.target}
        variant={featured ? "primary" : "secondary"}
        size="lg"
        magnetic={false}
        className="mt-8 w-full"
      >
        {plan.cta.label}
      </Button>
    </motion.article>
  );
}
