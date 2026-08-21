interface ProjectPlateProps {
  name: string;
  index: number;
  /** Optional real screenshot. Drop a file in src/assets/ and import it into
   *  the project record to replace the generated artwork. */
  src?: string;
}

/**
 * Generated cover art for a project card.
 *
 * The original design pointed at screenshot files. Rather than ship broken
 * image references for projects that have no screenshot, each card gets a
 * deterministic geometric composition built from the site palette — the layout
 * is chosen by index, so a given project always looks the same. Purely
 * decorative, so it is hidden from assistive tech; the card's heading carries
 * the meaning.
 */
export default function ProjectPlate({ name, index, src }: ProjectPlateProps) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />
    );
  }

  // Initials from the two most meaningful words: "Cap It Hot" -> CH, not CI.
  // A single-word name falls back to its first two letters: "HobbyWorld" -> HO.
  const STOPWORDS = new Set(['the', 'a', 'an', 'it', 'to', 'of', 'and', 'my', 'for']);
  const words = name.split(/\s+/).filter((word) => !STOPWORDS.has(word.toLowerCase()));
  const initials = (
    words.length > 1
      ? words.slice(0, 2).map((word) => word[0]).join('')
      : (words[0] ?? name).slice(0, 2)
  ).toUpperCase();

  const variant = index % 3;

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-teal transition-transform duration-500 group-hover:scale-105"
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        {variant === 0 && (
          <>
            <circle cx="310" cy="70" r="92" fill="#90AEAD" opacity="0.22" />
            <circle cx="310" cy="70" r="58" fill="none" stroke="#E64833" strokeWidth="1.5" />
            <path d="M0 232 L400 202" stroke="#90AEAD" strokeWidth="1" opacity="0.5" />
            <rect x="34" y="196" width="46" height="46" fill="#E64833" opacity="0.85" />
          </>
        )}
        {variant === 1 && (
          <>
            <rect
              x="228"
              y="34"
              width="132"
              height="132"
              fill="none"
              stroke="#90AEAD"
              strokeWidth="1.5"
              opacity="0.65"
            />
            <path d="M300 96 L352 148 L300 200 L248 148 Z" fill="#E64833" opacity="0.8" />
            <path d="M28 62 H150" stroke="#874F41" strokeWidth="2" />
            <path d="M28 250 H400" stroke="#90AEAD" strokeWidth="1" opacity="0.45" />
          </>
        )}
        {variant === 2 && (
          <>
            <circle cx="86" cy="238" r="74" fill="#874F41" opacity="0.4" />
            <circle cx="322" cy="96" r="40" fill="#E64833" opacity="0.75" />
            <path
              d="M0 150 Q 120 92 240 150 T 400 150"
              fill="none"
              stroke="#90AEAD"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <rect x="252" y="196" width="120" height="1" fill="#FBE9D0" opacity="0.4" />
          </>
        )}
      </svg>

      <span
        className="absolute inset-0 flex items-center justify-center font-display text-8xl font-black tracking-tighter text-cream/15 select-none"
        style={{ letterSpacing: '-0.05em' }}
      >
        {initials}
      </span>
    </div>
  );
}
