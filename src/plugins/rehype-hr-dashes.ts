import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

const rehypeHrDashes: RehypePlugin = () => {
  return function (tree: any) {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'hr') {
        node.tagName = 'div';
        node.properties = {
          ...node.properties,
          class: 'hr-dashes',
          style: 'width: 100%; text-align: center; color: var(--color-neutral); margin: 2rem 0; overflow: hidden; white-space: nowrap;',
        };
        
        node.children = [
          {
            type: 'text',
            value: '-'.repeat(1000), // Very long string to ensure it spans any width
          },
        ];
      }
    });
  };
};

export default rehypeHrDashes;

