import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { contact, navLinks } from '@/data/content';

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Escape closes the menu and returns focus to the button that opened it —
  // otherwise keyboard users are stranded with no way back.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-sage/60 transition-[padding,background-color] duration-300 ${
        scrolled ? 'bg-cream/95 py-3 backdrop-blur-md' : 'bg-cream/90 py-5'
      }`}
    >
      {/* No wordmark: the Home link carries the route, so a separate brand
          link would be a second control to the same place. */}
      <nav aria-label="Primary" className="shell flex items-center">
        {/* ---------------------------------------------------------------- */}
        {/* Desktop navigation                                                */}
        {/* ---------------------------------------------------------------- */}
        <ul className="hidden flex-1 items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = location === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-body text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                    active ? 'text-coral-ink' : 'text-teal hover:text-coral-ink'
                  }`}
                >
                  {link.label}
                </Link>
                {active &&
                  (reduced ? (
                    <span className="absolute -bottom-2 left-0 right-0 h-px bg-coral" />
                  ) : (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-coral"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ))}
              </li>
            );
          })}

          <li aria-hidden="true" className="ml-auto h-4 w-px bg-sage" />

          <li className="flex items-center gap-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal transition-colors hover:text-coral-ink"
            >
              <Github className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="sr-only">GitHub profile (opens in a new tab)</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal transition-colors hover:text-coral-ink"
            >
              <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
            </a>
          </li>
        </ul>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile toggle                                                     */}
        {/* ---------------------------------------------------------------- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="-mr-2 ml-auto p-2 text-teal transition-colors hover:text-coral-ink md:hidden"
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile menu                                                         */}
      {/* ------------------------------------------------------------------ */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-sage/60 bg-cream md:hidden"
        >
          <ul className="shell flex flex-col gap-5 py-6">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`font-body text-sm font-bold tracking-[0.16em] uppercase ${
                      active ? 'text-coral-ink' : 'text-teal'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="flex items-center gap-5 border-t border-sage/60 pt-5">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm font-bold tracking-[0.16em] text-teal uppercase"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm font-bold tracking-[0.16em] text-teal uppercase"
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Scroll progress. Decorative — the same information is available from
          the scrollbar, so it is hidden from assistive tech. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-coral"
        style={{ scaleX: reduced ? 0 : scaleX }}
      />
    </header>
  );
}
