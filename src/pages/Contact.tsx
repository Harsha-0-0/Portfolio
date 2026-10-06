import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { contact } from '@/data/content';

/**
 * Contact is a list of ways to reach Harsha, not a form.
 *
 * A form on a static site can only ever hand off to the visitor's mail client,
 * which is the same thing the email link does with two fewer steps, so the
 * links are the whole page.
 */
export default function Contact() {
  const channels = [
    {
      Icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: 'Best way to reach me. I read everything.',
    },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      value: 'harsha-varthini-maniraj',
      href: contact.linkedin,
      note: 'Connect, or message me here.',
      external: true,
    },
    {
      Icon: Github,
      label: 'GitHub',
      value: contact.githubHandle,
      href: contact.github,
      note: 'Everything I build ends up here.',
      external: true,
    },
    {
      Icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phoneHref}`,
      note: 'Happy to talk if that is easier.',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <PageHeader index="06" eyebrow="Come say hello" title="Contact me on…" />

        {/* ------------------------------------------------------------------ */}
        {/* Channels                                                            */}
        {/* ------------------------------------------------------------------ */}
        {/* One card per way to reach Harsha, two across from sm up, so the four
            of them fill the page rather than sitting in a narrow column.
            min-w-0 lets each track size itself rather than being floored by the
            widest item's min-content. */}
        <ul className="grid min-w-0 gap-5 sm:grid-cols-2">
          {channels.map(({ Icon, label, value, href, note, external }, i) => (
            <Reveal as="li" key={label} index={i} step={0.08} duration={0.5}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col border border-sage bg-teal p-7 transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-coral" aria-hidden="true" />
                  <span className="font-body text-xs font-bold tracking-[0.2em] text-cream/80 uppercase">
                    {label}
                  </span>
                  <ArrowUpRight
                    className="ml-auto h-4 w-4 shrink-0 text-cream transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>

                <span
                  // wrap-anywhere, not break-words: only `anywhere` lets a long
                  // unbroken string like an email address reduce its
                  // min-content width, which is what keeps narrow screens from
                  // being forced wider than the viewport.
                  className="mt-4 block wrap-anywhere font-display text-xl font-bold text-cream uppercase transition-colors group-hover:text-coral md:text-2xl"
                >
                  {value}
                </span>

                <span className="mt-2 block font-body text-sm text-cream/85">{note}</span>

                {external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
