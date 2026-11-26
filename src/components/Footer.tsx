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
    <footer className="relative z-10 border-t border-secondary bg-canvas py-8">
      <div className="shell flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-body text-sm text-ink">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="mt-1 font-body text-xs text-primary">
            {profile.availability.summary}
          </p>
        </div>

        <ul className="flex items-center gap-5">
          {socials.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block text-primary transition-colors hover:text-primary-deep"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">
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
