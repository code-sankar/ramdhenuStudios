import { Link } from "react-router-dom";

import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import VideoEmbed from "./VideoEmbed";
import { aboutVideo, industries, stats } from "../data/site";
import { industryByLabel } from "../data/industries";
import { industryPath } from "../data/seo";

/**
 * ABOUT — the positioning claim, the film, then the facts behind it.
 *
 * The claim and its qualification are split across two columns: the claim
 * keeps display scale, the qualification sits at body scale. Run at the same
 * size they put five lines of grey under one line of black and read as a wall.
 */
export default function About() {
  return (
    <section id="about" className="section-y bg-paper">
      <div className="shell">
        <Reveal>
          <SectionIndex num="01" label="Who we are" />
        </Reveal>

        <div className="mb-[clamp(48px,6vw,88px)] grid items-start gap-[clamp(32px,5vw,80px)] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Reveal>
            <h2 className="display text-[clamp(30px,4.4vw,62px)] tracking-[-0.02em]">
              We help local businesses turn attention into customers.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="pt-2">
            <p className="mb-6 text-[16.5px] leading-[1.62] text-ink/70">
              No jargon, no bloat — one team covering the website, the visuals and the
              campaigns that bring people through the door.
            </p>

            {/* The trades we have written a page for become links; the rest stay
                plain chips. Nothing here promises a page that does not exist. */}
            <ul className="flex list-none flex-wrap gap-[7px] p-0">
              {industries.slice(0, 8).map((item) => {
                const page = industryByLabel(item);
                const chip =
                  "block border px-[10px] py-[5px] font-display text-[11.5px] tracking-[0.04em] uppercase";
                return (
                  <li key={item}>
                    {page ? (
                      <Link
                        to={industryPath(page.slug)}
                        className={`${chip} border-steel/45 text-steel-700 no-underline transition-colors duration-150 hover:border-steel hover:bg-steel hover:text-paper`}
                      >
                        {item}
                      </Link>
                    ) : (
                      <span className={`${chip} border-line text-ink/60`}>{item}</span>
                    )}
                  </li>
                );
              })}
              <li className="border border-line px-[10px] py-[5px] font-display text-[11.5px] tracking-[0.04em] text-ink/45 uppercase">
                + more
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mb-[clamp(48px,6vw,88px)] max-w-[1080px]">
          <VideoEmbed
            id={aboutVideo.id}
            title={aboutVideo.title}
            poster={aboutVideo.poster}
            caption={aboutVideo.caption}
          />
        </Reveal>

        {/* One ruled row rather than four floating figures. */}
        <Reveal delay={0.12}>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] border-t border-ink">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-line pt-[clamp(22px,2.6vw,32px)] pr-[clamp(18px,2.2vw,30px)] pb-[clamp(18px,2.2vw,26px)] last:border-r-0"
              >
                <dt className="block font-display text-[clamp(34px,3.6vw,52px)] leading-none tracking-[-0.02em]">
                  {stat.value}
                </dt>
                <dd className="text-muted mt-[10px] max-w-[20ch] text-[13px] leading-[1.45]">
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
