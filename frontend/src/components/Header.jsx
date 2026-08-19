import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Logo from "./Logo";
import { brand, nav } from "../data/site";

/**
 * Sticky header. Translucent paper ground with a blur, a hairline base rule,
 * and the one solid accent object on the bar — the primary button.
 *
 * The spectrum rule and the opaque-on-scroll swap stay in app.css: both hang
 * off `data-scrolled`, and the rule is a ::after with the gradient token.
 */
export default function Header({ showAvailability = true }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* The spectrum rule under the bar only appears once the page has moved, so
     it reads as a response to scrolling rather than as permanent chrome.
     Passive listener + rAF so it never blocks the scroll itself. */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Highlight the section currently in view. */
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.3, 0.7, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="header sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-[10px] [&_a]:text-inherit [&_a]:no-underline"
      data-scrolled={scrolled}
    >
      {/* From tablet up the bar is three true columns — brand · links · actions —
          so the links stay centred regardless of how wide either side runs. */}
      <nav
        className="nav mx-auto max-w-[1320px] flex-wrap gap-y-3 px-[clamp(20px,4vw,64px)] py-4 max-md:gap-y-0 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-6 md:py-3.5"
        aria-label="Primary"
      >
        <Link
          to="/#top"
          className="nav-brand md:mr-0"
          aria-label={`${brand.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo withName className="md:hidden" />
          <Logo
            variant="lockup"
            className="hidden h-[62px] w-[155px] md:block lg:h-[68px] lg:w-[170px]"
          />
        </Link>

        {/* Below md the links collapse into a panel under the bar. */}
        <div
          id="primary-nav"
          data-open={open}
          className="flex items-center gap-4 max-md:order-4 max-md:mt-3 max-md:hidden max-md:w-full max-md:flex-col max-md:items-start max-md:border-t max-md:border-line max-md:pt-3 max-md:data-[open=true]:flex md:justify-center"
        >
          {nav.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className="text-[15.5px] tracking-[0.005em] transition-colors duration-150 hover:text-steel-700 aria-[current=true]:text-steel-700 max-md:text-[17px]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:justify-self-end">
          {showAvailability && (
            <span className="tag tag-outline max-md:hidden">● Available for new projects</span>
          )}

          <Blueprint
            as={Link}
            to="/#contact"
            className="btn btn-primary relative px-5 py-2.5 text-[14.5px] no-underline max-md:order-2 max-md:px-3 max-md:py-2 max-md:text-[13px]"
            onClick={() => setOpen(false)}
          >
            <Icon name="plus" size={14} strokeWidth={2} />
            Start a Project
          </Blueprint>

          <button
            type="button"
            className="btn btn-secondary btn-icon hidden max-md:order-3 max-md:inline-flex"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>
    </header>
  );
}
