import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "../../lib/utils";
import { useReducedMotion, useScrollToSection } from "../../lib/hooks";
import { pointerSpring } from "../../lib/motion";
import Icon from "./Icon";

/**
 * BUTTON
 * ---------------------------------------------------------------------------
 * Three variants only, so hierarchy is never ambiguous:
 *   primary   — one per screen region. Solid volt, glow, magnetic pull.
 *   secondary — hairline ghost on ink. Pairs with primary.
 *   quiet     — text + arrow. Inline links, card actions.
 *
 * Renders as <a> when given `href`, as <button> otherwise. Passing `to`
 * smooth-scrolls to a section id and keeps a real anchor for accessibility.
 */

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold " +
  "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-volt-400 " +
  "disabled:pointer-events-none disabled:opacity-50 select-none";

const variants = {
  primary:
    "bg-volt-500 text-white shadow-cta hover:bg-volt-400 hover:shadow-[0_16px_50px_-12px_rgba(30,123,255,0.7)] active:translate-y-px overflow-hidden",
  secondary:
    "border border-line-strong bg-white/[0.02] text-mist-50 hover:border-line-volt hover:bg-volt-500/10 hover:text-white active:translate-y-px",
  quiet:
    "text-mist-200 hover:text-volt-300 px-0",
};

const sizes = {
  sm: "h-9 px-4 text-[0.8125rem] tracking-[-0.01em]",
  md: "h-11 px-5 text-[0.875rem] tracking-[-0.01em]",
  lg: "h-[3.25rem] px-7 text-[0.9375rem] tracking-[-0.012em]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  to,
  icon,
  iconPosition = "right",
  magnetic = variant === "primary",
  className,
  onClick,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const scrollTo = useScrollToSection();

  const x = useSpring(useMotionValue(0), pointerSpring);
  const y = useSpring(useMotionValue(0), pointerSpring);

  const enableMagnet = magnetic && !reduced;

  const handlePointerMove = (event) => {
    if (!enableMagnet || !ref.current) return;
    // Fine pointers only — a magnetic pull is meaningless on touch.
    if (event.pointerType !== "mouse") return;
    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    x.set(offsetX * 0.22);
    y.set(offsetY * 0.32);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (event) => {
    if (to) {
      event.preventDefault();
      scrollTo(to);
    }
    onClick?.(event);
  };

  const content = (
    <>
      {variant === "primary" && (
        /* One-pass light sheen on hover — a signal of interactivity, not decoration. */
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
        />
      )}
      {icon && iconPosition === "left" && (
        <Icon name={icon} className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      )}
      <span className="relative">{children}</span>
      {icon && iconPosition === "right" && (
        <Icon
          name={icon}
          className={cn(
            "relative h-4 w-4 transition-transform duration-200",
            icon === "arrowUpRight"
              ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              : "group-hover:translate-x-1",
          )}
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);
  const Element = href || to ? motion.a : motion.button;

  return (
    <Element
      ref={ref}
      href={href ?? (to ? `#${to}` : undefined)}
      className={classes}
      style={enableMagnet ? { x, y } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      {...rest}
    >
      {content}
    </Element>
  );
}
