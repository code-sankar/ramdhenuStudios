import Dialog from "./Dialog";
import { LEGAL_NEEDS_REVIEW, privacy, terms } from "../data/legal";

const documents = { privacy, terms };

/**
 * Renders whichever legal document the footer asked for. Kept as one component
 * so both documents share the same dialog behaviour and markup.
 *
 * BOTH DIALOGS ARE ALWAYS MOUNTED, WHICH LOOKS WASTEFUL AND IS NOT.
 *
 * `Dialog` animates its own exit, and an exit needs the component to still
 * exist while it runs. This used to return `null` the moment `openDoc` cleared,
 * which tore the dialog down — and its `<AnimatePresence>` with it — in the same
 * frame the close was requested. Measured, that was six frames of movement
 * opening and exactly one closing.
 *
 * Rendering one dialog per document and letting each own its `open` flag fixes
 * that without a scrap of bookkeeping. The obvious alternative — keep one
 * dialog mounted and remember which document was last shown — needs either an
 * effect or a ref written during render, and both exist only to answer "what
 * was in here a moment ago". Giving each document its own dialog means neither
 * ever has to forget, so the question never comes up. A closed one renders
 * `<AnimatePresence>` around nothing and costs no DOM at all.
 */
export default function LegalDialogs({ openDoc, onClose }) {
  return Object.entries(documents).map(([key, doc]) => (
    <Dialog
      key={key}
      open={openDoc === key}
      onClose={onClose}
      title={doc.title}
      labelledBy={`legal-${key}`}
    >
      <p className="text-muted mb-4 text-xs">{doc.updated}</p>

      {LEGAL_NEEDS_REVIEW && (
        <p className="mb-6 flex flex-wrap items-baseline gap-2 border-b border-line pb-4 text-[13px]">
          <span className="tag tag-outline">Draft</span>
          Written to describe what this site does today. Have it reviewed before launch.
        </p>
      )}

      {doc.sections.map((section) => (
        <section key={section.heading} className="mb-6">
          <h3 className="display mb-2 text-base">{section.heading}</h3>
          <p className="m-0 text-sm">{section.body}</p>
        </section>
      ))}
    </Dialog>
  ));
}
