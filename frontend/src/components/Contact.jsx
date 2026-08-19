import Blueprint from "./Blueprint";
import EnquiryForm from "./EnquiryForm";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { contact, whatsappLink } from "../data/site";

/**
 * CONTACT — the closing steel field, and the site's only conversion point.
 *
 * The artboard closes on a single "Start a Project" button. That works as a
 * design statement but sends every visitor to an empty inbox, so the section
 * carries the actual enquiry surface: the ask and the direct channels on the
 * left, the form on the right. WhatsApp sits alongside it rather than behind
 * it — local business owners reach for it first.
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-steel-900 py-[clamp(64px,8vw,120px)]">
      <div className="shell">
        <div className="grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
          <Reveal>
            <SectionIndex num="05" label="Start here" onSteel />

            <h2 className="display mb-4 on-steel text-[clamp(32px,5vw,60px)] leading-[1.05]">
              Let&apos;s build your step forward.
            </h2>
            <p className="m-0 max-w-[480px] text-base text-paper/70">
              Tell us what you&apos;re building. We&apos;ll tell you how to get there — with a
              plan, a timeline, and a team that ships.
            </p>

            <Blueprint
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              reversed
              className="btn btn-secondary relative mt-6 border-paper/35 px-[22px] py-[13px] text-[15px] on-steel no-underline hover:bg-paper/10 active:bg-paper/20"
            >
              <Icon name="whatsapp" size={16} />
              Chat on WhatsApp
            </Blueprint>

            <ul className="mt-[clamp(32px,4vw,48px)] grid list-none grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 border-t border-paper/20 p-0 pt-[clamp(24px,3vw,32px)]">
              <Channel label="Email" href={contact.emailHref} value={contact.email} />
              <Channel label="Phone" href={contact.phoneHref} value={contact.phone} />
              <Channel label="Studio" value={contact.studio} />
              <Channel label="Hours" value={contact.hours} />
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Channel({ label, value, href }) {
  return (
    <li className="flex flex-col gap-[3px]">
      <span className="text-[11px] tracking-[0.08em] text-steel-300 uppercase">{label}</span>
      {href ? (
        <a href={href} className="text-[15px] on-steel no-underline hover:text-steel-300 hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-[15px] on-steel">{value}</span>
      )}
    </li>
  );
}
