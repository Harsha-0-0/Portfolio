import { motion, useReducedMotion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Heart } from 'lucide-react';
import MediaGallery from '@/components/MediaGallery';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { achievements, education, roles } from '@/data/content';

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

/** Turns "Jun 2026" into a sortable number. Unparseable input sorts last. */
function toSortKey(value: string): number {
  const match = /^([A-Za-z]{3})\s+(\d{4})$/.exec(value.trim());
  if (!match) return 0;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  return Number(match[2]) * 12 + (month === -1 ? 0 : month);
}

interface TimelineItem {
  id: string;
  title: string;
  organisation: string;
  location: string;
  period: string;
  kind: 'work' | 'education' | 'volunteer';
  current: boolean;
  detail: string[];
  note?: string;
  sortKey: number;
}

const ICONS = { work: Briefcase, education: GraduationCap, volunteer: Heart };

export default function Education() {
  const reduced = useReducedMotion();

  const items: TimelineItem[] = [
    ...roles.map((role) => ({
      id: `${role.organisation}-${role.title}`,
      title: role.title,
      organisation: role.organisation,
      location: role.location,
      period: `${role.start} — ${role.end ?? 'Present'}`,
      kind: role.kind,
      current: role.end === null,
      detail: role.highlights,
      sortKey: toSortKey(role.start),
    })),
    ...education.map((entry) => ({
      id: entry.institution,
      title: entry.qualification,
      organisation: entry.institution,
      location: entry.location,
      period: `${entry.start} — ${entry.end}`,
      kind: 'education' as const,
      current: false,
      detail: [],
      note: entry.honours,
      sortKey: toSortKey(entry.start),
    })),
  ].sort((a, b) => b.sortKey - a.sortKey);

  return (
    <section className="py-20 md:py-24">
      <div className="shell">
        <PageHeader index="05" eyebrow="How I got here" title="The long version." />

        {/* ---------------------------------------------------------------- */}
        {/* Timeline                                                          */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative mx-auto max-w-3xl">
          {/* Rail. Sits at the far left on mobile, centred from md up. */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[15px] w-px bg-sage md:left-1/2 md:-translate-x-1/2"
          >
            {!reduced && (
              <motion.div
                className="w-full origin-top bg-coral"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            )}
          </div>

          <ol className="space-y-10">
            {items.map((item, index) => {
              const Icon = ICONS[item.kind];
              const alignRight = index % 2 === 1;

              return (
                <Reveal
                  as="li"
                  key={item.id}
                  index={index}
                  step={0.12}
                  duration={0.5}
                  className="relative pl-12 md:pl-0"
                >
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-sage bg-teal md:left-1/2 md:-translate-x-1/2"
                  >
                    <Icon className="h-4 w-4 text-cream" />
                  </span>

                  {/* Entries alternate sides on desktop, but text stays
                      left-aligned on both — right-aligned multi-line bullets
                      are markedly harder to read. */}
                  <div
                    className={`md:w-[calc(50%-2.5rem)] ${
                      alignRight ? 'md:ml-auto' : 'md:mr-auto'
                    }`}
                  >
                    <p className="font-body text-xs font-bold tracking-[0.18em] text-coral-ink uppercase">
                      {item.period}
                      {item.current && (
                        <span className="ml-2 bg-teal px-2 py-0.5 text-cream">Current</span>
                      )}
                    </p>

                    <h2 className="mt-2 font-display text-2xl leading-tight font-bold text-teal uppercase">
                      {item.title}
                    </h2>

                    <p className="mt-1 font-body text-sm font-semibold text-teal">
                      {item.organisation}
                      <span className="font-normal text-terracotta"> · {item.location}</span>
                      {item.kind === 'volunteer' && (
                        <span className="font-normal text-terracotta"> · Volunteer</span>
                      )}
                    </p>

                    {item.note && (
                      <p className="mt-2 inline-block border border-terracotta px-2 py-1 font-body text-xs font-bold tracking-wide text-terracotta uppercase">
                        {item.note}
                      </p>
                    )}

                    {item.detail.length > 0 && (
                      <ul className="mt-3 space-y-2 font-body text-sm leading-relaxed text-teal">
                        {item.detail.map((line, i) => (
                          <li key={i} className="relative pl-4">
                            <span
                              aria-hidden="true"
                              className="absolute top-[0.6em] left-0 h-1 w-1 bg-coral"
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Achievements                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="mx-auto mt-20 max-w-3xl border-t border-terracotta pt-10">
          <Reveal>
            <h2 className="flex items-center gap-3 font-display text-3xl font-bold text-teal uppercase">
              <Award className="h-6 w-6 text-coral-ink" aria-hidden="true" />
              Recognition
            </h2>
          </Reveal>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {achievements.map((achievement, index) => (
              <Reveal as="li" key={achievement.title} index={index} step={0.1}>
                <div className="h-full border-l-2 border-coral pl-4">
                  <p className="font-body text-xs font-bold tracking-[0.18em] text-coral-ink uppercase">
                    {achievement.year}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-teal uppercase">
                    {achievement.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-teal">
                    {achievement.detail}
                  </p>
                  {/* Photos or clips, when there are any — renders nothing otherwise. */}
                  <MediaGallery items={achievement.media} tone="light" className="mt-4" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
