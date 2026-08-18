import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Logo from "../brand/Logo";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { cn } from "../../lib/utils";
import { nav, contact, whatsappLink } from "../../data/site";
import { useActiveSection, useScrolled, useScrollLock, useScrollToSection } from "../../lib/hooks";
import { EASE_EXPO } from "../../lib/motion";

const navIds = nav.map((item) => item.id);

export default function Header() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(navIds);
  const scrollTo = useScrollToSection();
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollLock(menuOpen);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  const go = (id) => (event) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-md focus:bg-volt-500 focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-line bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_40px_-24px_rgba(0,0,0,1)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled ? "h-16" : "h-20 lg:h-24",
            )}
          >
            <a
              href="#home"
              onClick={go("home")}
              aria-label="Ramdhenu Studios — home"
              className="rounded-sm"
            >
              <Logo size={scrolled ? "sm" : "md"} className="transition-all duration-500" />
            </a>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3.5 py-2 font-display text-[0.8125rem] font-medium tracking-[-0.005em] transition-colors duration-200",
                      isActive ? "text-mist-50" : "text-mist-400 hover:text-mist-50",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ duration: 0.45, ease: EASE_EXPO }}
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-linear-to-r from-volt-500/0 via-volt-400 to-volt-500/0"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={contact.phoneHref}
                className="hidden items-center gap-2 rounded-md px-3 py-2 font-mono text-xs text-mist-400 transition-colors hover:text-volt-300 xl:inline-flex"
              >
                <Icon name="phone" className="h-3.5 w-3.5" />
                {contact.phoneLabel}
              </a>

              <Button to="contact" size="sm" className="sm:h-11 sm:px-5 sm:text-[0.875rem]">
                Let&apos;s Talk
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-mist-50 transition-colors hover:border-line-volt hover:text-volt-300 lg:hidden"
              >
                <Icon name={menuOpen ? "close" : "menu"} />
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress — a 1.5px hairline, not a loading bar */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-[1.5px] origin-left bg-linear-to-r from-volt-600 via-volt-400 to-spark"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="fixed inset-0 z-40 bg-ink-950/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col pt-28 pb-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.06 + index * 0.045 }}
                    className="flex items-baseline justify-between border-b border-line py-4 font-display text-2xl font-semibold tracking-[-0.03em] text-mist-50"
                  >
                    {item.label}
                    <span className="font-mono text-[0.625rem] tracking-widest text-mist-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.4 }}
                className="mt-auto flex flex-col gap-3 pt-10"
              >
                <Button to="contact" size="lg" onClick={() => setMenuOpen(false)} className="w-full">
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
                  className="w-full"
                >
                  Chat on WhatsApp
                </Button>
                <a
                  href={contact.phoneHref}
                  className="mt-2 text-center font-mono text-xs tracking-wider text-mist-400"
                >
                  {contact.phoneLabel}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
