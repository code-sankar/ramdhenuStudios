import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Icon from "./Icon";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import { duration, ease, stagger } from "../lib/motion";
import { servicePath } from "../data/seo";
import { services } from "../data/services";
import { brand, nav, navHref } from "../data/site";

/**
 * HEADER — a floating capsule that flips theme as it leaves the opening field.
 *
 * At rest it is transparent with light type, sitting over the dark hero every
 * page opens on. Past 40px of scroll it becomes light glass with a shadow and
 * the type goes to ink. Both halves hang off one `data-scrolled` attribute, so
 * there is one source of truth and no way for the capsule and its type to
 * disagree mid-transition. The styling itself is in prism.css.
 *
 * It is `fixed`, which is the cost of floating: the bar reserves no space in
 * flow, so every page's opening section carries a `masthead` class supplying
 * the clearance by hand. Add a page that opens on something else and it needs
 * that class too.
 *
 * THE ACTIVE PILL SLIDES. The current item is marked by a pill that travels
 * between links rather than appearing under each one — a shared `layoutId`, so
 * framer animates the real distance between the two positions. It is the one
 * piece of chrome on the site allowed a little overshoot.
 *
 * ON A PHONE the links become a full-screen drawer. A capsule cannot hold six
 * links and a CTA at 360px, and the half-measure — a panel dropping out of the
 * bar — leaves the visitor reading a menu through a 40px gap.
 */
export default function Header({ showAvailability = true }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* A nav item is either a home anchor, current while its section is in view,
     or a real route, current while the URL matches it. */
  const isCurrent = (item) => (item.path ? pathname === item.path : active === item.id);

  /* The mega-menu's cards. `blurb` is what makes it a mega-menu rather than a
     tall dropdown — six titles alone would not earn the extra width. */
  const serviceMenu = useMemo(
    () =>
      services.map((service) => ({
        label: service.short,
        blurb: service.blurb,
        to: servicePath(service.slug),
        num: service.num,
      })),
    [],
  );

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
    const sections = nav.map((item) => document.getElementById(item.id)).filter(Boolean);
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

  /* An open drawer must not leave the page scrolling behind it. Restoring the
     previous value rather than clearing it keeps this safe if anything else
     ever locks scroll at the same time (the boot splash does, on first load). */
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes the drawer from anywhere inside it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeDrawer = () => setOpen(false);

  /* Rendered in both the capsule and the drawer, so the two can never drift.
     `inDrawer` only decides layout — the state and handlers are shared. */
  const links = (inDrawer = false) =>
    nav.map((item) =>
      item.menu ? (
        <NavMenu
          key={item.label}
          label={item.label}
          items={serviceMenu}
          footer={{ label: "All services", to: "/#services" }}
          currentPath={pathname}
          active={isCurrent(item) || pathname.startsWith("/services/")}
          onNavigate={closeDrawer}
        />
      ) : (
        <Link
          key={item.label}
          to={navHref(item)}
          aria-current={isCurrent(item) ? "true" : undefined}
          className="nav-link"
          onClick={closeDrawer}
        >
          {/* The travelling pill. Only the current item renders it, so framer
              sees one element moving rather than several fading. */}
          {!inDrawer && !reduced && isCurrent(item) && (
            <motion.span
              layoutId="nav-pill"
              className="nav-pill"
              transition={{ duration: duration.short, ease: ease.outBack }}
            />
          )}
          <span className="relative z-[1]">{item.label}</span>
        </Link>
      ),
    );

  return (
    <>
      {/* FIXED, NOT STICKY. The capsule has to float over the dark field each
          page opens on — sticky would reserve 96px of light body above it and
          land light type on a light ground. Every opening section carries the
          matching top padding; see `masthead` in prism.css. */}
      <header
        className="fixed inset-x-0 top-0 z-50 [&_a]:no-underline"
        data-scrolled={scrolled}
        data-drawer={open}
      >
        <div className="shell pt-[clamp(10px,1.4vw,18px)] pb-2">
          <nav
            className="nav-capsule flex items-center justify-between gap-4 py-2 pr-2 pl-[clamp(12px,1.6vw,20px)] md:grid md:grid-cols-[1fr_auto_1fr]"
            aria-label="Primary"
          >
            <Link
              to="/#top"
              className="nav-brand flex flex-none items-center max-md:min-h-[44px]"
              aria-label={`${brand.name} — home`}
              onClick={closeDrawer}
            >
              <Logo withName className="md:hidden" />
              <Logo
                variant="lockup"
                className="hidden h-[52px] w-[130px] md:block lg:h-[56px] lg:w-[142px]"
              />
            </Link>

            {/* The links, centre column, from md up. */}
            <div className="hidden items-center gap-0.5 md:flex md:justify-center">
              {links()}
            </div>

            <div className="flex flex-none items-center gap-2 md:justify-self-end">
              {showAvailability && (
                <span className="nav-badge hidden items-center gap-2 rounded-full px-3.5 py-2 text-[11px] tracking-[0.1em] uppercase lg:inline-flex">
                  <span className="hero__pulse" aria-hidden="true" />
                  Available
                </span>
              )}

              <Link
                to="/#contact"
                className="btn-prism inline-flex items-center gap-2 rounded-full px-[18px] py-[11px] font-display text-[14px] tracking-[0.01em] no-underline max-md:px-4 max-md:py-2.5 max-md:text-[13px]"
                onClick={closeDrawer}
              >
                <Icon name="plus" size={14} strokeWidth={2} />
                <span className="max-[380px]:hidden">Start a Project</span>
                <span className="hidden max-[380px]:inline">Start</span>
              </Link>

              <button
                type="button"
                className="nav-brand inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/20 bg-transparent transition-colors duration-200 hover:bg-current/10 md:hidden"
                aria-expanded={open}
                aria-controls="primary-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((value) => !value)}
              >
                <Icon name={open ? "close" : "menu"} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── The phone drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="primary-nav"
            className="nav-drawer md:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: duration.short, ease: ease.out }}
          >
            <div className="shell flex min-h-full flex-col gap-8 pt-[clamp(76px,16vh,120px)] pb-10">
              <motion.div
                className="flex flex-col items-start gap-1 border-t border-paper/12 pt-6"
                initial={reduced ? false : "hidden"}
                animate="show"
                variants={{ show: { transition: { staggerChildren: stagger.base } } }}
              >
                {links(true).map((link, i) => (
                  <motion.div
                    key={i}
                    className="w-full border-b border-paper/8 last:border-b-0"
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: duration.base, ease: ease.out },
                      },
                    }}
                  >
                    {link}
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  to="/#contact"
                  className="btn-prism inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-[16px] no-underline"
                  onClick={closeDrawer}
                >
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Start a Project
                </Link>
                <p className="m-0 text-center text-[12.5px] tracking-[0.08em] text-paper/45 uppercase">
                  {brand.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
