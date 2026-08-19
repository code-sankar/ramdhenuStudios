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
      <p className="legal__updated text-muted">{doc.updated}</p>

      {LEGAL_NEEDS_REVIEW && (
        <p className="legal__notice">
          <span className="tag tag-outline">Draft</span>
          Written to describe what this site does today. Have it reviewed before launch.
        </p>
      )}

      {doc.sections.map((section) => (
        <section key={section.heading} className="legal__section">
          <h3 className="legal__heading">{section.heading}</h3>
          <p className="legal__body">{section.body}</p>
        </section>
      ))}
    </Dialog>
  );
}
