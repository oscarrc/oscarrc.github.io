import * as runtime from "react/jsx-runtime";

import { evaluate } from "@mdx-js/mdx";
import rehypeHighlight from 'rehype-highlight';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const parse = async (data) => {
    const evaluated = await evaluate(data, { 
        ...runtime, 
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter], 
        rehypePlugins: [[rehypeHighlight, {detect: true}]] 
    });
    return evaluated;
}

export { parse };