import { getCollection, type CollectionEntry } from "astro:content"

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

export async function getSortedTags(collections: Array<"posts" | "projects">) {
  const tagsMap = new Map<string, number>();
  for (const collection of collections) {
    const items = await getCollection(collection);
    
    items.forEach(item => {
      item.data.tags?.forEach(tag => tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1));
    });
  }

  const sortedTags = Array.from(tagsMap).sort((a, b) => a[1] - b[1]);
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

  const sortedSeries = Array.from(seriesMap).sort((a, b) => a[1] - b[1]);
  return sortedSeries;
}
