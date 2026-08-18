import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

/**
 * True once the page has scrolled past `threshold`.
 * Drives the header's compact state. Uses a passive listener + rAF so it
 * never blocks scrolling.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/**
 * Reflects the OS "reduce motion" preference. Components use it to drop
 * decorative motion (parallax, magnetic hover, counters) while keeping the
 * interface fully functional.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Subscribes to a media query. Used to keep pointer-driven effects (hero
 * parallax) on the pointer devices where they belong, and to read the OS
 * reduced-motion setting. Built on useSyncExternalStore so the first render
 * already has the correct answer — no flash of the wrong behaviour.
 */
export function useMediaQuery(query) {
  const subscribe = useMemo(
    () => (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Tracks which section is currently in view so the nav can highlight it. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Locks background scrolling while the mobile menu is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}

/** Smooth-scrolls to a section id, accounting for the sticky header. */
export function useScrollToSection() {
  return useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }, []);
}
