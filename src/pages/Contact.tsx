import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { contact, profile } from '@/data/content';

/**
 * Contact is a list of ways to reach Harsha, not a form.
 *
 * A form on a static site can only ever hand off to the visitor's mail client,
 * which is the same thing the email link does with two fewer steps — so the
 * links are the whole page.
 */
export default function Contact() {
  const channels = [
    {
      Icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: 'Best way to reach me — I read everything.',
      primary: true,
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

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* -------------------------------------------------------------- */}
          {/* Invitation                                                      */}
          {/* -------------------------------------------------------------- */}
          {/* min-w-0 lets the grid track size itself rather than being floored
              by the widest item's min-content. */}
          <Reveal className="min-w-0">
            <div>
              <p className="font-body text-xl leading-relaxed text-teal">
                I'd genuinely like to hear from you.
              </p>

              <p className="mt-5 font-body text-base leading-relaxed text-teal">
                Whether you're hiring, want a second pair of eyes on something you're building,
                or just want to argue about whether a console app really needs role-based access
                — pick whichever of these suits you. I'm quickest on email.
              </p>

              <div className="mt-8 border-t border-sage pt-6">
                <p className="flex items-start gap-3 font-body text-sm leading-relaxed text-terracotta">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-ink" aria-hidden="true" />
                  {/* workRights is not lowercased — it contains "Australian". */}
                  <span>
                    Based in {profile.location}, {profile.country}. {profile.availability.status}.{' '}
                    {profile.availability.workRights},{' '}
                    {profile.availability.sponsorship.toLowerCase()}.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* -------------------------------------------------------------- */}
          {/* Channels                                                        */}
          {/* -------------------------------------------------------------- */}
          <ul className="grid min-w-0 gap-4 sm:grid-cols-2">
            {channels.map(({ Icon, label, value, href, note, external, primary }, i) => (
              <Reveal
                as="li"
                key={label}
                index={i}
                step={0.08}
                duration={0.5}
                className={primary ? 'sm:col-span-2' : undefined}
              >
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full flex-col border border-sage bg-teal p-6 transition-transform duration-200 hover:-translate-y-1"
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
                    className={`mt-4 block wrap-anywhere font-display font-bold text-cream uppercase transition-colors group-hover:text-coral ${
                      primary ? 'text-2xl md:text-3xl' : 'text-xl'
                    }`}
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
      </div>
    </section>
  );
}
