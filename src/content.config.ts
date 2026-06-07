import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      type: z.enum(['app', 'library']),
      url: z.url(),
      icon: image(),
      order: z.number().default(0)
    })
});

// Footer socials. The file() loader needs a unique `id` per entry, but the
// data we want to author is just name/url/icon — so derive `id` from `name`
// in the parser. getCollection() sorts by `id`, so also stamp `order` from
// the array index to keep the authored JSON order as the source of truth.
const socials = defineCollection({
  loader: file('./src/content/socials.json', {
    parser: (text) =>
      JSON.parse(text).map((social: Record<string, unknown>, order: number) => ({
        id: social.name,
        order,
        ...social
      }))
  }),
  schema: z.object({
    name: z.string(),
    url: z.url(),
    // SVG filename in src/assets/icons/social, resolved to a component at render time.
    icon: z.string(),
    order: z.number()
  })
});

export const collections = { projects, socials };
