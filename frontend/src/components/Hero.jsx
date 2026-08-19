import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Logo from "./Logo";
import { brand, disciplines } from "../data/site";

/**
 * HERO — a full steel field with the wordline reversed out of it.
 *
 * The headline is the tagline set as three lines, with a duotoned photograph
 * locked into the baseline of the last one, so the image reads as a glyph in
 * the sentence rather than as decoration beside it.
 */
export default function Hero({ showAvailability = true }) {
  return (
    <section id="top" className="hero">
      {/* Loose registration marks — the drawing's own scaffolding. */}
      <Blueprint
        reversed
        className="hero__mark"
        aria-hidden="true"
        style={{ top: "16%", left: "5%", width: 90, height: 90, opacity: 0.6 }}
      />
      <Blueprint
        reversed
        className="hero__mark"
        aria-hidden="true"
        style={{ bottom: "18%", right: "6%", width: 56, height: 56, opacity: 0.5 }}
      />

      <div className="shell hero__inner">
        <div className="hero__top">
          {showAvailability && (
            <span
              className="tag tag-outline"
              style={{
                borderColor: "var(--color-accent-300)",
                color: "var(--color-accent-300)",
                fontSize: 12,
              }}
            >
              DIGITAL AGENCY — BASED IN INDIA
            </span>
          )}
          <ul
            className="hero__disciplines"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
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
          <span className="hero__line hero__line--media">
            {/* The artboard locks a photograph into this line. Until the team
                shoot exists, the brand mark holds the slot — it belongs in the
                sentence far better than a stand-in image would. */}
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
          <Blueprint
            as="a"
            href="#contact"
            reversed
            className="btn btn-primary"
            style={{
              position: "relative",
              textDecoration: "none",
              fontSize: 15,
              padding: "15px 26px",
              flex: "none",
            }}
          >
            <Icon name="plus" size={15} strokeWidth={2} />
            Start a Project
          </Blueprint>
        </div>
      </div>
      <span className="sr-only" hidden>
        {brand.tagline}
      </span>
    </section>
  );
}
