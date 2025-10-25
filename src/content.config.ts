import { defineCollection, z } from "astro:content";

import brand from "@/config/brand";
import { glob } from "astro/loaders";

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatar: z
        .object({
          src: image(),
          alt: z.string().optional().default(brand.name),
        })
        .optional(),
      github: z.string().optional(),
    }),
});

export const collections = {
  home: homeCollection,
};