import { useEffect, useState } from "react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import Logo from "./Logo";
import { brand, nav } from "../data/site";

/**
 * Sticky header. Translucent paper ground with a blur, a hairline base rule,
 * and the one solid accent object on the bar — the primary button.
 */
export default function Header({ showAvailability = true }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  /* Highlight the section currently in view. */
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.3, 0.7, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header">
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav-brand" aria-label={`${brand.name} — home`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <div id="primary-nav" className="nav-links" data-open={open}>
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <span className="nav-spacer" />

        {showAvailability && (
          <span className="tag tag-outline availability">● Available for new projects</span>
        )}

        <Blueprint
          as="a"
          href="#contact"
          className="btn btn-primary nav-cta"
          style={{ position: "relative", textDecoration: "none", marginLeft: "var(--space-2)" }}
          onClick={() => setOpen(false)}
        >
          <Icon name="plus" size={14} strokeWidth={2} />
          Start a Project
        </Blueprint>

        <button
          type="button"
          className="btn btn-secondary btn-icon menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>
    </header>
  );
}
