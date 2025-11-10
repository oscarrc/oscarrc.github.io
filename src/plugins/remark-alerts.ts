import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { h as _h, type Properties } from 'hastscript';
import type { Paragraph as P } from 'mdast';

/** From Astro Starlight: Function that generates an mdast HTML tree ready for conversion to HTML by rehype. */
function h(el: string, attrs: Properties = {}, children: any[] = []): P {
  const { properties, tagName } = _h(el, attrs);
  return {
    children,
    data: { hName: tagName, hProperties: properties },
    type: 'paragraph',
  };
}

// Icon mappings: hex codepoints as HTML entities (like Icon.astro)
const iconMap: Record<string, { icon: string; class: string }> = {
  info: {
    icon: '\uea74',
    class: 'alert-info',
  },
  error: {
    icon: '\uea87',
    class: 'alert-error',
  },
  success: {
    icon: '\uf05d',
    class: 'alert-success',
  },
  question: {
    icon: '\ueb32',
    class: '', // alert default (no class)
  },
  warning: {
    icon: '\uea74',
    class: 'alert-warning',
  },
};

// Supported alert types
const AlertTypes = new Set<string>(['info', 'error', 'success', 'warning', 'question']);

/** Checks if a string is a supported alert type. */
function isAlertType(s: string): boolean {
  return AlertTypes.has(s.toLowerCase());
}

export const remarkAlerts: Plugin<[], Root> = () => (tree) => {
  visit(tree, (node, index, parent) => {
    if (!parent || index === undefined || node.type !== 'containerDirective') return;

    const alertType = (node as any).name;
    if (!isAlertType(alertType)) return;

    const config = iconMap[alertType];
    if (!config) return;

    // Build class array, filtering out empty strings
    const classArray = ['alert', config.class, 'alert-soft', 'my-4'].filter(Boolean);
    const alertClass = classArray.join(' ');
    const iconChar = config.icon;

    // Create the icon span with raw HTML node (like Icon.astro uses set:html)
    const iconSpan = h(
      'span',
      {
        class: 'text-2xl',
      },
      [{ type: 'text', value: iconChar }],
    );

    // Create the content span with all the children
    const contentSpan = h('span', {}, (node as any).children || []);

    // Create the alert div with class as array (hastscript handles arrays better)
    const alert = h(
      'div',
      {
        role: 'alert',
        class: alertClass,
      },
      [iconSpan, contentSpan],
    );

    parent.children[index] = alert;
  });
};

export default remarkAlerts;

