import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { testimonials, TESTIMONIALS_ARE_PLACEHOLDER } from "../data/testimonials";

const AUTOPLAY_MS = 6000;

/**
 * TESTIMONIALS — one quote at a time, at display size.
 *
 * Autoplay advances every 6s and is suspended while the section has focus or
 * the pointer is over it, so it can never move a quote out from under someone
 * mid-sentence. It also stands down entirely under `prefers-reduced-motion`.
 */
export default function Testimonials({ autoplay = true }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => {
    const count = testimonials.length;
    setIndex(((next % count) + count) % count);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [autoplay, paused]);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="section section--paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="shell">
        <Reveal className="testi__head">
          <h2 className="section-title testi__title">What Our Clients Say</h2>
          <div className="testi__controls">
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
            >
              <Icon name="chevronLeft" />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
            >
              <Icon name="chevronRight" />
            </button>
          </div>
        </Reveal>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ margin: 0 }}
            >
              <blockquote className="testi__quote">&ldquo;{current.quote}&rdquo;</blockquote>
              <figcaption className="testi__foot" style={{ fontSize: "inherit", marginTop: 0 }}>
                <span className="testi__who">
                  <Blueprint className={`testi__avatar${current.avatar ? " duotone" : ""}`}>
                    <Avatar person={current} />
                  </Blueprint>
                  <span>
                    <span className="testi__name">{current.name}</span>
                    <span className="testi__role text-muted">{current.role}</span>
                  </span>
                </span>

                <span className="testi__dots">
                  {testimonials.map((person, i) => (
                    <button
                      key={person.role}
                      type="button"
                      className={`testi__dot${person.avatar ? " duotone" : ""}`}
                      aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => go(i)}
                    >
                      <Avatar person={person} small />
                    </button>
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {TESTIMONIALS_ARE_PLACEHOLDER && (
          <p className="text-muted" style={{ fontSize: 13, marginTop: "var(--space-8)", marginBottom: 0 }}>
            <span className="tag tag-outline" style={{ marginRight: "var(--space-2)" }}>
              Sample
            </span>
            Placeholder quotes — real client feedback replaces these at launch.
          </p>
        )}
      </div>
    </section>
  );
}

/** A client photo where one exists, initials on the surface tone where it doesn't. */
function Avatar({ person, small = false }) {
  if (person.avatar) {
    return (
      <img
        src={person.avatar}
        alt=""
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "var(--color-surface)",
        fontFamily: "var(--font-heading)",
        fontWeight: "var(--font-heading-weight)",
        fontSize: small ? 11 : 15,
        color: "var(--color-accent-700)",
      }}
    >
      {person.initials}
    </span>
  );
}
