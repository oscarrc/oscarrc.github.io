import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

const rehypeListMarkers: RehypePlugin = () => {
  return function (tree: any) {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'ul') {
        if (node.children) {
          node.children.forEach((liNode: any) => {
            if (liNode.tagName === 'li' && liNode.children && liNode.children.length > 0) {
              const markerNode = {
                type: 'element',
                tagName: 'span',
                properties: {
                  class: 'list-marker',
                  style: 'display: inline;',
                },
                children: [
                  {
                    type: 'text',
                    value: '> ',
                  },
                ],
              };
              liNode.children.unshift(markerNode);
            }
          });
        }
      }
      
      if (node.tagName === 'ol') {
        let itemIndex = 0;
        if (node.children) {
          node.children.forEach((liNode: any) => {
            if (liNode.tagName === 'li') {
              itemIndex++;
              if (liNode.children && liNode.children.length > 0) {
                const markerNode = {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    class: 'list-marker',
                    style: 'display: inline;',
                  },
                  children: [
                    {
                      type: 'text',
                      value: `${itemIndex}> `,
                    },
                  ],
                };
                liNode.children.unshift(markerNode);
              }
            }
          });
        }
      }
    });
  };
};

export default rehypeListMarkers;

