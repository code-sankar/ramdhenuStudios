/**
 * PRISM FIELD — the living ground behind every dark section.
 *
 * Five drifting bodies of colour, a grain overlay and a scrim, all styled in
 * prism.css (`.prism-field`). This component only supplies the elements: the
 * blobs are addressed by `:nth-child`, so the count here and the rules there
 * are a pair — five spans, five rules.
 *
 * WHY IT IS NOT A CANVAS. A canvas would let the bodies interact, and would
 * cost a rAF loop running for as long as the section is mounted, on a phone,
 * on battery, for an effect nobody is looking at after the first two seconds.
 * Five composited layers on `transform` keyframes are indistinguishable at
 * this blur radius and cost the main thread nothing at all.
 *
 * `intensity` scales the whole field's opacity. The home hero runs at 1; a
 * service masthead runs lower so the field never competes with the page's
 * actual subject.
 */
export default function PrismField({ intensity = 1, veil = true, className = "" }) {
  return (
    <div className={`prism-field ${className}`} style={{ opacity: intensity }} aria-hidden="true">
      <span className="prism-field__blob" />
      <span className="prism-field__blob" />
      <span className="prism-field__blob" />
      <span className="prism-field__blob" />
      <span className="prism-field__blob" />
      {veil && <div className="prism-veil" />}
      <div className="prism-grain" />
    </div>
  );
}
