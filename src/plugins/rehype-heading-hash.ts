import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

const rehypeHeadingHash: RehypePlugin = () => {
  return function (tree: any) {
    visit(tree, 'element', (node: any) => {
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const level = parseInt(node.tagName.charAt(1));
        const hashSymbol = '#'.repeat(level);
        
        if (node.children && node.children.length > 0) {
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
          
          node.children.unshift(hashNode);
        }
      }
    });
  };
};

export default rehypeHeadingHash;

