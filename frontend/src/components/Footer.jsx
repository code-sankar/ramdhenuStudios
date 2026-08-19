import { useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import LegalDialogs from "./LegalDialogs";
import { brand, contact, nav, socials } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  /* Privacy and Terms open in place — this is a one-page site, and two
     documents don't justify pulling in a router. */
  const [openDoc, setOpenDoc] = useState(null);

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <Logo className="footer__brand" />
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
              <button type="button" className="linkish" onClick={() => setOpenDoc("privacy")}>
                Privacy Policy
              </button>
              <button type="button" className="linkish" onClick={() => setOpenDoc("terms")}>
                Terms &amp; Conditions
              </button>
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

      <LegalDialogs openDoc={openDoc} onClose={() => setOpenDoc(null)} />
    </footer>
  );
}
