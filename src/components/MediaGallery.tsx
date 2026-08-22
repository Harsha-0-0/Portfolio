import type { MediaItem } from '@/data/content';

/**
 * Renders screenshots and clips for a project or an achievement.
 *
 * Returns null when there is nothing to show, so callers can drop it in
 * unconditionally and the surrounding layout stays clean while media is still
 * being gathered.
 */
export default function MediaGallery({
  items,
  className = '',
  tone = 'dark',
}: {
  items?: MediaItem[];
  className?: string;
  /** Surface the gallery sits on, so captions stay legible on both. */
  tone?: 'dark' | 'light';
}) {
  if (!items || items.length === 0) return null;

  const captionClass = tone === 'dark' ? 'text-cream/85' : 'text-terracotta';

  return (
    <ul
      className={`grid gap-4 ${items.length > 1 ? 'sm:grid-cols-2' : ''} ${className}`}
    >
      {items.map((item) => (
        <li key={item.src} className="flex flex-col">
          <figure className="m-0 flex flex-1 flex-col">
            <div className="overflow-hidden border border-sage bg-teal">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  // Never autoplay: it hijacks the page and burns mobile data.
                  preload="metadata"
                  aria-label={item.alt}
                  className="block h-auto w-full"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              )}
            </div>
            {item.caption && (
              <figcaption className={`mt-2 font-body text-xs ${captionClass}`}>
                {item.caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
