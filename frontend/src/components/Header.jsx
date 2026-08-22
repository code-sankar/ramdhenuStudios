import { useCallback, useEffect, useMemo, useState } from "react";
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
 * HEADER — transparent over the coral field, solid white once past it.
 *
 * THREE STATES, ONE ATTRIBUTE EACH:
 *   default          transparent bar, white type, over the field
 *   data-scrolled    white bar, charcoal type, shadow
 *   data-menu        white bar with no shadow — the mega-menu is a white
 *                    panel hanging off it, and a coral bar above a white
 *                    panel reads as two objects rather than one sheet
 *
 * The menu state deliberately transitions in 0ms (see coral.css). Fading the
 * bar to white over 360ms while the panel appears instantly leaves a third of
 * a second where the panel is floating on nothing.
 *
 * It is `fixed`, which is what lets it float over the field. The cost is that
 * it reserves no space in flow, so every page's opening section carries
 * `.masthead` for the clearance. Add a page that opens on something else and
 * it needs that class too.
 *
 * ON A PHONE the links become a full-screen coral drawer, layered *under* the
 * bar so the toggle stays live and turns into the close button.
 */
export default function Header({ showAvailability = true }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const isCurrent = (item) => (item.path ? pathname === item.path : active === item.id);

  const serviceMenu = useMemo(
    () =>
      services.map((service) => ({
        label: service.short,
        blurb: service.blurb,
        to: servicePath(service.slug),
        num: service.num,
        /* Four is what the panel has room for without the column scrolling. */
        includes: service.includes.slice(0, 4),
      })),
    [],
  );

  /* Stable identity — NavMenu calls this from an effect, so a new function
     every render would re-fire it on every render. */
  const handleMenuOpen = useCallback((value) => setMenuOpen(value), []);

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

  /* An open drawer must not leave the page scrolling behind it. The previous
     value is restored rather than cleared, so this stays safe if anything else
     locks scroll at the same time — the boot splash does, on first load. */
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeDrawer = () => setOpen(false);

  /* Rendered into both the bar and the drawer, so the two cannot drift. */
  const links = () =>
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
          onOpenChange={handleMenuOpen}
        />
      ) : (
        <Link
          key={item.label}
          to={navHref(item)}
          aria-current={isCurrent(item) ? "true" : undefined}
          className="nav-link"
          onClick={closeDrawer}
        >
          {item.label}
        </Link>
      ),
    );

  return (
    <>
      {/* The scrim behind an open mega-menu. Click-through closes it via
          NavMenu's own pointerdown handler. */}
      <AnimatePresence>
        {menuOpen && !reduced && (
          <motion.div
            className="menu-scrim max-md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.short, ease: ease.out }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header
        className="fixed inset-x-0 top-0 z-50 [&_a]:no-underline"
        data-scrolled={scrolled}
        data-menu={menuOpen}
      >
        <div className="site-bar">
          <nav
            className="shell flex items-center justify-between gap-4 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:gap-x-8"
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
                className="hidden h-[50px] w-[126px] md:block lg:h-[54px] lg:w-[136px]"
              />
            </Link>

            <div className="hidden items-center justify-center gap-1 md:flex">{links()}</div>

            <div className="flex flex-none items-center gap-2.5 md:justify-self-end">
              {showAvailability && (
                <span className="hidden items-center gap-2 text-[12.5px] tracking-[0.04em] lg:inline-flex">
                  <span className="availability-dot" aria-hidden="true" />
                  Available
                </span>
              )}

              <Link
                to="/#contact"
                className="btn-cta inline-flex items-center gap-2 rounded-full px-[20px] py-[11px] font-display text-[14px] no-underline max-md:px-4 max-md:py-2.5 max-md:text-[13px]"
                onClick={closeDrawer}
              >
                <span className="max-[380px]:hidden">Get in touch</span>
                <span className="hidden max-[380px]:inline">Contact</span>
              </Link>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 bg-transparent text-current transition-colors duration-200 hover:bg-current/10 md:hidden"
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
            <div className="shell flex min-h-full flex-col gap-8 pt-[clamp(84px,16vh,120px)] pb-10">
              <motion.div
                className="flex flex-col items-start gap-0 border-t border-white/25 pt-4"
                initial={reduced ? false : "hidden"}
                animate="show"
                variants={{ show: { transition: { staggerChildren: stagger.base } } }}
              >
                {links().map((link, i) => (
                  <motion.div
                    key={i}
                    className="w-full border-b border-white/15 last:border-b-0"
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-display text-[16px] text-coral-700 no-underline"
                  onClick={closeDrawer}
                >
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Start a Project
                </Link>
                <p className="m-0 text-center text-[12.5px] tracking-[0.08em] text-white/65 uppercase">
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
