// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkReadingTime from './src/plugins/remark-reading-time';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    plugins: [tailwindcss()]
  },
  image: {
    responsiveStyles: true,
  },
  prefetch: true,
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    sitemap(), 
    mdx()
  ]
});