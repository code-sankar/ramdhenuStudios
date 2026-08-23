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
 * BELOW lg IT IS A PLAIN LIST inside the drawer. A three-column panel in a
 * 360px column is not a menu, it is a scroll trap.
 *
 * BOTH PANELS OPEN IN THE SAME BOX, which is why `preempt` exists: the header
 * marks whichever menu is not the open one, and a preempted panel is cut rather
 * than faded out on top of its replacement. It gates painting only, never
 * state — a menu that is preempted still owns and clears its own open-ness, so
 * there is no way for the two to disagree about who is open.
 *
 * IT IS RENDERED TWICE — services and industries — SO NOTHING HERE MAY NAME A
 * SERVICE. `kind` supplies the word the read column labels an item with, and
 * `listLabel` names the bullets under it: what a service *includes* needs no
 * heading, whereas three service names under an industry need to be told apart
 * from the industry itself.
 */
export default function NavMenu({
  label,
  items,
  footer,
  kind,
  listLabel,
  currentPath,
  active = false,
  preempt = false,
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

  /* TWO COLUMNS WHEN THE LINES ARE PHRASES, ONE WRAPPING ROW WHEN THEY ARE
     NAMES. A service's bullets are sentences — the shortest of them is 21
     characters — and they fill a two-column grid. An industry's are three
     service names, none longer than 15, and in that same grid one of them ends
     up marooned 300px to the right of the others with a hole underneath. The
     rule reads the content rather than taking a flag, so a longer line added
     later moves the list back to columns on its own. */
  const namesNotPhrases = shown?.includes?.every((item) => item.length <= 18);

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

  /* From lg up the panel detaches into a wide sheet centred ON THE HEADER, not
     on its own trigger — the wrapper below is deliberately not positioned at
     this breakpoint, so the fixed header is the containing block and `100%` is
     the bar's own height.

     CENTRED ON THE TRIGGER IT HUNG 52px OFF THE LEFT EDGE. An 880px panel needs
     440px of room either side of whatever it is centred on, and the first
     trigger in a seven-item row does not have it. Centring on the bar cannot go
     off-screen at any width, and at 880 the panel is most of the bar anyway —
     it reads as a sheet dropping out of the header rather than as a tooltip on
     one word.

     IT IS CENTRED BY MARGINS, NOT BY A TRANSFORM, AND THAT IS THE WHOLE POINT.
     `inset-x-0` with a fixed width leaves the horizontal equation
     over-constrained, and the spec resolves that by splitting the slack between
     two `auto` margins — which centres the box using no transform at all. It
     has to be that way round because this element is also the one the entrance
     animates: a transform on an element does not disturb its own placement,
     whereas `-translate-x-1/2` combined with an animated `y` would fight over
     the same property. */
  const panelClass = [
    "menu-panel w-full max-lg:mt-2",
    "lg:absolute lg:inset-x-0 lg:top-[calc(100%+14px)] lg:z-20",
    "lg:mx-auto lg:w-[min(880px,calc(100vw-40px))]",
  ].join(" ");

  const panel = (
    <>
      <div className="lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        {/* ── The rail ── */}
        <ul className="m-0 list-none p-0 lg:border-r lg:border-char-900/8">
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
                className="menu-rail-item no-underline max-lg:min-h-[44px]"
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
        <div className="hidden flex-col justify-between p-7 lg:flex">
          <div>
            <p className="mb-2 font-display text-[11px] tracking-[0.14em] text-coral-700 uppercase">
              {shown?.num} — {kind}
            </p>
            <h3 className="display mb-3 text-[26px] leading-[1.1] text-char-900">
              {shown?.label}
            </h3>
            <p className="m-0 max-w-[44ch] text-[14.5px] leading-[1.6] text-char-700">
              {shown?.blurb}
            </p>

            {/* What the column is actually for. The reference puts a photo
                here; four lines of what the item covers is more use to someone
                deciding which of six to click. */}
            {listLabel && shown?.includes?.length > 0 && (
              <p className="mt-5 mb-1.5 font-display text-[10.5px] tracking-[0.12em] text-char-700/70 uppercase">
                {listLabel}
              </p>
            )}
            {shown?.includes?.length > 0 && (
              <ul
                className={[
                  "list-none gap-x-5 gap-y-1.5 p-0",
                  namesNotPhrases ? "flex flex-wrap" : "grid grid-cols-2",
                  listLabel ? "mt-0" : "mt-5",
                ].join(" ")}
              >
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
      <div className="menu-foot flex flex-wrap items-center justify-between gap-3 px-7 py-4 max-lg:px-5">
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
    </>
  );

  return (
    <div
      ref={wrapRef}
      /* THE FLAG GOES ON THE WRAPPER, NOT ON THE PANEL, and it has to. Once
         AnimatePresence starts a panel's exit it is replaying the element from
         the render before it was removed, so a class set on the panel itself
         arrives one render too late to hide it. The wrapper is still being
         rendered, so its attribute is always current. */
      data-preempt={preempt ? "true" : undefined}
      /* No `lg:relative` — see the panel above: it centres on the header. */
      className="max-lg:w-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        /* Not `open`: a preempted panel is invisible and cannot be reached,
           so the honest answer for those 160ms is that it is not expanded —
           and it is what stops both triggers sitting coral at once. */
        aria-expanded={open && !preempt}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-current={active ? "true" : undefined}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        /* No `text-inherit`: it is a utility, so it would beat `.nav-link`'s
           colour and leave this trigger a different shade from its siblings. */
        className="nav-link flex cursor-pointer items-center gap-1.5 border-0 bg-transparent max-lg:min-h-[44px] max-lg:w-full max-lg:text-[19px]"
      >
        {label}
        <Icon
          name="chevronDown"
          size={13}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* NOTHING MAY WRAP THE PANEL IN A TRANSFORMED BOX. A transformed element
          is a containing block for absolutely positioned descendants, so while
          an outer `motion.div` held `transform: matrix(…)` mid-entrance, the
          panel was positioned against *it* — a 100px inline box sitting at the
          trigger — and only against the header once motion wrote
          `transform: none` on the last frame. The panel faded in 52px off the
          left edge of the window and then snapped 252px sideways into place,
          every single time it opened. The animated element and the positioned
          element are now one and the same, which is the only arrangement where
          that cannot happen. */}
      <AnimatePresence initial={false}>
        {open &&
          (reduced ? (
            <div id={panelId} onKeyDown={onPanelKeyDown} className={panelClass}>
              {panel}
            </div>
          ) : (
            <motion.div
              id={panelId}
              onKeyDown={onPanelKeyDown}
              className={panelClass}
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
