/**
 * The spec-sheet index that opens every section — the blueprint system's own
 * way of numbering a drawing.
 *
 * `onSteel` inverts it for the dark field, where the paper-ground accent and
 * hairline are both too dark to read.
 */
export default function SectionIndex({ num, label, onSteel = false }) {
  return (
    <p className="mb-[clamp(28px,3.4vw,44px)] flex items-center gap-[14px]">
      <span
        className={`font-display text-[12px] tracking-[0.1em] ${
          onSteel ? "text-steel-300" : "text-steel-700"
        }`}
      >
        {num}
      </span>
      <span
        aria-hidden="true"
        className={`h-px w-[34px] ${onSteel ? "bg-paper/30" : "bg-line"}`}
      />
      <span className="kicker">{label}</span>
    </p>
  );
}
