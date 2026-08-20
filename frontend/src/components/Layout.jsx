import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

import Footer from "./Footer";
import Header from "./Header";
import { duration, ease } from "../lib/motion";

/**
 * The chrome every route wears: the skip link, the sticky header, one <main>,
 * and the footer. Pages supply only their own sections.
 *
 * `skipTo` exists because "skip to content" should land past the opening
 * field, and what that is differs by page — the home page's first real content
 * is About, a service page's is the explanation under the masthead.
 *
 * ROUTE TRANSITION. Following a link used to swap one full page for another in
 * a single frame, which reads as a glitch rather than as navigation. <main>
 * now fades in over 0.28s, keyed to the path.
 *
 * It deliberately does not animate the first page. That HTML is prerendered
 * and already painted before React hydrates, so fading it in would mean
 * blanking content the visitor can already read — a real regression to LCP for
 * a decorative reason. The flag is module-level because Layout unmounts
 * between routes and an instance ref would reset with it.
 *
 * There is no exit animation on purpose: an exiting page would still be on
 * screen when the scroll position resets, so you would watch the old page jump
 * to the top before the new one arrived.
 */
let hasMounted = false;

export default function Layout({ skipTo = "#main", children }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const animate = hasMounted && !reduced;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <>
      <a href={skipTo} className="skip-link">
        Skip to content
      </a>
      <Header />
      <motion.main
        id="main"
        key={pathname}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.short, ease: ease.out }}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}
