import { useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, FileText, Github, X } from 'lucide-react';
import MediaGallery from './MediaGallery';
import type { Project } from '@/data/content';

/**
 * Full detail view for a project.
 *
 * Built on the native <dialog> element deliberately: showModal() gives a real
 * focus trap, Escape-to-close, inert background content and a backdrop for
 * free — all things a hand-rolled overlay tends to get subtly wrong.
 */
export default function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (project && !node.open) node.showModal();
    if (!project && node.open) node.close();
  }, [project]);

  // Keep React state in step with Escape and any native close.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleClose = () => onClose();
    node.addEventListener('close', handleClose);
    return () => node.removeEventListener('close', handleClose);
  }, [onClose]);

  const linkClass =
    'inline-flex items-center gap-2 border-b border-sage pb-1 font-body text-xs font-bold tracking-[0.15em] text-cream uppercase transition-colors hover:border-coral hover:text-coral';

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      // Clicking the backdrop (the dialog element itself, outside the panel)
      // dismisses — a convention people expect from modals.
      onClick={(event) => {
        if (event.target === ref.current) ref.current?.close();
      }}
      className="m-auto w-[min(52rem,calc(100vw-2rem))] max-h-[min(46rem,calc(100dvh-2rem))] overflow-y-auto border border-sage bg-teal p-0 text-cream backdrop:bg-teal/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              {project.context && (
                <p className="font-body text-xs font-bold tracking-[0.16em] text-cream/85 uppercase">
                  {project.context}
                </p>
              )}
              <h2
                id="project-dialog-title"
                className="mt-1 font-display text-4xl leading-none font-bold text-cream uppercase"
              >
                {project.name}
              </h2>
              <p className="mt-2 font-body text-sm text-cream/85 italic">{project.tagline}</p>
            </div>

            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={`Close ${project.name} details`}
              className="-mt-1 -mr-1 shrink-0 p-2 text-cream transition-colors hover:text-coral"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-6 font-body text-base leading-relaxed text-cream/90">
            {project.description}
          </p>

          <h3 className="mt-8 font-body text-xs font-bold tracking-[0.2em] text-cream/80 uppercase">
            Built with
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="border border-sage px-2.5 py-1 font-body text-xs font-medium tracking-wide text-cream"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.media && project.media.length > 0 && (
            <>
              <h3 className="mt-8 font-body text-xs font-bold tracking-[0.2em] text-cream/80 uppercase">
                Gallery
              </h3>
              <MediaGallery items={project.media} className="mt-3" />
            </>
          )}

          {project.docs && project.docs.length > 0 && (
            <>
              <h3 className="mt-8 font-body text-xs font-bold tracking-[0.2em] text-cream/80 uppercase">
                Read more
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {project.docs.map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      {doc.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-sage pt-6">
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Github className="h-4 w-4" aria-hidden="true" />
              View source
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
