import { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "./Icon";
import LegalDialogs from "./LegalDialogs";
import Logo from "./Logo";
import { industries } from "../data/industries";
import { industryPath, servicePath, workPath } from "../data/seo";
import { services } from "../data/services";
import { brand, contact, nav, navHref, socials } from "../data/site";
import { track } from "../lib/track";

/**
 * FOOTER — the site map, and the last chance to be useful.
 *
 * IT USED TO LINK TO ALMOST NOTHING. The old footer carried the seven nav items
 * and two legal documents, which meant it pointed at none of the six service
 * pages and none of the six industry pages — twelve of the site's twenty-one
 * routes, and the twelve that exist to rank. A footer on a site shaped like this
 * one is its map; the nav can only hold what fits across the top.
 *
 * FOUR GROUPS, WHICH IS ALSO WHY THE PHONE LAYOUT WORKS. Services, industries,
 * company and legal fall naturally into a two-by-two grid on a narrow screen —
 * where the old single column made a visitor scroll past thirty stacked links
 * to reach the copyright. Two columns halves that, and each group's heading
 * gives the eye somewhere to stop.
 *
 * THE BRAND BLOCK IS ITS OWN ROW RATHER THAN A FIFTH COLUMN. Beside the lists it
 * ran to twice their height, and a grid row is as tall as its tallest cell — so
 * a quarter of the footer sat empty to the right of Legal. Rows that each hold
 * one kind of thing are only ever as tall as that thing.
 *
 * IT STAYS ON THE LIGHT GROUND, AND THAT IS NOT A DEFAULT. Every page on this
 * site ends on a `bg-char-900` block — the contact section at home, the CTA on
 * every service, industry and project page. A dark footer would fuse with the
 * one above it into a single very tall slab with a seam nobody can find, which
 * is the same mistake as two identical bands touching. Light under dark gives
 * the page a floor.
 */

/* One group of links. The heading is coral rather than grey because it is the
   only thing separating four lists that are otherwise identical in weight. */
function Group({ title, children, className = "" }) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-display text-[11.5px] tracking-[0.14em] text-coral-700 uppercase">
        {title}
      </h2>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">{children}</ul>
    </div>
  );
}

/* A row rather than a bare link: the 44px target is the row, so a fingertip
   never lands in the gap between two of them. */
function Row({ to, href, onClick, children }) {
  const inner = <span className="footer-link">{children}</span>;
  return (
    <li>
      {to ? (
        <Link to={to} className="footer-row" onClick={onClick}>
          {inner}
        </Link>
      ) : (
        <a href={href} className="footer-row" onClick={onClick}>
          {inner}
        </a>
      )}
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  /* Privacy and Terms open in place — two documents do not justify two routes.
     `LegalDialogs` keeps both mounted so each can animate its own close. */
  const [openDoc, setOpenDoc] = useState(null);

  return (
    <footer className="footer relative overflow-hidden bg-paper">
      {/* The handoff. Every page arrives here off a dark block, and a hairline
          in the brand colour is what stops the change of ground reading as an
          accident. */}
      <div aria-hidden="true" className="footer-rule" />

      <div className="shell pt-[clamp(44px,6vw,80px)]">
        {/* ── The brand, and every way to reach us ──
            ITS OWN ROW RATHER THAN A FIFTH COLUMN, AND THAT IS A FIX. As a
            column beside the four lists it was twice their height, so the grid
            row stretched to fit it and left a dead quarter of the footer empty
            to the right of Legal. Split into rows, each one is only as tall as
            its own contents and nothing is ragged. */}
        <div className="flex flex-col gap-8 border-b border-line pb-[clamp(28px,4vw,44px)] lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-[38ch]">
            <Logo variant="lockup" className="mb-4 h-[72px] w-[180px]" />
            <p className="text-muted mb-5 text-sm leading-relaxed">
              {brand.description}
            </p>

            <div className="flex gap-2">
              {/* Until a real profile URL is set in site.js these render as
                  inert marks rather than `href="#"` — a dead anchor on a
                  sub-page jumps the reader to the top for no reason. */}
              {socials.map((social) =>
                social.href && social.href !== "#" ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={16} />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    className="footer-social opacity-40"
                    title={`${social.label} — add the profile URL in src/data/site.js`}
                  >
                    <Icon name={social.icon} size={16} />
                  </span>
                ),
              )}
            </div>
          </div>

          <dl className="m-0 grid gap-x-[clamp(24px,4vw,56px)] gap-y-5 text-[14.5px] sm:grid-cols-3 lg:pt-2">
            <div>
              <dt className="text-muted mb-1 text-[11px] tracking-[0.1em] uppercase">
                Email
              </dt>
              <dd className="m-0">
                <a href={contact.emailHref} className="footer-link">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted mb-1 text-[11px] tracking-[0.1em] uppercase">
                Phone
              </dt>
              <dd className="m-0">
                <a
                  href={contact.phoneHref}
                  onClick={() => track("Phone click", { from: "footer" })}
                  className="footer-link"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted mb-1 text-[11px] tracking-[0.1em] uppercase">
                Studio
              </dt>
              <dd className="text-muted m-0">{contact.studio}</dd>
            </div>
          </dl>
        </div>

        {/* ── The map ──
            Two columns on a phone, four on a laptop. The old footer stacked
            every one of these in a single column, which meant scrolling past
            thirty links to reach the copyright. */}
        <div className="grid grid-cols-2 gap-x-[clamp(16px,3vw,40px)] gap-y-[clamp(28px,4vw,44px)] border-b border-line py-[clamp(32px,4vw,52px)] lg:grid-cols-4">
          <Group title="Services">
            {services.map((service) => (
              <Row key={service.slug} to={servicePath(service.slug)}>
                {service.short}
              </Row>
            ))}
          </Group>

          <Group title="Industries">
            {industries.map((industry) => (
              <Row key={industry.slug} to={industryPath(industry.slug)}>
                {industry.short}
              </Row>
            ))}
          </Group>

          <Group title="Company">
            <Row to={workPath()}>Work</Row>
            {/* Services already has a column of its own, so the nav's dropdown
                entry would only point at a heading three columns to the left. */}
            {nav
              .filter((item) => !item.menu && item.path !== workPath())
              .map((item) => (
                <Row key={item.label} to={navHref(item)}>
                  {item.label}
                </Row>
              ))}
          </Group>

          <Group title="Legal">
            <li>
              <button
                type="button"
                className="footer-row"
                onClick={() => setOpenDoc("privacy")}
              >
                <span className="footer-link">Privacy Policy</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-row"
                onClick={() => setOpenDoc("terms")}
              >
                <span className="footer-link">Terms &amp; Conditions</span>
              </button>
            </li>
          </Group>
        </div>

        <div className="text-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-[13px]">
          <span>
            © {year} {brand.name}. All rights reserved.
          </span>
          <span>{brand.since}</span>
        </div>
      </div>

      {/* ── The wordmark, cropped by the page edge ──
          OUTLINED RATHER THAN FILLED, WHICH IS THE WHOLE DIFFERENCE. Set solid
          it was a large grey mass at the bottom of every page: too faint to read
          as type and too big to read as anything else. As an outline it becomes
          a drawn object rather than a smudge, it carries the brand colour
          without shouting, and the page behind it stays visible through the
          letters. See coral.css §10 for the `@supports` guard — a browser
          without text-stroke gets a tinted fill instead of nothing at all. */}
      <div
        className="pointer-events-none h-[clamp(56px,11vw,180px)] w-full overflow-hidden select-none"
        aria-hidden="true"
      >
        <span className="footer-wordmark">{brand.wordmark}</span>
      </div>

      <LegalDialogs openDoc={openDoc} onClose={() => setOpenDoc(null)} />
    </footer>
  );
}
