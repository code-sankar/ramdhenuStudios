import Reveal from "./Reveal";
import { stats } from "../data/site";

/**
 * ABOUT — the positioning statement, then the capability facts.
 *
 * The second half of the headline drops to muted so the sentence reads as a
 * claim followed by its qualification, which is the system's way of carrying
 * emphasis without introducing a second colour.
 */
export default function About() {
  return (
    <section id="about" className="section section--paper">
      <div className="shell">
        <Reveal>
          <span className="kicker">Who we are</span>
          <h2 className="section-title about__title">
            We help local businesses turn attention into customers.{" "}
            <span className="text-muted">
              No jargon, no bloat — one team covering the website, the visuals and the
              campaigns that bring people through the door.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="stat__value">{stat.value}</dt>
                <dd className="stat__label text-muted" style={{ margin: 0 }}>
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
