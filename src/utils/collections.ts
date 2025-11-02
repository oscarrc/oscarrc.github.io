import { getCollection, type CollectionEntry } from "astro:content"
import { slug } from "github-slugger"

export async function getSortedCollection(collection: "posts"): Promise<CollectionEntry<"posts">[]>
export async function getSortedCollection(collection: "projects"): Promise<CollectionEntry<"projects">[]>
export async function getSortedCollection(collection: "posts" | "projects") {
  return (await getCollection(collection))
    .filter((item) => !item.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.updated || b.data.published).getTime() -
        new Date(a.data.updated || a.data.published).getTime(),
    )
}

export async function getSortedCollectionByTag(
  collection: "posts",
  tagSlug: string
): Promise<CollectionEntry<"posts">[]>
export async function getSortedCollectionByTag(
  collection: "projects",
  tagSlug: string
): Promise<CollectionEntry<"projects">[]>
export async function getSortedCollectionByTag(
  collection: "posts" | "projects",
  tagSlug: string
) {
  const items = await getCollection(collection);
  
  return items
    .filter((item) => {
      if (item.data.draft) return false;
      if (!item.data.tags) return false;
      return item.data.tags.some(tag => slug(tag) === tagSlug);
    })
    .sort(
      (a, b) =>
        new Date(b.data.updated || b.data.published).getTime() -
        new Date(a.data.updated || a.data.published).getTime(),
    )
}

export async function getSortedTags(collections: Array<"posts" | "projects">) {
  const tagsMap = new Map<string, number>();
  for (const collection of collections) {
    const items = await getCollection(collection);
    
    items.forEach(item => {
      item.data.tags?.forEach(tag => {
        tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
      });
    });
  }


  const sortedTags = Array.from(tagsMap).sort((a, b) => b[1] - a[1]);
  
  return sortedTags;
}

export async function getSortedSeries(collection: "posts") {
  const seriesMap = new Map<string, number>();
  const items = await getCollection(collection);

  items.forEach(item => {
    if (!item.data.series) return;
    const series = item.data.series;
    seriesMap.set(series, (seriesMap.get(series) || 0) + 1);
  });

  const sortedSeries = Array.from(seriesMap).sort((a, b) => b[1] - a[1]);
  return sortedSeries;
}

export async function getSortedCollectionBySeries(
  collection: "posts",
  seriesSlug: string
): Promise<CollectionEntry<"posts">[]> {
  const items = await getCollection(collection);
  
  return items
    .filter((item) => {
      if (item.data.draft) return false;
      if (!item.data.series) return false;
      return slug(item.data.series) === seriesSlug;
    })
    .sort(
      (a, b) =>
        new Date(b.data.updated || b.data.published).getTime() -
        new Date(a.data.updated || a.data.published).getTime(),
    )
}
