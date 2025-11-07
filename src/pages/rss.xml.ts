import { posts, projects, sortByDate } from '@/utils/collections';

import type { AstroGlobal } from 'astro';
import type { CollectionEntry } from 'astro:content';
import rss from '@astrojs/rss';
import siteConfig from '@/site.config';
import { slug } from 'github-slugger';

const sortedEntities: CollectionEntry<'projects' | 'posts'>[] = [...posts, ...projects].sort(sortByDate);

export async function GET(context: AstroGlobal) {
  return rss({
    stylesheet: '/rss.xsl',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.site,
    customData: `<name>${siteConfig.name}</name>`,
    items: sortedEntities.map((entity) => ({
      title: entity.data.title,
      pubDate: entity.data.updated ?? entity.data.published,
      description: entity.data.description,
      link: `/${entity.collection === 'posts' ? 'blog' : 'projects'}/${entity.data.slug}/`,
      guid: entity.data.slug,
      author: entity.data.author ?? siteConfig.name,
      language: 'en',
      customData: `
        <category>${entity.collection}</category>
        ${(entity as CollectionEntry<'posts'>).data.series ? `
          <series>
            <name>${(entity as CollectionEntry<'posts'>).data.series}</name>
            <link>/series/${slug((entity as CollectionEntry<'posts'>).data.series!)}</link>
          </series>
        ` : ''}
        ${entity.collection === 'projects' ? `<repo>${entity.data.repo}</repo>` : ''}
        <tags>${entity.data.tags.map((tag) => (
          `<tag>
            <name>${tag}</name>
            <link>/tags/${slug(tag)}/${entity.collection}</link>
          </tag>`
        )).join('')}</tags>
      `
    })),
  });
}