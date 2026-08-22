import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Icon from "./Icon";
import { duration, ease } from "../lib/motion";
import { contact } from "../data/site";

/**
 * NAV MENU — the mega-menu.
 *
 * THE PANEL HAS THREE PARTS, and the middle one is what makes it a mega-menu
 * rather than a tall dropdown:
 *
 *   the rail    every item in the section, down the left. Hovering one does
 *               not navigate — it changes what the middle shows.
 *   the read    a heading and a sentence about whichever item is active, so
 *               the menu explains the choice instead of just listing it.
 *   the foot    a charcoal strip with the phone number. Someone who opened
 *               the menu looking for a way to talk to you has found it.
 *
 * THE INTERACTION MODEL is carried over unchanged and is the hard part:
 *
 * The trigger is a BUTTON, not a link — a link that also opens a menu has to
 * guess which one a click meant. Its old destination survives as the rail's
 * footer link, because a trigger that swallows its own destination is a dead
 * end.
 *
 * Hover opens it, but only under `(hover: hover)`, so a tap on a touch device
 * never fires a phantom open. Closing is delayed a beat because the path from
 * trigger to panel is diagonal, and a menu that vanishes mid-reach is the most
 * common way this pattern is got wrong.
 *
 * Open-ness is stored as the pathname it opened on, not as a boolean, so
 * navigating closes it by derivation rather than by an effect firing after the
 * new page has already painted behind it.
 *
 * Keyboard: Enter/Space toggles, Escape closes and returns focus to the
 * trigger, Down opens onto the first item, Up/Down move, and focus leaving the
 * control closes it.
 *
 * BELOW md IT IS A PLAIN LIST inside the drawer. A three-column panel in a
 * 360px column is not a menu, it is a scroll trap.
 */
export default function NavMenu({
  label,
  items,
  footer,
  currentPath,
  active = false,
  onNavigate,
  onOpenChange,
}) {
  const id = useId();
  const panelId = `nav-menu-${id.replace(/:/g, "")}`;
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  const [openAt, setOpenAt] = useState(null);
  const open = openAt !== null && openAt === pathname;

  /* Which rail item the read-column is describing. Defaults to the first. */
  const [focusIndex, setFocusIndex] = useState(0);
  const shown = items[focusIndex] ?? items[0];

  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(0);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = 0;
    }
  };

  const close = useCallback(() => {
    cancelClose();
    setOpenAt(null);
  }, []);

  const openMenu = useCallback(() => {
    cancelClose();
    setOpenAt(pathname);
  }, [pathname]);

  useEffect(() => () => cancelClose(), []);

  /* The header needs to know, so the bar can go white behind the panel. */
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const onEnter = () => {
    if (!hoverCapable()) return;
    openMenu();
  };

  const onLeave = () => {
    if (!hoverCapable()) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenAt(null), 160);
  };

  const focusItem = (index) => {
    const links = wrapRef.current?.querySelectorAll("[data-menu-item]");
    if (!links?.length) return;
    const at = (index + links.length) % links.length;
    links[at]?.focus();
    setFocusIndex(at);
  };

  const onTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
      requestAnimationFrame(() => focusItem(0));
    } else if (event.key === "Escape") {
      close();
    }
  };

  const onPanelKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      triggerRef.current?.focus();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const links = [...(wrapRef.current?.querySelectorAll("[data-menu-item]") ?? [])];
    focusItem(links.indexOf(document.activeElement) + (event.key === "ArrowDown" ? 1 : -1));
  };

  const onBlur = (event) => {
    if (!wrapRef.current?.contains(event.relatedTarget)) close();
  };

  const dismiss = () => {
    close();
    onNavigate?.();
  };

  const panel = (
    <div
      id={panelId}
      onKeyDown={onPanelKeyDown}
      className={[
        "menu-panel w-full",
        /* From md up it detaches into a wide centred panel. The min() keeps it
           inside a 1024px laptop, where a fixed width centred on a right-hand
           trigger would hang off the edge. */
        "md:absolute md:top-[calc(100%+14px)] md:left-1/2 md:z-20",
        "md:w-[min(880px,calc(100vw-40px))] md:-translate-x-1/2",
      ].join(" ")}
    >
      <div className="md:grid md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        {/* ── The rail ── */}
        <ul className="m-0 list-none p-0 md:border-r md:border-char-900/8">
          {items.map((item, i) => (
            <li key={item.label}>
              <Link
                to={item.to}
                data-menu-item
                data-active={i === focusIndex ? "true" : undefined}
                aria-current={currentPath === item.to ? "true" : undefined}
                onMouseEnter={() => setFocusIndex(i)}
                onFocus={() => setFocusIndex(i)}
                onClick={dismiss}
                className="menu-rail-item no-underline max-md:min-h-[44px]"
              >
                <span className="w-6 flex-none font-display text-[11.5px] tracking-[0.08em] text-coral-700">
                  {item.num}
                </span>
                <span className="flex-1">{item.label}</span>
                <Icon name="chevronRight" size={14} />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── The read. Below md the rail already says everything a 360px
              column has room for, so this is desktop-only. ── */}
        <div className="hidden flex-col justify-between p-7 md:flex">
          <div>
            <p className="mb-2 font-display text-[11px] tracking-[0.14em] text-coral-700 uppercase">
              {shown?.num} — Service
            </p>
            <h3 className="display mb-3 text-[26px] leading-[1.1] text-char-900">
              {shown?.label}
            </h3>
            <p className="m-0 max-w-[44ch] text-[14.5px] leading-[1.6] text-char-700">
              {shown?.blurb}
            </p>

            {/* What the column is actually for. The reference puts a photo
                here; four lines of what the service includes is more use to
                someone deciding which of six to click. */}
            {shown?.includes?.length > 0 && (
              <ul className="mt-5 grid list-none grid-cols-2 gap-x-5 gap-y-1.5 p-0">
                {shown.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13px] leading-[1.45] text-char-700"
                  >
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 flex-none rounded-full bg-coral-500" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {footer && (
            <Link
              to={footer.to}
              data-menu-item
              onClick={dismiss}
              className="mt-6 inline-flex items-center gap-2 self-start font-display text-[13px] tracking-[0.06em] text-char-900 uppercase no-underline transition-colors duration-200 hover:text-coral-700"
            >
              {footer.label}
              <Icon name="arrowRight" size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* ── The charcoal foot ── */}
      <div className="menu-foot flex flex-wrap items-center justify-between gap-3 px-7 py-4 max-md:px-5">
        <p className="m-0 text-[13.5px] leading-snug">
          Need something built for your business specifically?
        </p>
        <a
          href={contact.phoneHref}
          onClick={dismiss}
          className="font-display text-[15px] tracking-[0.02em] text-white no-underline transition-opacity duration-200 hover:opacity-75"
        >
          Or call {contact.phone}
        </a>
      </div>
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className="max-md:w-full md:relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-current={active ? "true" : undefined}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        /* No `text-inherit`: it is a utility, so it would beat `.nav-link`'s
           colour and leave this trigger a different shade from its siblings. */
        className="nav-link flex cursor-pointer items-center gap-1.5 border-0 bg-transparent max-md:min-h-[44px] max-md:w-full max-md:text-[19px]"
      >
        {label}
        <Icon
          name="chevronDown"
          size={13}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open &&
          (reduced ? (
            <div className="max-md:mt-2">{panel}</div>
          ) : (
            <motion.div
              className="max-md:mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: duration.short, ease: ease.out }}
            >
              {panel}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
