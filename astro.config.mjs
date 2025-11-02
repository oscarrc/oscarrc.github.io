// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkReadingTime from './src/plugins/remark-reading-time';
import rehypeHeadingHash from './src/plugins/rehype-heading-hash';
import rehypeHrDashes from './src/plugins/rehype-hr-dashes';
import rehypeListMarkers from './src/plugins/rehype-list-markers';
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
    rehypePlugins: [rehypeHeadingHash, rehypeHrDashes, rehypeListMarkers],
  },
  integrations: [
    sitemap(), 
    mdx()
  ]
});