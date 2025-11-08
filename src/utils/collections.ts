import type { TagStats, SeriesStats, ContentCollectionType, CombinedEntry } from "@/types";
import {
  getCollection,
  getEntry,
  type CollectionEntry,
} from "astro:content";
import { slug as slugify } from "github-slugger";

/* -------------------------------------------------------
 * Helpers
 * -----------------------------------------------------*/

export const sortByDate = <T extends { data: { updated?: Date; published: Date } }>(
  a: T,
  b: T
) => {
  const dateA = a.data.updated ?? a.data.published;
  const dateB = b.data.updated ?? b.data.published;
  return dateB.getTime() - dateA.getTime();
};

const addToGroup = <T>(map: Map<string, T[]>, key: string, item: T) => {
  const list = map.get(key) ?? [];
  list.push(item);
  map.set(key, list);
};

const addToTagStats = (
  tagStats: Map<string, TagStats>,
  tagSlug: string,
  tag: string,
  type: "post" | "project"
) => {
  const stat = tagStats.get(tagSlug) ?? {
    name: tag,
    slug: tagSlug,
    postCount: 0,
    projectCount: 0,
    totalCount: 0,
  };
  if (type === "post") stat.postCount++;
  else stat.projectCount++;
  stat.totalCount++;
  tagStats.set(tagSlug, stat);
};

const addToSeriesStats = (
  seriesStats: Map<string, SeriesStats>,
  seriesSlug: string,
  series: string
) => {
  const stat = seriesStats.get(seriesSlug) ?? {
    name: series,
    slug: seriesSlug,
    postCount: 0,
  };
  stat.postCount++;
  seriesStats.set(seriesSlug, stat);
};

/* -------------------------------------------------------
 * Fetch and preprocess collections
 * -----------------------------------------------------*/

const [projects, posts] = await Promise.all([
  getCollection("projects"),
  getCollection("posts"),
]);

const sortedProjects = projects.flatMap((p) => ( 
  p.data.draft ? [] : [{ ...p, data: { ...p.data, slug: slugify(p.data.title) } }]
)).sort(sortByDate);

const sortedPosts = posts.flatMap((p) => ( 
  p.data.draft ? [] : [{ ...p, data: { ...p.data, slug: slugify(p.data.title) } }]
)).sort(sortByDate);

/* -------------------------------------------------------
 * Index by slug
 * -----------------------------------------------------*/

const collectionsBySlug: Record<ContentCollectionType, Map<string, CollectionEntry<ContentCollectionType>>> = {
  projects: new Map(sortedProjects.map((p) => [p.data.slug, p])),
  posts: new Map(sortedPosts.map((p) => [p.data.slug, p])),
};

export const getCollectionBySlug = (
  collection: ContentCollectionType
) => {
  return collectionsBySlug[collection];
}

export const getEntryBySlug = async (
  collection: ContentCollectionType,
  entrySlug: string
) => {
  return collectionsBySlug[collection].get(entrySlug);
};

/* -------------------------------------------------------
 * Aggregation
 * -----------------------------------------------------*/

function aggregateContent(
  posts: CollectionEntry<"posts">[],
  projects: CollectionEntry<"projects">[]
) {
  const tagStatsMap = new Map<string, TagStats>();
  const seriesStatsMap = new Map<string, SeriesStats>();

  // --- Maps keyed by name ---
  const tagsByName = new Map<string, string>();
  const seriesByName = new Map<string, string>();

  // --- Maps keyed by slug ---
  const postsByTag = new Map<string, CollectionEntry<"posts">[]>();         // key: tagSlug
  const projectsByTag = new Map<string, CollectionEntry<"projects">[]>();   // key: tagSlug
  const postsBySeries = new Map<string, CollectionEntry<"posts">[]>();      // key: seriesSlug
  const contentByTag = new Map<string, CombinedEntry[]>(); // key: tagSlug

  // --- Posts ---
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const tagSlug = slugify(tag);
      addToTagStats(tagStatsMap, tagSlug, tag, "post");
      addToGroup(postsByTag, tagSlug, post);
      addToGroup(contentByTag, tagSlug, { ...post, type: "posts" });
      tagsByName.set(tag, tagSlug);
    }

    if (post.data.series) {
      const series = post.data.series;
      const seriesSlug = slugify(series);
      addToSeriesStats(seriesStatsMap, seriesSlug, series);
      addToGroup(postsBySeries, seriesSlug, post);
      seriesByName.set(series, seriesSlug);
    }
  }

  // --- Projects ---
  for (const project of projects) {
    for (const tag of project.data.tags ?? []) {
      const tagSlug = slugify(tag);
      addToTagStats(tagStatsMap, tagSlug, tag, "project");
      addToGroup(projectsByTag, tagSlug, project);
      addToGroup(contentByTag, tagSlug, { ...project, type: "projects" });
    }
  }

  // Sort groups
  for (const [, list] of postsByTag) list.sort(sortByDate);
  for (const [, list] of projectsByTag) list.sort(sortByDate);
  for (const [, list] of postsBySeries) list.sort(sortByDate);
  for (const [, list] of contentByTag) list.sort(sortByDate);

  return {
    tagStatsMap,
    seriesStatsMap,
    tagsByName,
    seriesByName,
    postsByTag,
    projectsByTag,
    postsBySeries,
    contentByTag,
  };
}

/* -------------------------------------------------------
 * Compute all aggregations
 * -----------------------------------------------------*/

const {
  tagStatsMap,
  seriesStatsMap,
  tagsByName,
  seriesByName,
  postsByTag,
  projectsByTag,
  postsBySeries,
  contentByTag,
} = aggregateContent(sortedPosts, sortedProjects);

/* -------------------------------------------------------
 * Derived sorted arrays
 * -----------------------------------------------------*/

const allTags = Array.from(tagStatsMap.values()).sort(
  (a, b) => b.totalCount - a.totalCount
);
const postTags = allTags
  .filter((t) => t.postCount > 0)
  .sort((a, b) => b.postCount - a.postCount);
const projectTags = allTags
  .filter((t) => t.projectCount > 0)
  .sort((a, b) => b.projectCount - a.projectCount);
const postSeries = Array.from(seriesStatsMap.values()).sort(
  (a, b) => b.postCount - a.postCount
);

/* -------------------------------------------------------
 * Getters
 * -----------------------------------------------------*/

export const getTagBySlug = (slug: string) => tagStatsMap.get(slug);
export const getTagSlug = (name: string) => tagsByName.get(name);
export const getSeriesBySlug = (slug: string) => seriesStatsMap.get(slug);
export const getSeriesSlug = (name: string) => seriesByName.get(name);

export const getContentByTag = (tagSlug: string) => ({
  posts: postsByTag.get(tagSlug) ?? [],
  projects: projectsByTag.get(tagSlug) ?? [],
  all: contentByTag.get(tagSlug) ?? [],
});

export const getPostsBySeries = (seriesSlug: string) =>
  postsBySeries.get(seriesSlug) ?? [];

/* -------------------------------------------------------
 * Exports
 * -----------------------------------------------------*/

export {
  sortedPosts as posts,
  sortedProjects as projects,
  postsByTag,
  projectsByTag,
  postsBySeries,
  contentByTag,
  allTags,
  postTags,
  projectTags,
  postSeries,
};
