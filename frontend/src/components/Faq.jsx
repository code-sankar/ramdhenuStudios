import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { faqs } from "../data/faq";
import { whatsappLink } from "../data/site";
import { track } from "../lib/track";

/**
 * FAQ — the objections that stall a deal, answered just before the ask.
 *
 * Two things separate it from the Services accordion so the page does not read
 * as the same device twice: the heading holds a sticky left column rather than
 * running full width, and more than one answer can be open at a time. Services
 * is a showcase where one item at a time is the point; an FAQ is a reference,
 * and closing someone's last answer to open the next is just friction.
 */
export default function Faq() {
  const [open, setOpen] = useState(() => new Set([0]));

  const toggle = (i) =>
    setOpen((current) => {
      const next = new Set(current);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section id="faq" className="section-y bg-lav-100">
      {/* Answered from how the business is set up, so the markup is the single
          source and the schema can never drift from what is on the page.
          Note: since 2023 Google shows FAQ rich results only for authoritative
          government and health sites, so this is here for machine-readability
          — including AI answer surfaces — not for a rich snippet. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />

      <div className="shell grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <Reveal className="lg:sticky lg:top-28">
          <SectionIndex num="04" label="Before you ask" />
          <h2 className="display text-[clamp(28px,3.6vw,44px)]">Questions We Get Asked</h2>
          <p className="text-muted mt-4 max-w-[38ch] text-base">
            Straight answers, including the ones that are less convenient for us.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("WhatsApp click", { from: "faq" })}
            className="linkish mt-6 inline-flex items-center gap-2 text-sm max-md:min-h-[44px] max-md:py-2"
          >
            <Icon name="whatsapp" size={15} />
            Something else? Ask us on WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="list-none border-t border-line p-0">
            {faqs.map((item, i) => {
              const isOpen = open.has(i);
              const panelId = `faq-panel-${i}`;
              const headingId = `faq-heading-${i}`;

              return (
                <li key={item.q} className="border-b border-line">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="group flex w-full cursor-pointer items-start gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
                    >
                      <span className="mt-0.5 w-6 flex-none font-display text-[13px] text-coral-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[clamp(16px,1.5vw,20px)] uppercase transition-colors duration-150 group-hover:text-coral-700">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex-none text-coral-700 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <Icon name="plus" size={18} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={headingId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted m-0 max-w-[62ch] pt-1 pb-5 pl-10 text-[15px] leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
