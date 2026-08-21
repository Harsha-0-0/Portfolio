import { Briefcase, GraduationCap, Languages, MapPin, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { education, profile, spokenLanguages } from '@/data/content';

export default function About() {
  const facts = [
    {
      Icon: MapPin,
      label: 'Based in',
      value: `${profile.location}, ${profile.country}`,
      detail: 'Local, and staying local.',
    },
    {
      Icon: ShieldCheck,
      label: 'Work rights',
      value: profile.availability.workRights,
      detail: profile.availability.sponsorship + '.',
    },
    {
      Icon: Briefcase,
      label: 'Looking for',
      value: profile.availability.status,
      detail: 'Full-stack, backend or frontend — Sydney or hybrid.',
    },
    {
      Icon: GraduationCap,
      label: 'Education',
      value: education[0].qualification,
      detail: `${education[0].institution}, completed ${education[0].end}. ${education[0].honours ?? ''}`.trim(),
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="shell">
        <PageHeader index="02" eyebrow="Who you'd be hiring" title="The short version." />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* -------------------------------------------------------------- */}
          {/* Narrative                                                       */}
          {/* -------------------------------------------------------------- */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="space-y-6">
                {profile.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`font-body leading-relaxed text-teal ${
                      i === 0 ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="mt-10 border-t border-sage pt-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-teal">
                  <Languages className="h-5 w-5 text-coral-ink" aria-hidden="true" />
                  Languages
                </h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {spokenLanguages.map((language) => (
                    <li key={language.name} className="font-body text-sm text-teal">
                      <span className="font-semibold">{language.name}</span>
                      <span className="text-terracotta"> — {language.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Fact cards                                                      */}
          {/* -------------------------------------------------------------- */}
          <ul className="flex flex-col gap-4 lg:col-span-2">
            {facts.map(({ Icon, label, value, detail }, i) => (
              <Reveal as="li" key={label} index={i} step={0.15} from="right" duration={0.5}>
                <div className="h-full border border-sage bg-teal p-6">
                  <p className="flex items-center gap-2 font-body text-xs font-bold tracking-[0.2em] text-cream/80 uppercase">
                    <Icon className="h-4 w-4 text-coral" aria-hidden="true" />
                    {label}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight font-bold text-cream uppercase">
                    {value}
                  </p>
                  {detail && <p className="mt-2 font-body text-sm text-cream/85">{detail}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
