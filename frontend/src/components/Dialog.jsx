import { useEffect, useRef } from "react";
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
export default function Dialog({ open, onClose, title, children, labelledBy }) {
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

  if (!open) return null;

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="dialog dialog--solid"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
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
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
