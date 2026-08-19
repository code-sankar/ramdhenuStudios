import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scroll behaviour for a routed site, which the browser no longer does for us.
 *
 *   a hash        go to that section — this is how /#services works from a
 *                 service page, where the section is a route away
 *   a new route   start at the top, the way following a link always has
 *   back/forward  leave it alone; the browser restores the old position and is
 *                 better at it than we would be
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        return;
      }
    }

    if (navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, hash, key, navigationType]);

  return null;
}
