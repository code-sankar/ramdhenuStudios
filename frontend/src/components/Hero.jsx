import Icon from "./Icon";
import { brand, disciplines } from "../data/site";

/**
 * HERO — a full steel field with the wordline reversed out of it.
 *
 * The headline is the tagline set as three clean lines. Along the bottom a
 * soft spectral aurora glows up out of the steel — the one place colour is
 * allowed to bloom — carrying the eye down to the lede and the primary call
 * to action.
 */
export default function Hero({ showAvailability = true }) {
  return (
    <section id="top" className="hero">
      {/* The spectral glow that blooms up from the base of the field. */}
      <div className="hero__aurora" aria-hidden="true" />

      <div className="shell hero__inner">
        <div className="hero__top">
          {showAvailability && (
            <span
              className="tag tag-outline hero__tag"
              style={{
                borderColor: "var(--color-accent-300)",
                color: "var(--color-accent-300)",
              }}
            >
              DIGITAL AGENCY — BASED IN INDIA
            </span>
          )}
          <ul className="hero__disciplines">
            {disciplines.map((item) => (
              <li key={item} className="hero__discipline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h1 className="hero__title">
          <span className="hero__line">A Step</span>
          <span className="hero__line">Towards Digital</span>
          <span className="hero__line">Presence</span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lede">
            Ramdhenu is a digital agency for local businesses that want more than a website —
            strategy, visuals and campaigns, working as one.
          </p>
          <a href="#contact" className="hero__cta">
            <Icon name="plus" size={15} strokeWidth={2} />
            Start a Project
          </a>
        </div>
      </div>

      <span className="sr-only" hidden>
        {brand.tagline}
      </span>
    </section>
  );
}