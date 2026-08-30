import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import Figure from "./figures";
import { span, spanFigure } from "../data/span";

/**
 * THE SPAN — the last section before the form, and the only one that answers
 * "what am I actually agreeing to?".
 *
 * WHY IT GOES HERE AND NOT ANYWHERE ELSE. The FAQ above it clears the stated
 * objections — lock-in, ownership, timelines. This clears the unstated one,
 * which is the larger of the two: someone does not stall on a form because the
 * price is wrong, they stall because they cannot picture the far end of what
 * they are starting. Four named stages with the free ones marked is a better
 * thing to read immediately before an enquiry field than one more paragraph
 * about us, and it is the reason this sits between the FAQ and Contact rather
 * than up with About.
 *
 * THE KEY UNDER THE DRAWING IS NOT A REPEAT OF IT, and the split is deliberate.
 * The figure carries four labels, which is all a card can hold; the key carries
 * what each stage costs and what it leaves you free to do, which is the part
 * that actually persuades and which no diagram can say. A legend under a
 * schematic is this design system's own convention — see any drawing it is
 * modelled on — so the section reads as one object rather than as a picture
 * with a paragraph stapled underneath.
 *
 * IT DELIBERATELY DOES NOT USE ORBIT'S HOVER READ-OUT. That device is already
 * spent two sections up, and a page that explains two different figures the
 * same way teaches a visitor that the figures are the same. This one is
 * legible standing still, on a phone, with nothing hovered — which is how most
 * of this audience will meet it.
 */
export default function Span() {
  return (
    <section id="the-span" className="section-y overflow-hidden bg-white">
      <div className="shell">
        <Reveal>
          <SectionIndex num="06" label={span.eyebrow} />
        </Reveal>

        <Reveal className="mb-[clamp(16px,2.5vw,32px)] max-w-[660px]">
          <h2 className="display mb-3 text-[clamp(32px,4vw,52px)]">{span.heading}</h2>
          <p className="text-muted m-0 text-base">{span.body}</p>
        </Reveal>

        <Reveal delay={0.08} variant="fade">
          <Figure spec={spanFigure} />
        </Reveal>

        {/* The one line the drawing cannot say about itself. Placed under the
            figure rather than in the body copy because it is a note on a
            drawing, and it is worthless until you have seen the dashes. */}
        <Reveal delay={0.1} variant="fade">
          <p className="text-muted mx-auto mt-[clamp(14px,2vw,22px)] max-w-[46ch] text-center text-[13px] leading-[1.5]">
            The bow is dashed for as long as it costs you nothing.
          </p>
        </Reveal>

        {/* ── The key ── */}
        <Reveal
          delay={0.12}
          as="ol"
          /* FOUR OR TWO OR ONE, NEVER THREE. `auto-fit` with a minimum looks
              like the right tool and is not: at 1024 it fits three columns and
              leaves the fourth stage alone on a row of its own beside a gap
              twice its width. Four items want their own factors, which is what
              every other four-up grid on this site uses. */
          className="mt-[clamp(32px,4.5vw,60px)] grid list-none gap-x-[clamp(20px,3vw,40px)] gap-y-[clamp(24px,3vw,36px)] border-t border-line p-0 pt-[clamp(24px,3vw,36px)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {span.stages.map((stage) => (
            <li key={stage.label}>
              <p className="mb-2.5 flex items-center gap-2.5">
                <span className="font-display text-[12px] tracking-[0.1em] text-coral-700">
                  {stage.num}
                </span>
                {/* Free is the fact that actually moves someone, so it is a
                    mark on the stage rather than a clause they have to reach
                    the end of a paragraph for. Same flag the bow's dashes are
                    cut from — see span.js. */}
                {stage.free && (
                  <span className="rounded-full bg-coral-500/10 px-2 py-0.5 font-display text-[10.5px] tracking-[0.1em] text-coral-700 uppercase">
                    No charge
                  </span>
                )}
              </p>
              <h3 className="display mb-2 text-[clamp(17px,1.8vw,21px)] leading-[1.15]">
                {stage.label}
              </h3>
              <p className="text-muted m-0 text-[14.5px] leading-[1.6]">{stage.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
