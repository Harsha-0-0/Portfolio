import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ProjectPlate from '@/components/ProjectPlate';
import { contact, projects } from '@/data/content';

export default function Projects() {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <PageHeader
          index="04"
          eyebrow="Selected work"
          title="Built to matter."
          action={
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-body text-xs font-bold tracking-[0.15em] text-terracotta uppercase transition-colors hover:text-coral-ink"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              All repos on GitHub
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only-focusable">(opens in a new tab)</span>
            </a>
          }
        />

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const cardMotion = reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 28 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-60px' },
                  transition: { duration: 0.5, delay: index * 0.1 },
                  whileHover: { y: -8 },
                };

            return (
              <motion.li
                key={project.slug}
                {...cardMotion}
                className="group relative flex flex-col border border-teal bg-teal text-cream transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(36_72_85/0.9)]"
              >
                {/* Cover -------------------------------------------------- */}
                <div className="relative aspect-4/3 overflow-hidden border-b border-sage">
                  <ProjectPlate name={project.name} index={index} />
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 bg-coral px-3 py-1.5 font-body text-xs font-bold tracking-widest text-white"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Context rides in the cover, not above the title — keeping
                      it out of the body flow means every card's title starts at
                      the same height across the row. */}
                  {project.context && (
                    <span className="absolute right-0 bottom-0 max-w-[75%] bg-teal/90 px-3 py-1.5 text-right font-body text-[0.65rem] font-bold tracking-[0.14em] text-cream uppercase">
                      {project.context}
                    </span>
                  )}
                </div>

                {/* Body --------------------------------------------------- */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-3xl leading-none font-bold text-cream uppercase">
                    {/* Stretched link: the whole card is clickable, but the
                        accessibility tree sees exactly one link per card. */}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-coral focus-visible:text-coral"
                    >
                      {project.name}
                      <span className="sr-only-focusable">
                        — view source on GitHub (opens in a new tab)
                      </span>
                    </a>
                  </h2>

                  <p className="mt-2 font-body text-sm text-cream/85 italic">{project.tagline}</p>

                  <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-cream/90">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="border border-sage px-2.5 py-1 font-body text-xs font-medium tracking-wide text-cream"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <p
                    aria-hidden="true"
                    className="mt-5 flex items-center gap-2 border-t border-sage pt-4 font-body text-xs font-bold tracking-[0.15em] text-cream uppercase transition-colors group-hover:text-coral"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View source
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
