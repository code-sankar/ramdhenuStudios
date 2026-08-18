import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";
import { testimonials, TESTIMONIALS_ARE_PLACEHOLDER } from "../../data/testimonials";
import { fadeUp, stagger, viewport } from "../../lib/motion";

/**
 * TESTIMONIALS
 * ---------------------------------------------------------------------------
 * Understated on purpose — no star ratings, no oversized portraits, no
 * carousel. The quote does the work.
 *
 * While the data file is flagged as placeholder, the section carries a plain
 * "Sample content" note so nothing here reads as a real endorsement. Remove the
 * flag in /src/data/testimonials.js once genuine, permissioned quotes are in.
 */
export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="relative py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="In Their Words"
            title={<span id="testimonials-heading">What Working With Us Feels Like</span>}
            description="The part clients mention most often isn't a deliverable — it's not having to coordinate five people to get one campaign out."
            className="lg:max-w-2xl"
          />

          {TESTIMONIALS_ARE_PLACEHOLDER && (
            <p className="flex shrink-0 items-center gap-2.5 text-[0.8125rem] text-mist-500">
              <span className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.625rem] tracking-widest text-mist-400 uppercase">
                Sample
              </span>
              Placeholder quotes — real client feedback replaces these at launch.
            </p>
          )}
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.09, 0.1)}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {testimonials.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="group relative flex flex-col justify-between rounded-xl border border-line bg-ink-900/60 p-7 transition-colors duration-300 hover:border-line-strong lg:p-8"
            >
              <Icon
                name="quote"
                strokeWidth={0}
                className="h-7 w-7 fill-volt-500/25 text-transparent transition-colors duration-500 group-hover:fill-volt-500/45"
              />

              <blockquote className="mt-5 flex-1">
                <p className="text-[1.0625rem] leading-relaxed text-mist-200">{item.quote}</p>
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt=""
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-ink-800 font-mono text-[0.6875rem] tracking-wide text-mist-400"
                  >
                    {item.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-display text-[0.875rem] font-semibold tracking-[-0.01em] text-mist-50">
                    {item.name}
                  </p>
                  <p className="truncate text-[0.8125rem] text-mist-500">
                    {item.role} · {item.business}
                  </p>
                </div>
              </figcaption>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
