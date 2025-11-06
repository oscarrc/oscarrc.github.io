import alpinejs from '@astrojs/alpinejs';
// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import rehypeHeadingHash from './src/plugins/rehype-heading-hash';
import rehypeHrDashes from './src/plugins/rehype-hr-dashes';
import rehypeListMarkers from './src/plugins/rehype-list-markers';
import remarkFrontmatterMeta from './src/plugins/remark-frontmatter-meta';
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
    remarkPlugins: [remarkReadingTime, remarkFrontmatterMeta],
    rehypePlugins: [rehypeHeadingHash, rehypeHrDashes, rehypeListMarkers],
  },
  integrations: [
    sitemap(),
    expressiveCode({
      themes: ['catppuccin-mocha'],
      useDarkModeMediaQuery: false,
      defaultProps: {
        wrap: false,
      },
      plugins: [pluginLineNumbers()]
    }),
    mdx(),
    alpinejs()
  ],
});