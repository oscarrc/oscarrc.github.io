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