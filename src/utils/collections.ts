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

const sortByDate = <T extends { data: { updated?: Date; published: Date } }>(
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
  tag: string,
  type: "post" | "project"
) => {
  const slug = slugify(tag);
  const stat = tagStats.get(slug) ?? {
    name: tag,
    slug,
    postCount: 0,
    projectCount: 0,
    totalCount: 0,
  };
  if (type === "post") stat.postCount++;
  else stat.projectCount++;
  stat.totalCount++;
  tagStats.set(slug, stat);
};

const addToSeriesStats = (
  seriesStats: Map<string, SeriesStats>,
  series: string
) => {
  const slug = slugify(series);
  const stat = seriesStats.get(slug) ?? {
    name: series,
    slug,
    postCount: 0,
  };
  stat.postCount++;
  seriesStats.set(slug, stat);
};

/* -------------------------------------------------------
 * Fetch and preprocess collections
 * -----------------------------------------------------*/

const [projects, posts] = await Promise.all([
  getCollection("projects"),
  getCollection("posts"),
]);

const sortedProjects = projects.filter((p) => !p.data.draft).sort(sortByDate);
const sortedPosts = posts.filter((p) => !p.data.draft).sort(sortByDate);

/* -------------------------------------------------------
 * Index by slug
 * -----------------------------------------------------*/

const collectionsBySlug: Record<ContentCollectionType, Map<string, string>> = {
  projects: new Map(sortedProjects.map((p) => [slugify(p.data.title), p.id])),
  posts: new Map(sortedPosts.map((p) => [slugify(p.data.title), p.id])),
};

export const getEntryBySlug = async (
  collection: ContentCollectionType,
  entrySlug: string
) => {
  const id = collectionsBySlug[collection].get(entrySlug);
  return id ? await getEntry(collection, id) : undefined;
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

  // --- Maps keyed by slug, NOT by name ---
  const postsByTag = new Map<string, CollectionEntry<"posts">[]>();         // key: tagSlug
  const projectsByTag = new Map<string, CollectionEntry<"projects">[]>();   // key: tagSlug
  const postsBySeries = new Map<string, CollectionEntry<"posts">[]>();      // key: seriesSlug
  const contentByTag = new Map<string, CombinedEntry[]>(); // key: tagSlug

  // --- Posts ---
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const tagSlug = slugify(tag);
      addToTagStats(tagStatsMap, tag, "post");
      addToGroup(postsByTag, tagSlug, post);
      addToGroup(contentByTag, tagSlug, { ...post, type: "post" });
    }

    if (post.data.series) {
      const series = post.data.series;
      const seriesSlug = slugify(series);
      addToSeriesStats(seriesStatsMap, series);
      addToGroup(postsBySeries, seriesSlug, post);
    }
  }

  // --- Projects ---
  for (const project of projects) {
    for (const tag of project.data.tags ?? []) {
      const tagSlug = slugify(tag);
      addToTagStats(tagStatsMap, tag, "project");
      addToGroup(projectsByTag, tagSlug, project);
      addToGroup(contentByTag, tagSlug, { ...project, type: "project" });
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
export const getSeriesBySlug = (slug: string) => seriesStatsMap.get(slug);

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
