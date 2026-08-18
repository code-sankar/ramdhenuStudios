import { useState } from "react";
import { motion } from "motion/react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import { contact, whatsappLink } from "../../data/site";
import { services } from "../../data/services";
import { EASE_EXPO, fadeUpTight, stagger, viewport } from "../../lib/motion";

/**
 * FINAL CTA + CONTACT
 * ---------------------------------------------------------------------------
 * The last section answers the last question in the journey: "how do I contact
 * them?" — so the dramatic CTA and the actual contact surface live together
 * rather than being split across two screens.
 *
 * ⚠️  NO BACKEND. The form composes the enquiry and hands it to WhatsApp (or
 *     email as a fallback). That is deliberate — it works from day one with no
 *     server, and enquiries land somewhere the team already reads. To switch to
 *     a stored submission, replace `handleSubmit` with a POST to your endpoint
 *     (Formspree, a serverless function, a CRM webhook); nothing else changes.
 */

const fieldClass =
  "w-full rounded-md border border-line bg-ink-950/70 px-3.5 py-3 font-sans text-[0.9375rem] text-mist-50 " +
  "placeholder:text-mist-600 transition-colors duration-200 " +
  "hover:border-line-strong focus:border-volt-500 focus:outline-none focus-visible:outline-none";

const labelClass = "font-mono text-[0.625rem] tracking-[0.16em] text-mist-400 uppercase";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const composeMessage = (form) => {
    const data = new FormData(form);
    const lines = [
      "New enquiry from ramdhenustudios.com",
      "",
      `Name: ${data.get("name")}`,
      `Business: ${data.get("business") || "—"}`,
      `Phone: ${data.get("phone")}`,
      `Interested in: ${data.get("service")}`,
      "",
      `${data.get("message") || "—"}`,
    ];
    return lines.join("\n");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = composeMessage(event.currentTarget);
    window.open(
      `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  const handleEmailInstead = (event) => {
    const form = event.currentTarget.closest("form");
    if (!form) return;
    const text = composeMessage(form);
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(
      "Enquiry from the website",
    )}&body=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 pt-8 pb-24 sm:px-8 lg:px-10 lg:pb-32">
      <div className="mx-auto w-full max-w-[80rem]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
          className="relative overflow-hidden rounded-2xl border border-line-volt/60 bg-ink-900"
        >
          {/* This section is deliberately the brightest surface on the page. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_15%_0%,rgba(30,123,255,0.35),transparent_60%),radial-gradient(70%_100%_at_100%_100%,rgba(90,228,255,0.16),transparent_65%)]"
          />
          <div
            aria-hidden="true"
            className="grid-lines pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(85%_85%_at_30%_20%,#000,transparent)]"
          />

          <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
            {/* -------------------------------------------------------------
                THE ASK
            ------------------------------------------------------------- */}
            <div className="lg:col-span-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={stagger(0.08)}
              >
                <motion.p variants={fadeUpTight} className="eyebrow">
                  Let&apos;s Talk
                </motion.p>
                <motion.h2
                  variants={fadeUpTight}
                  className="mt-5 text-display-lg uppercase"
                >
                  Ready to Grow
                  <br />
                  Your <span className="text-glow">Business?</span>
                </motion.h2>
                <motion.p
                  variants={fadeUpTight}
                  className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-mist-200"
                >
                  Let&apos;s build your digital presence and turn it into real growth. The first
                  conversation is free — we&apos;ll tell you honestly what we&apos;d do first.
                </motion.p>

                <motion.div variants={fadeUpTight} className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href="#enquiry-form" size="lg" icon="arrowDown" className="sm:w-auto">
                    Book a Free Consultation
                  </Button>
                  <Button
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    size="lg"
                    icon="whatsapp"
                    iconPosition="left"
                  >
                    Chat on WhatsApp
                  </Button>
                </motion.div>
              </motion.div>

              {/* Direct channels, for people who won't fill a form */}
              <Reveal delay={0.15} className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                <ContactTile icon="phone" label="Call us" value={contact.phoneLabel} href={contact.phoneHref} />
                <ContactTile icon="mail" label="Email" value={contact.email} href={contact.emailHref} />
                <ContactTile icon="pin" label="Location" value={contact.location} note={contact.locationNote} />
                <ContactTile icon="clock" label="Business hours" value={contact.hours} />
              </Reveal>
            </div>

            {/* -------------------------------------------------------------
                ENQUIRY FORM
            ------------------------------------------------------------- */}
            <div className="lg:col-span-6 lg:pl-6">
              <Reveal delay={0.1}>
                <form
                  id="enquiry-form"
                  onSubmit={handleSubmit}
                  className="glass rounded-xl p-6 sm:p-8"
                >
                  <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.025em] text-mist-50">
                    Tell us about your business
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-400">
                    Takes under a minute. We reply the same working day.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className={labelClass}>
                        Your name *
                      </label>
                      <input id="name" name="name" required autoComplete="name" placeholder="Full name" className={fieldClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="business" className={labelClass}>
                        Business name
                      </label>
                      <input id="business" name="business" autoComplete="organization" placeholder="e.g. Bamboo Kitchen" className={fieldClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className={labelClass}>
                        Phone / WhatsApp *
                      </label>
                      <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" className={fieldClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className={labelClass}>
                        Interested in
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          defaultValue="Not sure yet"
                          className={`${fieldClass} appearance-none pr-10`}
                        >
                          <option>Not sure yet</option>
                          {services.map((service) => (
                            <option key={service.id}>{service.title}</option>
                          ))}
                        </select>
                        <Icon
                          name="arrowDown"
                          className="pointer-events-none absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 text-mist-500"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label htmlFor="message" className={labelClass}>
                        What would you like to achieve?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="More walk-ins, more enquiries, a website that actually works…"
                        className={`${fieldClass} resize-none`}
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" icon="whatsapp" magnetic={false} className="mt-7 w-full">
                    Send Enquiry
                  </Button>

                  <p className="mt-4 text-center text-[0.75rem] leading-relaxed text-mist-500">
                    Opens WhatsApp with your details filled in.{" "}
                    <button
                      type="button"
                      onClick={handleEmailInstead}
                      className="rounded-xs font-medium text-volt-300 underline underline-offset-2 transition-colors hover:text-spark"
                    >
                      Email it instead
                    </button>
                  </p>

                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="status"
                      className="mt-4 flex items-center justify-center gap-2 rounded-md border border-line-volt bg-volt-500/10 px-3 py-2.5 text-[0.8125rem] text-volt-300"
                    >
                      <Icon name="check" strokeWidth={2} className="h-3.5 w-3.5" />
                      WhatsApp opened in a new tab — send the message to reach us.
                    </motion.p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactTile({ icon, label, value, note, href }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="group flex gap-3.5 bg-ink-950/60 p-5 transition-colors duration-300 hover:bg-ink-900"
    >
      <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-volt-400" />
      <div className="min-w-0">
        <p className="font-mono text-[0.5625rem] tracking-[0.18em] text-mist-600 uppercase">{label}</p>
        <p className="mt-1.5 font-display text-[0.875rem] font-medium break-words text-mist-50 transition-colors group-hover:text-volt-300">
          {value}
        </p>
        {note && <p className="mt-1 text-[0.75rem] text-mist-500">{note}</p>}
      </div>
    </Wrapper>
  );
}
