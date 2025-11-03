import type { CollectionEntry, DataEntryMap } from "astro:content"

export interface FrontmatterImage {
  alt: string
  src: {
    height: number
    src: string
    width: number
    format: 'avif' | 'png' | 'webp' | 'jpeg' | 'jpg' | 'svg' | 'tiff' | 'gif'
  }
}

export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface GitHubActivityDay {
  date: string
  count: number
  level: number
}

export interface GitHubActivityWeek extends Array<GitHubActivityDay | undefined> {}

export interface GitHubActivityMonthLabel {
  weekIndex: number
  label: string
}

export interface GitHubActivityApiResponse {
  total: {
    [year: number]: number
    lastYear: number
  }
  contributions: GitHubActivityDay[]
  error?: string
}

// Content store types
export type Post = CollectionEntry<"posts">;
export type Project = CollectionEntry<"projects">;
export type TagName = string;
export type TagSlug = string;
export type SeriesName = string;
export type SeriesSlug = string;

export interface TagData {
  name: TagName;
  slug: TagSlug;
  postsCount: number;
  projectsCount: number;
  totalCount: number;
}

export interface SeriesData {
  name: SeriesName;
  slug: SeriesSlug;
  postsCount: number;
}

export interface ContentData {
  sortedPosts: Post[];
  sortedProjects: Project[];
  allTags: TagData[];
  postTags: TagData[];
  projectTags: TagData[];
  allSeries: SeriesData[];
  postBySlug: Map<string, Post>;
  projectBySlug: Map<string, Project>;
  tagNameBySlug: Map<TagSlug, TagName>;
  seriesNameBySlug: Map<SeriesSlug, SeriesName>;
  postsByTag: Map<TagSlug, Post[]>;
  projectsByTag: Map<TagSlug, Project[]>;
  postsBySeries: Map<SeriesSlug, Post[]>;
}

export type ContentCollectionType = keyof Pick<DataEntryMap, "projects" | "posts">;
export type CombinedEntry = (CollectionEntry<"posts"> | CollectionEntry<"projects">) & { type: string };

export interface TagStats {
  name: string;
  slug: string;
  postCount: number;
  projectCount: number;
  totalCount: number;
}

export interface SeriesStats {
  name: string;
  slug: string;
  postCount: number;
}