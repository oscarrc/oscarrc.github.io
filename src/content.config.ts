import { defineCollection, z } from "astro:content";

import config from "@/site.config";
import { glob } from "astro/loaders";

const homeCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: './src/content/home' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default(config.description),
      avatar: z
        .object({
          src: image(),
          alt: z.string().optional().default(config.name),
        })
        .optional(),
      github: z.string().optional(),
    }),
});

export const collections = {
  home: homeCollection,
};