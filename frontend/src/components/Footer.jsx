import Icon from "./Icon";
import { brand, contact, legal, nav, socials } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <span className="footer__brand">{brand.wordmark}</span>
            <p className="text-muted" style={{ fontSize: 14, maxWidth: 240, margin: "0 0 var(--space-4)" }}>
              {brand.tagline}.
            </p>
            <div className="footer__socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="btn btn-icon btn-secondary"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="footer__col-head text-muted">Contact</span>
            <span className="footer__label">Email</span>
            <a href={contact.emailHref} className="footer__value">
              {contact.email}
            </a>
            <span className="footer__label">Phone</span>
            <a href={contact.phoneHref} className="footer__value">
              {contact.phone}
            </a>
            <span className="footer__label">Studio</span>
            <span style={{ display: "block" }}>{contact.studio}</span>
          </div>

          <div>
            <span className="footer__col-head text-muted">Company</span>
            <nav className="footer__nav" aria-label="Footer">
              {nav.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="footer__col-head text-muted">Legal</span>
            <nav className="footer__nav" aria-label="Legal">
              {legal.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer__bottom text-muted">
          <span>
            © {year} {brand.name}. All rights reserved.
          </span>
          <span>{brand.since}</span>
        </div>
      </div>

      {/* The wordmark, cropped by the page edge. */}
      <div className="footer__wordmark-clip" aria-hidden="true">
        <span className="footer__wordmark">{brand.wordmark}</span>
      </div>
    </footer>
  );
}
