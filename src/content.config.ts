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

const skillsCollection = defineCollection({
  loader: glob({ pattern: ['*.json'], base: './src/content/skills' }),
  schema: z.object({
    skills: z.array(z.object({
      skill: z.string(),
      level: z.number().min(1).max(10),
      category: z.string(),
    })),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      cover: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      repo: z.string().optional(),
      url: z.string().url().optional(),
      active: z.boolean().optional().default(true),
    }),
})

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      cover: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
    }),
})

export const collections = {
  home: homeCollection,
  skills: skillsCollection,
  projects: projectsCollection,
  posts: postsCollection,
};