import { motion, useReducedMotion } from 'framer-motion';
import { Images, Maximize2 } from 'lucide-react';
import ProjectPlate from './ProjectPlate';
import type { Project } from '@/data/content';

/**
 * Compact project card: cover, name and tech stack only.
 *
 * Everything else — full description, links, gallery, documents — lives behind
 * the detail dialog this opens.
 *
 * The trigger is a real <button> stretched across the card with an ::after
 * overlay, rather than a button wrapping the whole thing: <button> only accepts
 * phrasing content, so nesting the <h2> and the tech list inside one would be
 * invalid HTML and would flatten the heading out of the accessibility tree.
 * This way pointer, keyboard and touch all reach the same control, and the card
 * still exposes a proper heading.
 */
export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const mediaCount = project.media?.length ?? 0;

  // Explicit cover wins; otherwise borrow the first gallery image, so adding
  // media alone is enough to give a card a real picture. Falls through to the
  // generated plate when there is neither.
  const firstImage = project.media?.find((item) => item.type === 'image');
  const cover = project.cover ?? (firstImage && { src: firstImage.src, alt: '' });

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
      {...cardMotion}
      className="group relative flex flex-col border border-teal bg-teal text-cream transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(36_72_85/0.9)] focus-within:shadow-[0_18px_40px_-24px_rgb(36_72_85/0.9)]"
    >
      {/* Cover ------------------------------------------------------------ */}
      <div className="relative aspect-4/3 overflow-hidden border-b border-sage">
        <ProjectPlate
          name={project.name}
          index={index}
          src={cover?.src}
          alt={cover?.alt ?? ''}
        />

        <span
          aria-hidden="true"
          className="absolute top-0 left-0 z-10 bg-coral px-3 py-1.5 font-body text-xs font-bold tracking-widest text-white"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {project.context && (
          <span className="absolute right-0 bottom-0 z-10 max-w-[75%] bg-teal/90 px-3 py-1.5 text-right font-body text-[0.65rem] font-bold tracking-[0.14em] text-cream uppercase">
            {project.context}
          </span>
        )}

        {mediaCount > 0 && (
          <span className="absolute top-0 right-0 z-10 flex items-center gap-1.5 bg-teal/90 px-2.5 py-1.5 font-body text-[0.65rem] font-bold tracking-[0.14em] text-cream uppercase">
            <Images className="h-3.5 w-3.5" aria-hidden="true" />
            {mediaCount}
            <span className="sr-only">
              {mediaCount === 1 ? 'image or video' : 'images or videos'}
            </span>
          </span>
        )}

        {/* Hover/focus preview — a visual affordance only. The button's own
            label already tells assistive tech what activating it does. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col justify-end bg-teal/85 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <p className="font-body text-sm leading-snug text-cream italic">{project.tagline}</p>
          <p className="mt-3 flex items-center gap-2 font-body text-xs font-bold tracking-[0.15em] text-coral uppercase">
            <Maximize2 className="h-3.5 w-3.5" />
            View details
          </p>
        </div>
      </div>

      {/* Body ------------------------------------------------------------- */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-display text-3xl leading-none font-bold text-cream uppercase">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left transition-colors after:absolute after:inset-0 after:content-[''] hover:text-coral focus-visible:text-coral"
          >
            {project.name}
            <span className="sr-only"> — view details</span>
          </button>
        </h2>

        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="border border-sage px-2.5 py-1 font-body text-xs font-medium tracking-wide text-cream"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
