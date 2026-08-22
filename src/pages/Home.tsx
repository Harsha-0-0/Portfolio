import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileText, MapPin } from 'lucide-react';
import { contact, profile } from '@/data/content';

export default function Home() {
  const reduced = useReducedMotion();
  const { headline, availability } = profile;

  const textMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  const portraitMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* ------------------------------------------------------------------ */}
      {/* Decorative geometry                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full border border-sage/60 opacity-70 md:h-[26rem] md:w-[26rem]" />
        <div className="absolute top-1/3 -left-16 h-48 w-48 rounded-full border border-terracotta/60 opacity-60" />
        <div className="absolute right-[12%] bottom-24 hidden h-24 w-24 rotate-45 border border-coral/50 lg:block" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-sage/40" />
      </div>

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* ---------------------------------------------------------------- */}
        {/* Copy                                                              */}
        {/* ---------------------------------------------------------------- */}
        <motion.div {...textMotion}>
          <p className="eyebrow mb-6 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}, {profile.country}
          </p>

          <h1
            className="font-display font-black text-teal uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              lineHeight: 0.78,
              letterSpacing: '-0.045em',
            }}
          >
            {headline.lead} <span className="text-coral">{headline.highlight}</span>{' '}
            {/* The space above keeps the accessible name "Fuel ideas with code."
                rather than running the words together across the line break. */}
            <br />
            {headline.trail}
          </h1>

          <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-teal md:text-lg">
            {profile.strapline}
          </p>

          {/* Availability — the single most useful fact for a recruiter, so it
              gets its own block rather than being buried in the about page. */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-xs font-bold tracking-[0.12em] uppercase">
            <li className="bg-teal px-3 py-2 text-cream">{availability.status}</li>
            <li className="border border-terracotta px-3 py-2 text-terracotta">
              {availability.workRights}
            </li>
            <li className="border border-terracotta px-3 py-2 text-terracotta">
              {availability.sponsorship}
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 bg-coral-ink px-7 py-4 font-body text-xs font-bold tracking-[0.15em] text-white uppercase transition-transform duration-200 hover:-translate-y-1"
            >
              See the work
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>

            {contact.resumeUrl && (
              <a
                href={contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-terracotta pb-1 font-body text-xs font-bold tracking-[0.15em] text-terracotta uppercase transition-colors hover:border-coral-ink hover:text-coral-ink"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Download CV
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Portrait                                                          */}
        {/* ---------------------------------------------------------------- */}
        <motion.div {...portraitMotion} className="relative mx-auto w-full max-w-sm lg:mx-0">
          {/* Offset frame. The outward extent is trimmed on small screens so it
              stays inside the gutter instead of being clipped by the section's
              overflow-hidden. */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 translate-x-1.5 translate-y-1.5 border border-sage sm:-inset-4 sm:translate-x-3 sm:translate-y-3"
          />
          <div className="relative aspect-4/5 border-2 border-teal bg-teal">
            {/* Replace with a real photo: drop me.jpg into src/assets/, then
                import it and render <img src={me} alt="" /> in place of this. */}
            <svg
              viewBox="0 0 320 400"
              className="h-full w-full"
              role="img"
              aria-label={`${profile.name}, ${profile.title}`}
            >
              <circle cx="240" cy="96" r="86" fill="#90AEAD" opacity="0.2" />
              <circle cx="240" cy="96" r="52" fill="none" stroke="#E64833" strokeWidth="1.5" />
              <circle cx="76" cy="310" r="64" fill="#874F41" opacity="0.35" />
              <path d="M0 268 H320" stroke="#90AEAD" strokeWidth="1" opacity="0.5" />
              <text
                x="160"
                y="228"
                textAnchor="middle"
                fill="#FBE9D0"
                fontFamily="Barlow Condensed, sans-serif"
                fontSize="118"
                fontWeight="900"
                letterSpacing="-6"
              >
                HVM
              </text>
              <text
                x="160"
                y="300"
                textAnchor="middle"
                fill="#FBE9D0"
                fontFamily="DM Sans, sans-serif"
                fontSize="13"
                fontWeight="700"
                letterSpacing="4"
              >
                SOFTWARE ENGINEER
              </text>
            </svg>
          </div>

          {/* mt-8 clears the offset frame's lower edge rather than sitting on it. */}
          <p className="relative mt-8 font-body text-xs tracking-[0.2em] text-terracotta uppercase">
            {profile.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
