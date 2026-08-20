import { motion, useReducedMotion } from "motion/react";

import { inView, listContainer, stagger, variants } from "../../lib/motion";

/**
 * STAGGER — a list whose rows arrive in order.
 *
 * Six services, four process stages, five industries: these are the places the
 * page most wants to say "read these in sequence", and a single fade over the
 * whole block says the opposite. The parent holds no visual state — it only
 * schedules — so it never interferes with the layout it wraps.
 *
 *   <Stagger as="ul" className="…">
 *     {items.map((i) => (
 *       <StaggerItem as="li" key={i.slug}>…</StaggerItem>
 *     ))}
 *   </Stagger>
 *
 * The `as` prop is not optional in spirit: a <ul> whose children are <div>s is
 * broken markup, and a screen reader will not announce it as a list.
 *
 * Framer propagates `hidden`/`show` from parent to any motion child, which is
 * why the items declare no `initial` or `animate` of their own.
 */
export function Stagger({ children, as = "div", className, interval = stagger.base, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={listContainer(interval)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, as = "div", className, variant = "row", ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} variants={variants[variant] ?? variants.row} {...rest}>
      {children}
    </Tag>
  );
}
