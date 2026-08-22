import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { duration, ease, travel } from "../lib/motion";
import Icon from "./Icon";

/**
 * DIALOG — the design system's modal, made keyboard-safe.
 * ---------------------------------------------------------------------------
 * Adds the behaviour a `.dialog-backdrop` needs to be usable: Escape closes,
 * focus moves in on open and returns to the trigger on close, Tab is trapped
 * inside, and a click on the backdrop dismisses.
 *
 * Deviation from the system, deliberate: `.dialog` is transparent in the
 * blueprint layer, which is right for a card sitting on the page but leaves a
 * modal unreadable over its own backdrop. `.dialog--solid` gives it the paper
 * ground back; the border and square corners are untouched.
 */
/**
 * KEEP THIS MOUNTED AND TOGGLE `open`. It animates its own exit, and an exit
 * needs the component to still exist while it runs — a caller that renders
 * `{isOpen && <Dialog open …/>}`, or returns null when its own state clears,
 * destroys this subtree in the same frame the close is requested and the
 * dialog will vanish instantly however much animation is declared below.
 * `LegalDialogs` had exactly that shape and the comment there says what it
 * cost.
 */
export default function Dialog({ open, onClose, title, children, labelledBy }) {
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const restoreTo = useRef(null);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement;
    const panel = panelRef.current;
    panel?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = overflow;
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  /* A MODAL THAT APPEARS IN ONE FRAME READS AS A BUG BEFORE IT READS AS A
     DIALOG. Measured before this, the backdrop and the panel both went from
     absent to fully painted between two frames, which gives the reader no cue
     about where the thing came from or that the page behind it is still there.

     The exit is the half that needs `AnimatePresence`, and it is the half most
     implementations skip: `open` flipping false used to unmount the subtree
     immediately, so the dialog could fade in but never out. Keeping it mounted
     for the length of its exit is the only way to close it gracefully.

     The panel rises 10px and the backdrop only fades — the backdrop is the
     whole viewport, and a full-screen surface that moves reads as the page
     itself lurching. */
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.short, ease: ease.out }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            className="dialog dialog--solid"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: travel.sm, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: travel.sm * 0.6, scale: 0.99 }
            }
            transition={{ duration: duration.short, ease: ease.out }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="dialog-title" id={labelledBy}>
                {title}
              </h2>
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                onClick={onClose}
                aria-label="Close"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="dialog-body">{children}</div>
            <div className="dialog-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
