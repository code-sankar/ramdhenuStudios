import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { testimonials } from "../data/testimonials";

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
      className="section-y bg-lav-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="shell">
        <Reveal>
          <SectionIndex num="03" label="In their words" />
        </Reveal>

        <Reveal className="mb-[clamp(32px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(28px,3.6vw,44px)]">What Our Clients Say</h2>
          <div className="flex gap-2">
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
              className="m-0"
            >
              <blockquote className="m-0 mb-[clamp(24px,3vw,40px)] max-w-[860px] font-sans text-[clamp(20px,2.15vw,27px)] leading-[1.45] font-medium">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-0 flex flex-wrap items-center justify-between gap-5 text-base">
                <span className="flex items-center gap-[14px]">
                  <Blueprint className="relative inline-block h-[52px] w-[52px] flex-none">
                    <Avatar person={current} />
                  </Blueprint>
                  <span>
                    <span className="block font-display text-base">{current.name}</span>
                    <span className="text-muted block text-[13px]">{current.role}</span>
                  </span>
                </span>

                <span className="flex">
                  {testimonials.map((person, i) => (
                    <button
                      key={person.role}
                      type="button"
                      aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => go(i)}
                      className="relative -ml-2 h-8 w-8 cursor-pointer border border-line max-md:-ml-1 max-md:h-[42px] max-md:w-[42px] bg-none p-0 opacity-55 transition duration-200 hover:-translate-y-0.5 hover:opacity-85 aria-[current=true]:-translate-y-0.5 aria-[current=true]:opacity-100"
                    >
                      <Avatar person={person} small />
                    </button>
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {current.placeholder && (
          <p className="text-muted mt-8 mb-0 text-[13px]">
            <span className="tag tag-outline mr-2">Sample</span>
            A written example, not real client feedback.
          </p>
        )}
      </div>
    </section>
  );
}

/** A client photo where one exists, initials on the panel tone where it doesn't. */
function Avatar({ person, small = false }) {
  if (person.avatar) {
    return (
      <img src={person.avatar} alt="" loading="lazy" className="h-full w-full object-cover" />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 grid place-items-center bg-panel font-display text-coral-700 ${
        small ? "text-[11px]" : "text-[15px]"
      }`}
    >
      {person.initials}
    </span>
  );
}
