import Blueprint from "./Blueprint";
import EnquiryForm from "./EnquiryForm";
import Icon from "./Icon";
import Reveal from "./Reveal";
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
    <section id="contact" className="contact">
      <div className="shell">
        <div className="contact__inner">
          <Reveal className="contact__ask">
            <p className="section-index section-index--reversed">
              <span className="section-index__num">04</span>
              <span className="section-index__rule" aria-hidden="true" />
              <span className="kicker">Start here</span>
            </p>
            <h2 className="section-title contact__title">Let&apos;s build your step forward.</h2>
            <p className="contact__lede">
              Tell us what you&apos;re building. We&apos;ll tell you how to get there — with a
              plan, a timeline, and a team that ships.
            </p>

            <Blueprint
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              reversed
              className="btn btn-secondary contact__whatsapp"
            >
              <Icon name="whatsapp" size={16} />
              Chat on WhatsApp
            </Blueprint>

            <ul className="contact__channels">
              <li>
                <span className="contact__label">Email</span>
                <a href={contact.emailHref}>{contact.email}</a>
              </li>
              <li>
                <span className="contact__label">Phone</span>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <span className="contact__label">Studio</span>
                <span>{contact.studio}</span>
              </li>
              <li>
                <span className="contact__label">Hours</span>
                <span>{contact.hours}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="contact__form">
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
