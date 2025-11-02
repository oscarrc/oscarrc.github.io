import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

const rehypeHeadingHash: RehypePlugin = () => {
  return function (tree: any) {
    visit(tree, 'element', (node: any) => {
      // Check if it's a heading element (h1, h2, h3, etc.)
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const level = parseInt(node.tagName.charAt(1));
        const hashSymbol = '#'.repeat(level);
        
        // Add the hash symbol before the heading text
        if (node.children && node.children.length > 0) {
          // Create a text node with the hash symbol and space
          const hashNode = {
            type: 'element',
            tagName: 'span',
            children: [
              {
                type: 'text',
                value: hashSymbol + ' ',
              },
            ],
          };
          
          // Insert the hash node at the beginning
          node.children.unshift(hashNode);
        }
      }
    });
  };
};

export default rehypeHeadingHash;

