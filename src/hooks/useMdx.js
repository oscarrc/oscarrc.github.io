import * as runtime from "react/jsx-runtime";

import { useEffect, useState } from "react";

import { evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const useMDX = (content) => {
  const [exports, setExports] = useState({ default: runtime.Fragment });

  useEffect(() => {
    evaluate(content, { ...runtime, remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }).then((exports) => setExports(exports));
  }, [content]);

  return exports;
}

export default useMDX;