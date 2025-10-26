// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkReadingTime from './src/plugins/remark-reading-time';
import siteConfig from './src/site.config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
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