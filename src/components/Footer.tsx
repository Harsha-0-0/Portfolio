import { Github, Linkedin, Mail } from 'lucide-react';
import { contact, profile } from '@/data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: contact.github, label: 'GitHub', Icon: Github, external: true },
    { href: contact.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
    { href: `mailto:${contact.email}`, label: 'Email', Icon: Mail, external: false },
  ];

  return (
    <footer className="relative z-10 border-t border-sage bg-cream py-8">
      <div className="shell flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-body text-sm text-teal">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="mt-1 font-body text-xs text-terracotta">
            {profile.availability.summary}
          </p>
        </div>

        <ul className="flex items-center gap-5">
          {socials.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block text-terracotta transition-colors hover:text-coral-ink"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only-focusable">
                  {label}
                  {external ? ' (opens in a new tab)' : ''}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
