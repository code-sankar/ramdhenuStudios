import { motion } from "motion/react";
import Icon from "../ui/Icon";
import { valueProps } from "../../data/services";
import { fadeUpTight, stagger, viewport } from "../../lib/motion";

/**
 * The compact reassurance band directly under the hero. Five short promises,
 * separated by hairlines rather than boxed into cards — it should read as one
 * continuous strip, not five more things to look at.
 */
export default function TrustStrip() {
  return (
    <section aria-label="Why work with us" className="relative border-y border-line bg-ink-900/50">
      <div className="shell">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.07)}
          className="grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x"
        >
          {valueProps.map((item) => (
            <motion.li
              key={item.title}
              variants={fadeUpTight}
              className="group flex flex-col gap-3 border-b border-line py-8 pr-5 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <Icon
                name={item.icon}
                className="h-5 w-5 text-volt-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
              />
              <div>
                <h3 className="font-display text-[0.9375rem] font-semibold tracking-[-0.012em] text-mist-50">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mist-500">
                  {item.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="mt-auto h-px w-0 bg-volt-500 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
