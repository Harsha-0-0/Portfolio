import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

/**
 * GitHub Pages serves a project repo from /<repo>/, so assets need that base.
 * Every other host (Vercel, Netlify, Cloudflare Pages) serves from the root, so
 * the base stays "/" unless the Pages workflow opts in via GITHUB_PAGES=true.
 * Keeping it env-driven means switching hosts later needs no code change.
 */
const base = process.env.GITHUB_PAGES === 'true' ? '/Portfolio/' : '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
