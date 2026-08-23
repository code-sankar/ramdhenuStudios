import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Icon from "./Icon";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import { duration, ease, stagger } from "../lib/motion";
/* Aliased, because site.js exports an `industries` of its own — ten labels for
   the About chips, of which these six are the ones with a page behind them. */
import { industries as industryPages } from "../data/industries";
import { industryPath, servicePath } from "../data/seo";
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
 * ON A PHONE — AND NOW ON A TABLET — the links become a full-screen coral
 * drawer, layered *under* the bar so the toggle stays live and turns into the
 * close button. The drawer used to stop at 768px; a seventh top-level item
 * pushed the bar 100px past what a 768px viewport holds, and 1024 is where
 * seven of them and the lockup actually fit.
 */
export default function Header({ showAvailability = true }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  /* WHICH menu is open, not whether one is — one slot, and the last opener
     wins. Two dropdowns sharing a boolean flicker: crossing from one trigger
     to the other opens the second and *then* closes the first, and the bar
     would follow that close and go transparent under an open panel. A close
     reported by a menu that is no longer the open one is ignored, which is
     exactly what a slot gives you and a boolean cannot. */
  const [openMenu, setOpenMenu] = useState(null);
  const menuOpen = openMenu !== null;
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const isCurrent = (item) => (item.path ? pathname === item.path : active === item.id);

  /* Stable identity — NavMenu reports from an effect keyed on the callback, so
     a new function each render would re-fire it each render. Returning `prev`
     unchanged is what stops the mount-time "closed" report from both menus
     costing a render of its own. */
  const setMenuOpen = useCallback(
    (key, value) => setOpenMenu((prev) => (value ? key : prev === key ? null : prev)),
    [],
  );

  /* Both dropdowns, keyed by the name in nav's `menu`. Built from services.js
     and industries.js, so adding either kind of page adds it to the nav.

     `prefix` rather than a per-item comparison: the trigger has to look current
     on ALL six of its pages, and it is a button with no route of its own. */
  const menus = useMemo(
    () => ({
      services: {
        kind: "Service",
        prefix: "/services/",
        footer: { label: "All services", to: "/#services" },
        onOpenChange: (value) => setMenuOpen("services", value),
        items: services.map((service) => ({
          label: service.short,
          blurb: service.blurb,
          to: servicePath(service.slug),
          num: service.num,
          /* Four is what the panel has room for without the column scrolling. */
          includes: service.includes.slice(0, 4),
        })),
      },
      industries: {
        kind: "Industry",
        prefix: "/industries/",
        /* There is no industries index to send anyone to, and inventing one
           for a menu footer would be a route built to serve a link. The About
           section's chips are the fullest list of trades the site has. */
        footer: { label: "All industries", to: "/#industries" },
        /* The bullets under an industry are SERVICE names, which is not
           self-evident the way "what this service includes" is — hence the
           heading. `priority` is already ordered by what matters for the
           trade, so the first three are the three to show. */
        listLabel: "Where we usually start",
        onOpenChange: (value) => setMenuOpen("industries", value),
        items: industryPages.map((industry) => ({
          label: industry.name,
          blurb: industry.blurb,
          to: industryPath(industry.slug),
          num: industry.num,
          includes: industry.priority
            .slice(0, 4)
            .map((slug) => services.find((s) => s.slug === slug)?.short)
            .filter(Boolean),
        })),
      },
    }),
    [setMenuOpen],
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

  /* Rendered into both the bar and the drawer, so the two cannot drift.

     ONLY THE BAR'S COPY REPORTS ITS OPEN STATE, and that is a fix rather than
     an optimisation. `data-menu` turns the bar white so it reads as one sheet
     with the panel hanging off it — but the drawer's copy of a dropdown is an
     accordion inside a full-screen coral overlay, so expanding it left a white
     strip and a re-coloured CTA floating across the top of the drawer. The
     drawer's copy also unmounts with the drawer, and the open report has no
     cleanup, so it used to leave the bar stuck white after the drawer closed.

     `preempt` marks the menu that is NOT the open one, so it can drop its panel
     out of sight rather than fade it out on top of the incoming one — see
     coral.css §3. Drawer copies never preempt each other: down there the panels
     are accordions stacked in flow, not two sheets in the same box. */
  const links = ({ drawer = false } = {}) =>
    nav.map((item) => {
      const menu = menus[item.menu];
      return menu ? (
        <NavMenu
          key={item.label}
          label={item.label}
          items={menu.items}
          footer={menu.footer}
          kind={menu.kind}
          listLabel={menu.listLabel}
          currentPath={pathname}
          active={isCurrent(item) || pathname.startsWith(menu.prefix)}
          preempt={!drawer && menuOpen && openMenu !== item.menu}
          onNavigate={closeDrawer}
          onOpenChange={drawer ? undefined : menu.onOpenChange}
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
      );
    });

  return (
    <>
      {/* The scrim behind an open mega-menu. Click-through closes it via
          NavMenu's own pointerdown handler. */}
      <AnimatePresence>
        {menuOpen && !reduced && (
          <motion.div
            className="menu-scrim max-lg:hidden"
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
            className="shell flex items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-x-8"
            aria-label="Primary"
          >
            <Link
              to="/#top"
              className="nav-brand flex flex-none items-center max-lg:min-h-[44px]"
              aria-label={`${brand.name} — home`}
              onClick={closeDrawer}
            >
              <Logo withName className="lg:hidden" />
              <Logo
                variant="lockup"
                /* The bigger lockup and the availability chip below both wait
                   for xl. At 1024 exactly, seven nav items, a 136px lockup and
                   a 171px CTA cluster do not fit across the bar; at 126 and
                   without the chip they clear it by 90px. */
                className="hidden h-[50px] w-[126px] lg:block xl:h-[54px] xl:w-[136px]"
              />
            </Link>

            <div className="hidden items-center justify-center gap-1 lg:flex">{links()}</div>

            <div className="flex flex-none items-center gap-2.5 lg:justify-self-end">
              {showAvailability && (
                <span className="hidden items-center gap-2 text-[12.5px] tracking-[0.04em] xl:inline-flex">
                  <span className="availability-dot" aria-hidden="true" />
                  Available
                </span>
              )}

              <Link
                to="/#contact"
                className="btn-cta inline-flex items-center gap-2 rounded-full px-[20px] py-[11px] font-display text-[14px] no-underline max-lg:px-4 max-lg:py-2.5 max-lg:text-[13px]"
                onClick={closeDrawer}
              >
                <span className="max-[380px]:hidden">Get in touch</span>
                <span className="hidden max-[380px]:inline">Contact</span>
              </Link>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 bg-transparent text-current transition-colors duration-200 hover:bg-current/10 lg:hidden"
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
            className="nav-drawer lg:hidden"
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
                {links({ drawer: true }).map((link, i) => (
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
