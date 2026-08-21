import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { contact, profile } from '@/data/content';

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  /**
   * There is no backend, so rather than showing a fake "message sent"
   * confirmation the form hands off to the visitor's mail client with the
   * fields pre-filled. It tells the truth about what actually happened.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus(
      `Opening your email app with a draft to ${contact.email}. If nothing happens, email me directly.`,
    );
  }

  const channels = [
    { Icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { Icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phoneHref}` },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      value: 'harsha-varthini-maniraj',
      href: contact.linkedin,
      external: true,
    },
    {
      Icon: Github,
      label: 'GitHub',
      value: contact.githubHandle,
      href: contact.github,
      external: true,
    },
  ];

  const fieldClass =
    'w-full border-0 border-b border-sage bg-transparent pb-2 font-body text-base text-cream placeholder:text-cream/50 focus:border-coral focus:outline-none';
  const labelClass =
    'mb-2 block font-body text-xs font-bold tracking-[0.18em] text-cream uppercase';

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <PageHeader index="06" eyebrow="Start a conversation" title="Make contact." />

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* -------------------------------------------------------------- */}
          {/* Direct channels                                                 */}
          {/* -------------------------------------------------------------- */}
          <Reveal>
            <div>
              <p className="font-body text-lg leading-relaxed text-teal">
                I'm in {profile.location} and{' '}
                <strong className="font-semibold">
                  {profile.availability.status.toLowerCase()}
                </strong>
                . {profile.availability.workRights}, {profile.availability.sponsorship.toLowerCase()}
                . If you're hiring, or just want to talk about something you're building, the
                fastest route is email.
              </p>

              <ul className="mt-10 space-y-5">
                {channels.map(({ Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 border-b border-sage pb-4 transition-colors hover:border-coral-ink"
                    >
                      <Icon
                        className="h-5 w-5 shrink-0 text-coral-ink"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-body text-xs font-bold tracking-[0.18em] text-terracotta uppercase">
                          {label}
                        </span>
                        <span className="block truncate font-body text-base text-teal transition-colors group-hover:text-coral-ink">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      {external && (
                        <span className="sr-only-focusable">(opens in a new tab)</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* -------------------------------------------------------------- */}
          {/* Form                                                            */}
          {/* -------------------------------------------------------------- */}
          <Reveal index={1}>
            <form
              onSubmit={handleSubmit}
              className="border border-sage bg-teal p-6 md:p-8"
              noValidate={false}
            >
              <h2 className="font-display text-2xl font-bold text-cream uppercase">
                Send a message
              </h2>
              <p className="mt-2 font-body text-sm text-cream/85">
                This opens a draft in your own email app — nothing is sent from this page.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you working on?"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group mt-8 inline-flex items-center gap-3 bg-coral-ink px-7 py-4 font-body text-xs font-bold tracking-[0.15em] text-white uppercase transition-transform duration-200 hover:-translate-y-1"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Compose email
              </button>

              {/* Announced to screen readers the moment it appears. */}
              <p
                role="status"
                aria-live="polite"
                className="mt-4 min-h-[1.25rem] font-body text-sm text-cream"
              >
                {status}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
