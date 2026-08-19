import Dialog from "./Dialog";
import { LEGAL_NEEDS_REVIEW, privacy, terms } from "../data/legal";

const documents = { privacy, terms };

/**
 * Renders whichever legal document the footer asked for. Kept as one component
 * so both documents share the same dialog behaviour and markup.
 */
export default function LegalDialogs({ openDoc, onClose }) {
  const doc = documents[openDoc];
  if (!doc) return null;

  return (
    <Dialog open onClose={onClose} title={doc.title} labelledBy={`legal-${openDoc}`}>
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
  );
}
