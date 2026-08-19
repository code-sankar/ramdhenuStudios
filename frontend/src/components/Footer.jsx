import { useState } from "react";
import Icon from "./Icon";
import LegalDialogs from "./LegalDialogs";
import Logo from "./Logo";
import { brand, contact, nav, socials } from "../data/site";

const colHead = "mb-3 block text-[11px] tracking-[0.1em] uppercase";
const linkCol = "flex flex-col gap-2.5";

export default function Footer() {
  const year = new Date().getFullYear();
  /* Privacy and Terms open in place — this is a one-page site, and two
     documents don't justify pulling in a router. */
  const [openDoc, setOpenDoc] = useState(null);

  return (
    <footer className="footer relative overflow-hidden bg-paper pt-[clamp(56px,7vw,96px)] [&_a]:text-inherit [&_a]:no-underline [&_a:hover]:text-steel-700">
      <div className="shell">
        <div className="grid gap-[clamp(32px,5vw,56px)] border-b border-line pb-[clamp(40px,6vw,72px)] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            {/* The lockup carries the tagline in the artwork itself, so a line
                of copy repeating it would only be redundant. */}
            <Logo variant="lockup" className="mb-4 h-[84px] w-[210px]" />
            <p className="text-muted mb-6 max-w-[260px] text-sm">{brand.description}</p>
            <div className="flex gap-2">
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
            <span className={`text-muted ${colHead}`}>Contact</span>
            <span className="mb-0.5 block text-[11px] tracking-[0.08em] text-steel-700 uppercase">
              Email
            </span>
            <a href={contact.emailHref} className="mb-3 block">
              {contact.email}
            </a>
            <span className="mb-0.5 block text-[11px] tracking-[0.08em] text-steel-700 uppercase">
              Phone
            </span>
            <a href={contact.phoneHref} className="mb-3 block">
              {contact.phone}
            </a>
            <span className="mb-0.5 block text-[11px] tracking-[0.08em] text-steel-700 uppercase">
              Studio
            </span>
            <span className="block">{contact.studio}</span>
          </div>

          <div>
            <span className={`text-muted ${colHead}`}>Company</span>
            <nav className={linkCol} aria-label="Footer">
              {nav.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className={`text-muted ${colHead}`}>Legal</span>
            <nav className={linkCol} aria-label="Legal">
              <button type="button" className="linkish text-left" onClick={() => setOpenDoc("privacy")}>
                Privacy Policy
              </button>
              <button type="button" className="linkish text-left" onClick={() => setOpenDoc("terms")}>
                Terms &amp; Conditions
              </button>
            </nav>
          </div>
        </div>

        <div className="text-muted flex flex-wrap justify-between gap-3 py-4 text-[13px]">
          <span>
            © {year} {brand.name}. All rights reserved.
          </span>
          <span>{brand.since}</span>
        </div>
      </div>

      {/* The wordmark, cropped by the page edge. */}
      <div className="pointer-events-none h-[clamp(60px,10vw,150px)] w-full overflow-hidden" aria-hidden="true">
        <span className="block translate-y-[18%] text-center font-display text-[clamp(90px,16vw,260px)] leading-none tracking-[-0.02em] text-mute-200">
          {brand.wordmark}
        </span>
      </div>

      <LegalDialogs openDoc={openDoc} onClose={() => setOpenDoc(null)} />
    </footer>
  );
}
