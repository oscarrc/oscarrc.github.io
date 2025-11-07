import { basename, dirname, extname, join } from "node:path";
import { env, pipeline } from "@huggingface/transformers";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

import matter from "gray-matter";

type EmbeddingVector = number[];

interface DocumentEmbedding {
  id: string;
  url: string;
  title: string;
  section: string;
  chunk: string;
  embedding: EmbeddingVector;
}

const CONTENT_DIR = "src/content";
const OUTPUT_FILE = "dist/embeddings/index.json";
const CHUNK_SIZE = 250;
const CHUNK_OVERLAP = 80;

env.allowLocalModels = true;
env.allowRemoteModels = true;
env.useBrowserCache = false;

interface ContentEntry {
  id: string;
  url: string;
  title: string;
  body: string;
}

interface Section {
  heading: string;
  content: string;
}

async function walkContent(dir: string, baseUrl = ""): Promise<ContentEntry[]> {
  const entries: ContentEntry[] = [];
  const dirents = await readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const fullPath = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      const nestedUrl = `${baseUrl}/${dirent.name}`.replace(/\/+/g, "/");
      entries.push(...(await walkContent(fullPath, nestedUrl)));
      continue;
    }

    if (extname(dirent.name) !== ".md") {
      continue;
    }

    const file = await readFile(fullPath, "utf-8");
    const parsed = matter(file);
    const body = parsed.content;

    if (!body.trim()) {
      continue;
    }

    const slug = basename(dirent.name, ".md");
    let url = `${baseUrl}`.replace(/\/+/g, "/");
    if (slug !== "index") {
      url = `${url}/${slug}`;
    }
    if (!url.startsWith("/")) {
      url = `/${url}`;
    }
    url = url.replace(/\/+/g, "/");

    entries.push({
      id: fullPath,
      url,
      title: parsed.data.title ?? slug,
      body,
    });
  }

  return entries;
}

function splitIntoSections(markdown: string, defaultHeading: string): Section[] {
  const sections: Section[] = [];
  const lines = markdown.split(/\r?\n/);
  let currentHeading = defaultHeading;
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    sections.push({ heading: currentHeading, content: buffer.join("\n").trim() });
    buffer = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s+(.*)$/);
    if (headingMatch) {
      flush();
      currentHeading = headingMatch[1].trim() || defaultHeading;
      continue;
    }
    buffer.push(line);
  }

  flush();

  if (!sections.length) {
    sections.push({ heading: defaultHeading, content: markdown });
  }

  return sections;
}

function normalizeMarkdown(markdown: string): string {
  const withoutCode = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ");

  const withoutImages = withoutCode.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  const withLinkText = withoutImages.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  return withLinkText
    .replace(/[*_~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function chunkSection(section: Section): Array<{ heading: string; text: string }> {
  const normalized = normalizeMarkdown(section.content);
  if (!normalized) {
    return [];
  }

  const chunks: Array<{ heading: string; text: string }> = [];
  let start = 0;

  while (start < normalized.length) {
    const end = Math.min(start + CHUNK_SIZE, normalized.length);
    const chunk = normalized.slice(start, end).trim();
    if (chunk.length) {
      chunks.push({ heading: section.heading, text: chunk });
    }
    if (end === normalized.length) {
      break;
    }
    start = Math.max(end - CHUNK_OVERLAP, 0);
  }

  return chunks;
}

async function main() {
  console.log("Generating embeddings...");

  const embed = (await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  )) as unknown as (
    input: string,
    options: { pooling: "mean"; normalize: boolean }
  ) => Promise<{ data: Float32Array }>;

  const documents = await walkContent(CONTENT_DIR);
  console.log(`Found ${documents.length} markdown entries`);

  const output: DocumentEmbedding[] = [];

  for (const doc of documents) {
    const sections = splitIntoSections(doc.body, doc.title);
    for (const section of sections) {
      const chunks = chunkSection(section);
      for (let index = 0; index < chunks.length; index++) {
        const chunk = chunks[index];
        const compositeText = `Title: ${doc.title}\nSection: ${chunk.heading}\nContent: ${chunk.text}`;
        const result = await embed(compositeText, {
          pooling: "mean",
          normalize: true,
        });

        const embedding = Array.from(result.data as Float32Array);

        output.push({
          id: `${doc.id}#${section.heading}#${index}`,
          url: doc.url,
          title: doc.title,
          section: chunk.heading,
          chunk: compositeText,
          embedding,
        });
      }
    }
  }

  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`Wrote ${output.length} chunk embeddings to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("Failed to generate embeddings", error);
  process.exitCode = 1;
});

