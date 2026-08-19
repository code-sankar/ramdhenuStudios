import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Logo from "./Logo";
import { brand, disciplines } from "../data/site";

/**
 * HERO — the tagline set at full field scale on steel.
 *
 * Three decisions carry this section:
 *
 *  • The type is sized to fill the measure rather than sit inside it, so the
 *    field reads as composed rather than as a headline with space left over.
 *  • The brand mark is locked into the third line as a glyph in the sentence —
 *    the artboard reserves that slot for a photograph, and the mark holds it
 *    far better than a stand-in image would.
 *  • The disciplines are set as an indexed spec list, which turns the top
 *    right from empty ground into structure.
 */
export default function Hero({ showAvailability = true }) {
  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="shell hero__inner">
        <div className="hero__top">
          {showAvailability && (
            <span className="tag tag-outline hero__tag">
              <span className="hero__pulse" aria-hidden="true" />
              Digital agency — based in India
            </span>
          )}

          <ol className="hero__disciplines">
            {disciplines.map((item, i) => (
              <li key={item} className="hero__discipline">
                <span className="hero__discipline-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="hero__discipline-rule" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ol>
        </div>

        <h1 className="hero__title">
          <span className="hero__line">A Step</span>
          <span className="hero__line">Towards Digital</span>
          <span className="hero__line hero__line--mark">
            <Blueprint reversed className="hero__photo">
              <Logo className="hero__mark-slot" />
            </Blueprint>
            Presence
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lede">
            Ramdhenu is a digital agency for local businesses that want more than a website —
            strategy, visuals and campaigns, working as one.
          </p>

          <div className="hero__actions">
            <a href="#contact" className="hero__cta">
              <Icon name="plus" size={15} strokeWidth={2} />
              Start a Project
            </a>
            <a href="#services" className="hero__cta hero__cta--ghost">
              See our work
            </a>
          </div>
        </div>
      </div>

      <span className="sr-only" hidden>
        {brand.tagline}
      </span>
    </section>
  );
}
