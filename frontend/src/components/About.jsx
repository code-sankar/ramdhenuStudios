import Reveal from "./Reveal";
import { industries, stats } from "../data/site";

/**
 * ABOUT — the positioning claim, then the facts behind it.
 *
 * The claim and its qualification used to run at the same display size, which
 * put five lines of grey under one line of black and read as a wall. They are
 * split into two columns now: the claim keeps the display scale, the
 * qualification drops to body copy where it belongs.
 */
export default function About() {
  return (
    <section id="about" className="section section--paper">
      <div className="shell">
        <Reveal>
          <p className="section-index">
            <span className="section-index__num">01</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span className="kicker">Who we are</span>
          </p>
        </Reveal>

        <div className="about__grid">
          <Reveal>
            <h2 className="section-title about__title">
              We help local businesses turn attention into customers.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="about__aside">
            <p className="about__body">
              No jargon, no bloat — one team covering the website, the visuals and the
              campaigns that bring people through the door.
            </p>
            <ul className="about__industries">
              {industries.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li className="about__industries-more">+ more</li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <dl className="stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <dt className="stat__value">{stat.value}</dt>
                <dd className="stat__label text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
