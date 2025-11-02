import { getCollection, type CollectionEntry } from "astro:content";
import { slug } from "github-slugger";
import type {
  Post,
  Project,
  TagData,
  SeriesData,
  ContentData,
  TagName,
  TagSlug,
  SeriesName,
  SeriesSlug,
} from "@/types";

// Module-level cache - private to this module
let cachedData: ContentData | null = null;
let initializationPromise: Promise<ContentData> | null = null;

/**
 * Pure function to compute date for sorting
 */
const getDate = <T extends Post | Project>(item: T): number => {
  return new Date(item.data.updated || item.data.published).getTime();
};

/**
 * Pure function to sort by date (newest first)
 */
const sortByDate = <T extends Post | Project>(a: T, b: T): number => {
  return getDate(b) - getDate(a);
};

/**
 * Pure function to build tag data from collections
 */
const buildTagData = (
  posts: Post[],
  projects: Project[]
): {
  allTags: TagData[];
  postTags: TagData[];
  projectTags: TagData[];
  tagNameBySlug: Map<TagSlug, TagName>;
  postsByTag: Map<TagSlug, Post[]>;
  projectsByTag: Map<TagSlug, Project[]>;
} => {
  const tagCounts = new Map<string, { posts: Set<Post>; projects: Set<Project> }>();
  const tagNameBySlug = new Map<TagSlug, TagName>();
  const postsByTag = new Map<TagSlug, Post[]>();
  const projectsByTag = new Map<TagSlug, Project[]>();

  // Process posts tags
  posts.forEach((post) => {
    post.data.tags?.forEach((tagName) => {
      const tagSlug = slug(tagName);
      tagNameBySlug.set(tagSlug, tagName);

      if (!tagCounts.has(tagName)) {
        tagCounts.set(tagName, { posts: new Set(), projects: new Set() });
      }
      tagCounts.get(tagName)!.posts.add(post);

      if (!postsByTag.has(tagSlug)) {
        postsByTag.set(tagSlug, []);
      }
      postsByTag.get(tagSlug)!.push(post);
    });
  });

  // Process projects tags
  projects.forEach((project) => {
    project.data.tags?.forEach((tagName) => {
      const tagSlug = slug(tagName);
      tagNameBySlug.set(tagSlug, tagName);

      if (!tagCounts.has(tagName)) {
        tagCounts.set(tagName, { posts: new Set(), projects: new Set() });
      }
      tagCounts.get(tagName)!.projects.add(project);

      if (!projectsByTag.has(tagSlug)) {
        projectsByTag.set(tagSlug, []);
      }
      projectsByTag.get(tagSlug)!.push(project);
    });
  });

  // Sort tag relationships by date
  postsByTag.forEach((tagPosts) => {
    tagPosts.sort(sortByDate);
  });
  projectsByTag.forEach((tagProjects) => {
    tagProjects.sort(sortByDate);
  });

  // Build tag data arrays
  const allTagsData: TagData[] = [];
  const postTagsData: TagData[] = [];
  const projectTagsData: TagData[] = [];

  tagCounts.forEach((counts, tagName) => {
    const tagSlug = slug(tagName);
    const tagData: TagData = {
      name: tagName,
      slug: tagSlug,
      postsCount: counts.posts.size,
      projectsCount: counts.projects.size,
      totalCount: counts.posts.size + counts.projects.size,
    };

    if (counts.posts.size > 0) {
      postTagsData.push(tagData);
    }
    if (counts.projects.size > 0) {
      projectTagsData.push(tagData);
    }
    if (counts.posts.size > 0 || counts.projects.size > 0) {
      allTagsData.push(tagData);
    }
  });

  // Sort tags by count (descending)
  const sortTagsByCount = (a: TagData, b: TagData) => b.totalCount - a.totalCount;

  return {
    allTags: allTagsData.sort(sortTagsByCount),
    postTags: postTagsData.sort(sortTagsByCount),
    projectTags: projectTagsData.sort(sortTagsByCount),
    tagNameBySlug,
    postsByTag,
    projectsByTag,
  };
};

/**
 * Pure function to build series data from posts
 */
const buildSeriesData = (posts: Post[]): {
  allSeries: SeriesData[];
  seriesNameBySlug: Map<SeriesSlug, SeriesName>;
  postsBySeries: Map<SeriesSlug, Post[]>;
} => {
  const seriesCounts = new Map<string, Set<Post>>();
  const seriesNameBySlug = new Map<SeriesSlug, SeriesName>();
  const postsBySeries = new Map<SeriesSlug, Post[]>();

  posts.forEach((post) => {
    if (post.data.series) {
      const seriesName = post.data.series;
      const seriesSlug = slug(seriesName);
      seriesNameBySlug.set(seriesSlug, seriesName);

      if (!seriesCounts.has(seriesName)) {
        seriesCounts.set(seriesName, new Set());
      }
      seriesCounts.get(seriesName)!.add(post);

      if (!postsBySeries.has(seriesSlug)) {
        postsBySeries.set(seriesSlug, []);
      }
      postsBySeries.get(seriesSlug)!.push(post);
    }
  });

  // Sort series relationships by date
  postsBySeries.forEach((seriesPosts) => {
    seriesPosts.sort(sortByDate);
  });

  // Build series data array
  const seriesDataArray: SeriesData[] = [];
  seriesCounts.forEach((counts, seriesName) => {
    const seriesSlug = slug(seriesName);
    seriesDataArray.push({
      name: seriesName,
      slug: seriesSlug,
      postsCount: counts.size,
    });
  });

  // Sort series by count (descending)
  const sortedSeries = seriesDataArray.sort((a, b) => b.postsCount - a.postsCount);

  return {
    allSeries: sortedSeries,
    seriesNameBySlug,
    postsBySeries,
  };
};

/**
 * Pure function to initialize and compute all data
 * Called only once, then cached
 */
const initializeData = async (): Promise<ContentData> => {
  // Load raw collections
  const [allPostsRaw, allProjectsRaw] = await Promise.all([
    getCollection("posts"),
    getCollection("projects"),
  ]);

  // Filter out drafts
  const allPosts = allPostsRaw.filter((p) => !p.data.draft);
  const allProjects = allProjectsRaw.filter((p) => !p.data.draft);

  // Sort by date
  const sortedPosts = [...allPosts].sort(sortByDate);
  const sortedProjects = [...allProjects].sort(sortByDate);

  // Build slug maps
  const postBySlug = new Map<string, Post>();
  const projectBySlug = new Map<string, Project>();

  allPosts.forEach((post) => {
    postBySlug.set(slug(post.data.title), post);
  });
  allProjects.forEach((project) => {
    projectBySlug.set(slug(project.data.title), project);
  });

  // Build tag data
  const tagData = buildTagData(allPosts, allProjects);

  // Build series data
  const seriesData = buildSeriesData(allPosts);

  return {
    sortedPosts,
    sortedProjects,
    ...tagData,
    ...seriesData,
    postBySlug,
    projectBySlug,
  };
};

/**
 * Get cached data - lazy initialization with memoization
 * This ensures we only compute once, even if called multiple times concurrently
 */
const getCachedData = async (): Promise<ContentData> => {
  if (cachedData) {
    return cachedData;
  }

  if (!initializationPromise) {
    initializationPromise = initializeData().then((data) => {
      cachedData = data;
      return data;
    });
  }

  return initializationPromise;
};

// ==================== PUBLIC API ====================
// Pure accessor functions that work with cached data

/**
 * Get all posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<Post[]> {
  const data = await getCachedData();
  return data.sortedPosts;
}

/**
 * Get all projects sorted by date (newest first)
 */
export async function getAllProjects(): Promise<Project[]> {
  const data = await getCachedData();
  return data.sortedProjects;
}

/**
 * Get all tags from specified collections, sorted by count (descending)
 */
export async function getAllTags(): Promise<TagData[]> {
  const data = await getCachedData();
  return data.allTags;
}

/**
 * Get tags that appear in posts, sorted by count (descending)
 */
export async function getPostTags(): Promise<TagData[]> {
  const data = await getCachedData();
  return data.postTags;
}

/**
 * Get tags that appear in projects, sorted by count (descending)
 */
export async function getProjectTags(): Promise<TagData[]> {
  const data = await getCachedData();
  return data.projectTags;
}

/**
 * Get all series sorted by count (descending)
 */
export async function getAllSeries(): Promise<SeriesData[]> {
  const data = await getCachedData();
  return data.allSeries;
}

/**
 * Get posts by tag slug, sorted by date (newest first)
 */
export async function getPostsByTag(tagSlug: TagSlug): Promise<Post[]> {
  const data = await getCachedData();
  return data.postsByTag.get(tagSlug) || [];
}

/**
 * Get projects by tag slug, sorted by date (newest first)
 */
export async function getProjectsByTag(tagSlug: TagSlug): Promise<Project[]> {
  const data = await getCachedData();
  return data.projectsByTag.get(tagSlug) || [];
}

/**
 * Get posts by series slug, sorted by date (newest first)
 */
export async function getPostsBySeries(seriesSlug: SeriesSlug): Promise<Post[]> {
  const data = await getCachedData();
  return data.postsBySeries.get(seriesSlug) || [];
}

/**
 * Get post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const data = await getCachedData();
  return data.postBySlug.get(slug);
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const data = await getCachedData();
  return data.projectBySlug.get(slug);
}

/**
 * Get tag name by tag slug
 */
export async function getTagNameBySlug(tagSlug: TagSlug): Promise<TagName | undefined> {
  const data = await getCachedData();
  return data.tagNameBySlug.get(tagSlug);
}

/**
 * Get series name by series slug
 */
export async function getSeriesNameBySlug(seriesSlug: SeriesSlug): Promise<SeriesName | undefined> {
  const data = await getCachedData();
  return data.seriesNameBySlug.get(seriesSlug);
}

/**
 * Get all data for a specific tag
 */
export async function getTagData(tagSlug: TagSlug): Promise<{
  name: TagName | undefined;
  posts: Post[];
  projects: Project[];
  postsCount: number;
  projectsCount: number;
  totalCount: number;
}> {
  const data = await getCachedData();
  const posts = data.postsByTag.get(tagSlug) || [];
  const projects = data.projectsByTag.get(tagSlug) || [];
  return {
    name: data.tagNameBySlug.get(tagSlug),
    posts,
    projects,
    postsCount: posts.length,
    projectsCount: projects.length,
    totalCount: posts.length + projects.length,
  };
}

/**
 * Get all data for a specific series
 */
export async function getSeriesData(seriesSlug: SeriesSlug): Promise<{
  name: SeriesName | undefined;
  posts: Post[];
  postsCount: number;
}> {
  const data = await getCachedData();
  const posts = data.postsBySeries.get(seriesSlug) || [];
  return {
    name: data.seriesNameBySlug.get(seriesSlug),
    posts,
    postsCount: posts.length,
  };
}
