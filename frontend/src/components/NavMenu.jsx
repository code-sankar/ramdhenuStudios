import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Blueprint from "./Blueprint";
import Icon from "./Icon";
import { duration, ease } from "../lib/motion";

/**
 * NAV MENU — the one dropdown in the header.
 *
 * The trigger is a BUTTON, not a link, and that is the whole accessibility
 * story. A link that also opens a menu has to guess which one a click meant;
 * a button that opens a menu is unambiguous, and the destination the link used
 * to point at survives as the first row inside ("All services"). A trigger
 * that swallows its own destination is a dead end.
 *
 * Hover opens it too, but only where hovering is real — `(hover: hover)`, so a
 * touch device never gets a phantom open from a tap that was meant as a click.
 * Closing is delayed by a beat because the path from the trigger to the panel
 * is diagonal, and a menu that vanishes mid-reach is the single most common
 * way this pattern is got wrong.
 *
 * Keyboard: Enter/Space toggles, Escape closes and returns focus to the
 * trigger, Down opens and lands on the first item, Up/Down move between items,
 * and moving focus out of the whole thing closes it.
 *
 * BELOW md IT IS NOT A DROPDOWN. The header collapses into a stacked panel on
 * a phone, so the menu becomes an inline accordion inside it — an absolutely
 * positioned overlay in a 360px column would cover the nav it belongs to.
 * Same component, same state, different placement.
 */
export default function NavMenu({ label, items, currentPath, active = false, onNavigate }) {
  const id = useId();
  const panelId = `nav-menu-${id.replace(/:/g, "")}`;
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  /* Open-ness is stored as the path it was opened on, not as a boolean, so a
     navigation closes it by derivation rather than by an effect firing after
     the new page has already painted behind it. */
  const [openAt, setOpenAt] = useState(null);
  const open = openAt !== null && openAt === pathname;

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

  /* A click anywhere else dismisses it. Pointerdown rather than click so it
     closes on press, before the thing underneath reacts. */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  /* Hover is a convenience layered on top of the click, and only where a
     pointer can actually hover. */
  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const onEnter = () => {
    if (!hoverCapable()) return;
    openMenu();
  };

  const onLeave = () => {
    if (!hoverCapable()) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenAt(null), 140);
  };

  const focusItem = (index) => {
    const links = wrapRef.current?.querySelectorAll("[data-menu-item]");
    if (!links?.length) return;
    const wrapped = (index + links.length) % links.length;
    links[wrapped]?.focus();
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
    const at = links.indexOf(document.activeElement);
    focusItem(at + (event.key === "ArrowDown" ? 1 : -1));
  };

  /* Tabbing past the last item, or shift-tabbing off the trigger, should close
     it — but only when focus has actually left the whole control. */
  const onBlur = (event) => {
    if (!wrapRef.current?.contains(event.relatedTarget)) close();
  };

  const panel = (
    <Blueprint
      as="div"
      id={panelId}
      className="block w-full bg-paper p-2 md:absolute md:top-[calc(100%+14px)] md:left-1/2 md:z-10 md:w-[290px] md:-translate-x-1/2"
      onKeyDown={onPanelKeyDown}
    >
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              data-menu-item
              aria-current={currentPath === item.to ? "true" : undefined}
              onClick={() => {
                close();
                onNavigate?.();
              }}
              className="flex items-center gap-3 border-b border-line px-2.5 py-2.5 text-[14.5px] no-underline transition-colors duration-150 last:border-b-0 hover:bg-panel hover:text-steel-700 aria-[current=true]:text-steel-700 max-md:min-h-[44px] max-md:text-[16px]"
            >
              {item.num && (
                <span className="w-6 flex-none font-display text-[11.5px] tracking-[0.08em] text-steel-700">
                  {item.num}
                </span>
              )}
              <span className="flex-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Blueprint>
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
        className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[15.5px] tracking-[0.005em] text-inherit transition-colors duration-150 hover:text-steel-700 aria-[current=true]:text-steel-700 max-md:min-h-[44px] max-md:w-full max-md:text-[17px]"
      >
        {label}
        <Icon
          name="chevronDown"
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open &&
          (reduced ? (
            <div className="max-md:mt-2">{panel}</div>
          ) : (
            <motion.div
              className="max-md:mt-2"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: duration.short, ease: ease.out }}
            >
              {panel}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
