import type { RehypePlugin } from '@astrojs/markdown-remark';
import siteConfig from '../site.config';
import { visit } from 'unist-util-visit';

const rehypeExternalLinks: RehypePlugin = () => {
  return function (tree: any) {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string;
        
        // Check if link is external
        const isExternal = (() => {
          // Internal links: relative paths, hash links, or same domain
          if (href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:')) {
            return false;
          }
          
          // External links: http/https URLs that don't match the site domain
          if (href.startsWith('http://') || href.startsWith('https://')) {
            try {
              const url = new URL(href);
              const siteUrl = new URL(siteConfig.site);
              return url.hostname !== siteUrl.hostname;
            } catch {
              // Invalid URL, treat as external to be safe
              return true;
            }
          }
          
          // Other protocols (like tel:, etc.) are considered external
          if (href.includes('://')) {
            return true;
          }
          
          // Default: treat as internal (relative paths without leading slash)
          return false;
        })();

        if (isExternal) {
          // Add target="_blank"
          node.properties.target = '_blank';
          
          // Add or update rel attribute
          const existingRel = node.properties.rel || '';
          const relParts = Array.isArray(existingRel) 
            ? existingRel 
            : existingRel.split(' ').filter(Boolean);
          
          if (!relParts.includes('noreferrer')) {
            relParts.push('noreferrer');
          }
          if (!relParts.includes('noopener')) {
            relParts.push('noopener');
          }
          
          node.properties.rel = relParts.join(' ');
          
          // Add external link icon at the end
          if (node.children && Array.isArray(node.children)) {
            const iconNode = {
              type: 'element',
              tagName: 'span',
              properties: {
                'aria-hidden': 'true',
              },
              children: [
                {
                  type: 'text',
                  value: ' \uf08e',
                },
              ],
            };
            node.children.push(iconNode);
          }
        }
      }
    });
  };
};

export default rehypeExternalLinks;

