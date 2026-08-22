import { useCallback, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import ProjectDialog from '@/components/ProjectDialog';
import { contact, projects } from '@/data/content';

export default function Projects() {
  // Track by slug rather than index so the open dialog survives any future
  // reordering or filtering of the list.
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  // Stable identity keeps the dialog's close listener from re-binding.
  const close = useCallback(() => setOpenSlug(null), []);

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
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          }
        />

        <p className="mb-10 max-w-xl font-body text-sm text-terracotta">
          Select a project to see the full write-up, links and any screenshots.
        </p>

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => setOpenSlug(project.slug)}
            />
          ))}
        </ul>
      </div>

      <ProjectDialog project={openProject} onClose={close} />
    </section>
  );
}
