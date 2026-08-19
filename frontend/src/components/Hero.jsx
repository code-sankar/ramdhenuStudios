import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Logo from "./Logo";
import { brand, disciplines } from "../data/site";

/**
 * HERO — the tagline set at full field scale on steel.
 *
 * The type is sized to fill the measure rather than sit inside it, the brand
 * mark is locked into the third line as a glyph in the sentence, and the
 * disciplines run as an indexed spec list so the top right is structure
 * rather than empty ground.
 *
 * The aurora, its scrim and the blueprint grid stay in app.css — layered
 * gradients with masks are not something utilities express well.
 */
export default function Hero({ showAvailability = true }) {
  return (
    <section
      id="top"
      className="hero relative box-border flex min-h-screen flex-col justify-center overflow-hidden bg-steel-900 pt-[clamp(80px,13vh,140px)] pb-[clamp(40px,6vh,64px)]"
    >
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="shell relative z-[1] flex flex-col gap-[clamp(30px,4.4vw,52px)]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          {showAvailability && (
            <span className="tag tag-outline inline-flex items-center gap-[9px] border-paper/25 px-[13px] py-1.5 text-[11px] tracking-[0.13em] text-paper/80 uppercase">
              <span className="hero__pulse" aria-hidden="true" />
              Digital agency — based in India
            </span>
          )}

          <ol className="flex list-none flex-col items-start gap-[9px] p-0 sm:items-end">
            {disciplines.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-[11px] font-display text-[12.5px] tracking-[0.07em] text-paper/90 uppercase"
              >
                <span className="text-[10px] tracking-[0.1em] text-steel-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-[26px] flex-none bg-paper/30" />
                {item}
              </li>
            ))}
          </ol>
        </div>

        <h1 className="display m-0 on-steel text-[clamp(48px,10.4vw,168px)] leading-[0.9] tracking-[-0.022em]">
          <span className="block">A Step</span>
          <span className="block">Towards Digital</span>
          <span className="flex items-center gap-[clamp(14px,2vw,34px)]">
            Presence
          </span>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-7 border-t border-paper/25 pt-[clamp(20px,2.6vw,30px)]">
          <p className="m-0 max-w-[430px] text-[15.5px] leading-[1.6] text-paper/85">
            Ramdhenu is a digital agency for local businesses that want more than a website —
            strategy, visuals and campaigns, working as one.
          </p>

          <div className="flex flex-none flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-[9px] border border-steel bg-steel px-[26px] py-[15px] font-display text-[15px] tracking-[0.01em] on-steel no-underline transition duration-200 hover:-translate-y-px hover:border-steel-400 hover:bg-steel-400 active:translate-y-0"
            >
              <Icon name="plus" size={15} strokeWidth={2} />
              Start a Project
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-[9px] border border-paper/25 px-[26px] py-[15px] font-display text-[15px] tracking-[0.01em] text-paper/90 no-underline transition duration-200 hover:border-paper/45 hover:bg-paper/10 hover:text-paper"
            >
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
