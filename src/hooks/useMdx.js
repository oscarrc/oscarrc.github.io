import * as runtime from "react/jsx-runtime";

import { evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const useMDX = () => {
  const parseMDX = async (data, extra) => {
    const evaluated = await evaluate(data, { ...runtime, remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] });
    extra && Object.keys(extra).forEach( e => evaluated[e] = extra[e] );
    return evaluated;
  }

  return { parseMDX }
}

export default useMDX;