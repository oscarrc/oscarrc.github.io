import { FeatureExtractionPipeline, pipeline } from "@huggingface/transformers";
import { mkdir, writeFile } from "node:fs/promises";
import { posts, projects } from "@/utils/collections";

import type { CombinedEntry } from "@/types";
import { dirname } from "node:path";

const OUTPUT_FILE = "public/embeddings/index.json";

const entries = [...posts, ...projects];

const normalizeVector = (vector: Float32Array): Float32Array => {
  let len = Math.hypot(...vector);
  if (!len) return vector;
  return new Float32Array(vector.map(x => x / len));
}

const dotProduct = (a: Float32Array, b: Float32Array): number => {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

const stripMarkdown = (text: string): string => {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\((.*?)\)/g, '$1') // Remove links but keep text
    .replace(/[`*_>~]/g, '') // Remove markdown symbols
    .replace(/#+\s/g, '') // Remove headings
    .trim();
}

const formatValue = (value: any): string | null => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return null;
}

const getEntryText = (entry: CombinedEntry): string => {
  const parts: string[] = [];

  Object.keys(entry).forEach(key => {    
    const value = (entry as any)[key];

    if (key === 'data') {
      Object.keys(value).forEach(dataKey => {
        const metadata = value[dataKey];
        const formattedValue = formatValue(metadata);
        if (formattedValue) {
          parts.push(`${dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}: ${formattedValue}`);
        }
      });

      return;
    };

    const formattedValue = formatValue(value);
    if (formattedValue) {
      parts.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${formattedValue}`);
    }
  });

  return parts.join('\n');
}

const generateEmbeddings = async (doc: string, extractor: FeatureExtractionPipeline): Promise<Float32Array> => {
  const embeddings = await extractor(doc, { pooling: "mean", normalize: false });

  const data = embeddings.data instanceof Float32Array 
    ? embeddings.data 
    : new Float32Array(embeddings.data as ArrayLike<number>);
  
  return normalizeVector(data);
}

export const getContentEmbeddings = async () => {
  console.log(`Generating embeddings for ${entries.length} entries...`);
  const extractor = await pipeline("feature-extraction", "sentence-transformers/all-MiniLM-L6-v2");
  const embeddingsMap = new Map<string, { id: string; slug: string; collection: string; content: string; embeddings: Float32Array }>();
  
  const embeddingsPromises = entries.map(async (entry) => {
    const rawText = getEntryText(entry as CombinedEntry);
    const text = stripMarkdown(rawText);
    const embeddingsEntry = {
      id: entry.id,
      slug: entry.data.slug,
      collection: entry.collection,
      content: rawText,
      embeddings: await generateEmbeddings(text, extractor),
    };
    embeddingsMap.set(entry.data.slug, embeddingsEntry);

    return embeddingsEntry;
  });
  
  const embeddings = await Promise.all(embeddingsPromises);
  
  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, JSON.stringify(embeddings, null, 2));

  return embeddingsMap;
}

const embeddings = await getContentEmbeddings();

export const getSimilarEntries = async (slug: string, topK: number = 5, collection?: string) => {
  const entry = embeddings.get(slug);

  if (!entry || (collection && entry.collection !== collection)) return [];

  const similarities = [...embeddings.values()].map(e => {
    if (e.slug === slug && (!collection || e.collection === collection)) {
      return { ...e, similarity: -1 };
    }

    if (collection && e.collection !== collection) {
      return { ...e, similarity: -1 };
    }

    const similarity = dotProduct(entry.embeddings, e.embeddings);
    const { embeddings: _, ...rest } = e;
    return { ...rest, similarity };
  });

  similarities.sort((a, b) => b.similarity - a.similarity);

  return similarities.slice(0, topK);
};