import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { navLinks } from '@/data/content';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <div className="shell">
        <p className="eyebrow mb-6">Error 404</p>

        <h1
          className="font-display font-black text-teal uppercase"
          style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', lineHeight: 0.8, letterSpacing: '-0.04em' }}
        >
          Dead <span className="text-coral">link</span>.
        </h1>

        <p className="mt-8 max-w-lg font-body text-lg text-teal">
          That page doesn't exist — which, to be fair, is exactly the kind of bug I'd want to fix.
          Here's everything that does exist:
        </p>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-1.5 border-b border-terracotta pb-1 font-body text-xs font-bold tracking-[0.15em] text-terracotta uppercase transition-colors hover:border-coral-ink hover:text-coral-ink"
              >
                {link.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
