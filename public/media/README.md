# Media

Drop screenshots, photos and video clips for projects and achievements in this
folder, then reference them from `src/data/content.ts`.

Always wrap the path in `asset()` — it applies the deploy base path, so the file
resolves both locally and on GitHub Pages:

```ts
media: [
  {
    type: 'image',
    src: asset('media/misinfo-composer.png'),
    alt: 'The campaign composer screen',
    caption: 'Phase 2 — the composer',
  },
  {
    type: 'video',
    src: asset('media/misinfo-demo.mp4'),
    poster: asset('media/misinfo-poster.jpg'),
    alt: 'Two-minute walkthrough',
  },
],
```

A hardcoded `"/media/foo.png"` works locally and 404s on Pages. Use `asset()`.

## Notes

- **`alt` is required.** Describe what the image shows. For video it is a short
  label. Empty alt on a meaningful image makes it invisible to screen readers.
- **Formats:** `.jpg` / `.png` / `.webp` for stills, `.mp4` (H.264) for video —
  it is the one format that plays everywhere.
- **Give videos a `poster`.** Without one the card shows a black rectangle until
  the viewer presses play.
- **Size them before committing.** These are served as-is: nothing resizes or
  compresses them. Aim for screenshots under ~300 KB and clips under ~10 MB, and
  keep the repo well clear of GitHub's 100 MB per-file hard limit.
- Videos never autoplay, and are set to `preload="metadata"` so a page visit
  does not pull down the whole file.

Anything left out simply does not render — a project with no `media` shows no
gallery, and the achievement block stays text-only.
