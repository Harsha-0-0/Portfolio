# Portfolio — Harsha Varthini Maniraj

Personal portfolio site. Software engineer based in Sydney, Australia.

**Live sections:** Home · About · Skills · Projects · Education & Experience · Contact

---

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 6 |
| UI | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens) |
| Routing | Wouter |
| Animation | Framer Motion |
| Icons | Lucide React |
| Type | Barlow Condensed (display) + DM Sans (body), via Google Fonts |

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev      # dev server on http://localhost:3000
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Types only, no emit |

---

## Editing content

**All personal and professional data lives in one file: [`src/data/content.ts`](src/data/content.ts).**

No component hardcodes a job title, date, skill or project. When the CV changes,
that file is the only edit — pages read from it and lay themselves out.

It exports:

| Export | Holds |
|---|---|
| `profile` | Name, title, location, headline, strapline, availability, bio |
| `contact` | Email, phone, LinkedIn, GitHub, CV link |
| `roles` | Work and volunteer history, reverse chronological |
| `education` | Degrees, with optional honours |
| `skillGroups` | Skills, grouped by category |
| `projects` | Featured projects with tech stacks and repo links |
| `achievements`, `spokenLanguages` | Recognition and languages |
| `navLinks` | Nav structure — add a route here and in `App.tsx` |

The Education page merges `roles` and `education` into a single timeline and
sorts it by parsed start date, so entries just need a `"Mon YYYY"` string.

### Hiding the CV button

Set `contact.resumeUrl` to `null` and every "Download CV" affordance removes
itself rather than rendering a dead link.

---

## Design system

Tokens are defined once in [`src/index.css`](src/index.css) under `@theme`, and
consumed as Tailwind utilities (`bg-teal`, `text-coral-ink`, `border-sage`, …).

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FBE9D0` | Page canvas |
| `teal` | `#244855` | Body text on cream; dark card surfaces |
| `coral` | `#E64833` | Display type and non-text UI **only** |
| `coral-ink` | `#B33A28` | Small text and CTA fills |
| `terracotta` | `#874F41` | Supporting copy, editorial rules |
| `sage` | `#90AEAD` | Borders and decoration **only**, never text |

### Why two corals

`#E64833` measures **3.31:1** against cream. That clears WCAG AA for large text
(≥24px, or ≥18.66px bold) and for UI component boundaries, but **not** the 4.5:1
required for body copy. `#B33A28` measures **4.97:1** and carries anything set at
body size — including the CTA fill, where white-on-`#E64833` was only 3.93:1.

Sage is held to the same rule in reverse: at 1.97:1 on cream and 3.93:1 on teal
it is never used for text. Text on dark surfaces uses cream (7.7:1).

---

## Accessibility

- Skip link is the first tab stop on every route.
- Visible `:focus-visible` ring on every interactive element.
- `prefers-reduced-motion` honoured globally in CSS **and** per-component through
  Framer Motion's `useReducedMotion` — reveals, the timeline draw, the sliding
  nav indicator and the cursor all degrade to their final state.
- The accent cursor is additive: the native pointer stays visible, and it renders
  only for fine pointers.
- Mobile menu sets `aria-expanded` / `aria-controls`, closes on Escape, and
  returns focus to its trigger.
- `aria-current="page"` on the active nav link; per-route `<title>`.
- Project cards use a stretched link, so the whole card is clickable while the
  accessibility tree sees exactly one link per card.
- Contact form has real `<label for>` associations and an `aria-live` status.

Verified across `/`, `/about`, `/skills`, `/projects`, `/education`, `/contact`
and a 404 route at 375 / 768 / 1440 px: no horizontal overflow, one `<h1>` per
page, no unnamed controls, no unlabelled inputs, no heading-level jumps.

---

## Adding real images

Project cards and the hero portrait currently render generated geometric
artwork, so there are no broken image references. To use real assets:

1. Drop the file in `src/assets/`.
2. Import it and pass it through — `ProjectPlate` already accepts an optional
   `src` prop and swaps to an `<img>` when given one.

---

## Contact form

There is no backend. The form composes a `mailto:` draft in the visitor's own
mail client and says so on the page, rather than showing a "message sent"
confirmation for a message that was never sent.
