import Logo from "../brand/Logo";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import { brand, contact, legal, nav, socials } from "../../data/site";
import { services } from "../../data/services";
import { useScrollToSection } from "../../lib/hooks";

export default function Footer() {
  const scrollTo = useScrollToSection();
  const year = new Date().getFullYear();

  const go = (id) => (event) => {
    event.preventDefault();
    scrollTo(id);
  };

  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(30,123,255,0.09),transparent)]"
      />

      <div className="shell relative">
        <Reveal className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mist-400">
              {brand.description}
            </p>
            <p className="mt-5 font-serif text-[1.0625rem] text-mist-500 italic">
              &ldquo;{brand.tagline}&rdquo;
            </p>

            <ul className="mt-8 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-line text-mist-400 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-volt hover:text-volt-300"
                  >
                    <Icon name={social.icon} className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="font-mono text-[0.625rem] tracking-[0.2em] text-mist-600 uppercase">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className="text-[0.875rem] text-mist-400 transition-colors hover:text-volt-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] tracking-[0.2em] text-mist-600 uppercase">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={go("services")}
                    className="text-[0.875rem] text-mist-400 transition-colors hover:text-volt-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] tracking-[0.2em] text-mist-600 uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-start gap-3 text-[0.875rem] text-mist-400 transition-colors hover:text-volt-300"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
                  {contact.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="flex items-start gap-3 text-[0.875rem] break-all text-mist-400 transition-colors hover:text-volt-300"
                >
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.875rem] text-mist-400">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
                <span>
                  {contact.location}
                  <span className="mt-1 block text-[0.8125rem] text-mist-600">
                    {contact.locationNote}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-[0.875rem] text-mist-400">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
                {contact.hours}
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-mist-600">
            © {year} {brand.name}. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.8125rem] text-mist-600 transition-colors hover:text-mist-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
