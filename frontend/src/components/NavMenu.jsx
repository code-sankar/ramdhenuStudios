import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Icon from "./Icon";
import { variants } from "../lib/motion";

/**
 * NAV MENU — the Services mega-menu.
 *
 * The interaction model below is unchanged from the original dropdown and was
 * the hard part; only the panel it opens is new. Keeping notes on it here
 * because every one of these is a bug someone will otherwise reintroduce:
 *
 * The trigger is a BUTTON, not a link. A link that also opens a menu has to
 * guess which one a click meant. The destination the link used to point at
 * survives as "All services" in the panel footer — a trigger that swallows its
 * own destination is a dead end.
 *
 * Hover opens it, but only under `(hover: hover)`, so a touch device never gets
 * a phantom open from a tap meant as a click. Closing is delayed by a beat
 * because the path from trigger to panel is diagonal, and a menu that vanishes
 * mid-reach is the most common way this pattern is got wrong.
 *
 * Open-ness is stored as the pathname it was opened on, not as a boolean, so a
 * navigation closes it by derivation rather than by an effect firing after the
 * new page has already painted behind it.
 *
 * Keyboard: Enter/Space toggles, Escape closes and returns focus to the
 * trigger, Down opens onto the first card, Up/Down move between cards, and
 * focus leaving the whole control closes it.
 *
 * BELOW md IT IS NOT A MEGA-MENU. The header collapses into a drawer on a
 * phone, so this becomes a plain stacked list inside it — a 640px grid in a
 * 360px column is not a menu, it is a scroll trap. Same state, same handlers,
 * different panel.
 */
export default function NavMenu({ label, items, footer, currentPath, active = false, onNavigate }) {
  const id = useId();
  const panelId = `nav-menu-${id.replace(/:/g, "")}`;
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

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
    closeTimer.current = setTimeout(() => setOpenAt(null), 140);
  };

  const focusItem = (index) => {
    const links = wrapRef.current?.querySelectorAll("[data-menu-item]");
    if (!links?.length) return;
    links[(index + links.length) % links.length]?.focus();
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
        "nav-panel w-full overflow-hidden rounded-lg",
        /* From md up it detaches into a centred panel. `w-[min(...)]` keeps it
           inside the viewport on a 1024px laptop, where a fixed 640px panel
           centred on a right-hand trigger would hang off the edge. */
        "md:absolute md:top-[calc(100%+16px)] md:left-1/2 md:z-20 md:w-[min(660px,calc(100vw-48px))] md:-translate-x-1/2",
      ].join(" ")}
    >
      <ul className="m-0 grid list-none gap-1 p-2 md:grid-cols-2 md:p-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              data-menu-item
              aria-current={currentPath === item.to ? "true" : undefined}
              onClick={dismiss}
              className="group/item flex gap-3 rounded-md p-2.5 no-underline transition-colors duration-200 hover:bg-ink-950/5 aria-[current=true]:bg-ink-950/6 max-md:min-h-[44px] md:p-3"
            >
              <span className="mt-px w-6 flex-none font-display text-[11.5px] tracking-[0.08em] text-prism-indigo">
                {item.num}
              </span>
              <span className="flex-1">
                <span className="block text-[14.5px] leading-snug font-medium text-ink transition-colors duration-200 group-hover/item:text-prism-indigo max-md:text-[16px]">
                  {item.label}
                </span>
                {item.blurb && (
                  <span className="mt-0.5 block text-[12.5px] leading-[1.45] text-ink/68 max-md:hidden">
                    {item.blurb}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {footer && (
        <div className="border-t border-ink/8 bg-ink-950/3 px-4 py-3">
          <Link
            to={footer.to}
            data-menu-item
            onClick={dismiss}
            className="inline-flex items-center gap-2 font-display text-[13px] tracking-[0.06em] text-ink/75 uppercase no-underline transition-colors duration-200 hover:text-prism-indigo max-md:min-h-[44px]"
          >
            {footer.label}
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      )}
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
        /* No `text-inherit` here: it is a utility, so it beats `.nav-link`'s
           colour from the components layer and leaves this trigger a different
           shade from every link beside it. */
        className="nav-link flex cursor-pointer items-center gap-1.5 border-0 bg-transparent max-md:min-h-[44px] max-md:w-full max-md:text-[17px]"
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
              variants={variants.pop}
              initial="hidden"
              animate="show"
              exit="exit"
              style={{ transformOrigin: "top center" }}
            >
              {panel}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
