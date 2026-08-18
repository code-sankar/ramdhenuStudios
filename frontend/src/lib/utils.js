/** Tiny className joiner — keeps conditional Tailwind classes readable. */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/** Clamp a number between min and max. */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
