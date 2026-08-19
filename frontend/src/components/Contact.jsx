import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { contact } from "../data/site";

/** The closing steel field: one ask, one action. */
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="shell">
        <Reveal className="contact__inner">
          <div style={{ maxWidth: 680 }}>
            <h2 className="section-title contact__title">Let&apos;s build your step forward.</h2>
            <p className="contact__lede">
              Tell us what you&apos;re building. We&apos;ll tell you how to get there — with a
              plan, a timeline, and a team that ships.
            </p>
          </div>
          <Blueprint
            as="a"
            href={contact.emailHref}
            reversed
            className="btn btn-primary"
            style={{
              position: "relative",
              textDecoration: "none",
              fontSize: 16,
              padding: "16px 28px",
              flex: "none",
            }}
          >
            <Icon name="plus" size={16} strokeWidth={2} />
            Start a Project
          </Blueprint>
        </Reveal>
      </div>
    </section>
  );
}
