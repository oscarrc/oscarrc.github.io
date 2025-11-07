/// <reference lib="WebWorker" />

import { pipeline, env } from "@huggingface/transformers";

declare const self: DedicatedWorkerGlobalScope & typeof globalThis;

type WorkerRequest =
  | { type: "init" }
  | { type: "ask"; id: string; question: string }
  | { type: "cancel"; id: string };

type WorkerResponse =
  | { type: "ready" }
  | { type: "status"; id: string; status: "retrieving" | "answering" }
  | { type: "result"; id: string; answer: string; sources: SourceSnippet[] }
  | { type: "error"; id: string; error: string };

type SourceSnippet = {
  docId?: string;
  url: string;
  title: string;
  section: string;
  score: number;
  snippet: string;
};

type GenerationPipeline = (
  input: string,
  options?: { max_new_tokens?: number; temperature?: number; repetition_penalty?: number }
) => Promise<Array<{ generated_text: string }>>;

type EmbeddingPipeline = (
  input: string,
  options?: { pooling?: "mean"; normalize?: boolean }
) => Promise<{ data: Float32Array | number[] | number[][] } & Record<string, unknown>>;

interface RawEmbeddingRecord {
  id: string;
  url: string;
  title: string;
  section: string;
  chunk: string;
  embedding: number[];
}

interface EmbeddingRecord {
  id: string;
  url: string;
  title: string;
  section: string;
  chunk: string;
  embedding: Float32Array;
}

env.allowLocalModels = false;
env.allowRemoteModels = true;
env.useBrowserCache = true;
if (env.backends?.onnx?.wasm) {
  env.backends.onnx.wasm.wasmPaths =
    "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6/dist/";
}

const EMBEDDING_INDEX_URL = "/embeddings/index.json";
const MAX_CONTEXT_CHUNKS = 6;
const MIN_SIMILARITY = 0.2;
const MAX_SNIPPET_LENGTH = 600;
const MIN_ANSWER_LENGTH = 80;

let generatorPromise: Promise<GenerationPipeline> | null = null;
let embeddingPipelinePromise: Promise<EmbeddingPipeline> | null = null;
let embeddingsPromise: Promise<EmbeddingRecord[]> | null = null;

const activeRequests = new Set<string>();

async function getGenerator(): Promise<GenerationPipeline> {
  if (!generatorPromise) {
    generatorPromise = pipeline(
      "text2text-generation",
      "Xenova/distilbart-cnn-6-6"
    ) as unknown as Promise<GenerationPipeline>;
  }
  return generatorPromise;
}

async function getEmbeddingPipeline(): Promise<EmbeddingPipeline> {
  if (!embeddingPipelinePromise) {
    embeddingPipelinePromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    ) as unknown as Promise<EmbeddingPipeline>;
  }
  return embeddingPipelinePromise;
}

async function loadEmbeddings(): Promise<EmbeddingRecord[]> {
  if (!embeddingsPromise) {
    embeddingsPromise = (async () => {
      const response = await fetch(`${EMBEDDING_INDEX_URL}?ts=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Failed to load embeddings index (${response.status})`);
      }
      const raw = (await response.json()) as RawEmbeddingRecord[];
      return raw.map((record) => ({
        ...record,
        embedding: Float32Array.from(record.embedding),
      }));
    })();
  }
  return embeddingsPromise;
}

function toFloat32(vector: Float32Array | number[] | number[][]): Float32Array {
  if (vector instanceof Float32Array) {
    return vector;
  }
  if (Array.isArray(vector) && typeof vector[0] === "number") {
    return Float32Array.from(vector as number[]);
  }
  if (Array.isArray(vector) && Array.isArray(vector[0])) {
    return Float32Array.from((vector as number[][]).flat());
  }
  throw new Error("Unsupported embedding format");
}

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let index = 0; index < length; index++) {
    const valueA = a[index];
    const valueB = b[index];
    dot += valueA * valueB;
    normA += valueA * valueA;
    normB += valueB * valueB;
  }
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function cleanGeneratedText(text: string): string {
  return text.replace(/^answer\s*:\s*/i, "").trim();
}

function extractContent(chunk: string): string {
  const contentMatch = chunk.match(/Content:\s*([\s\S]*)/i);
  if (contentMatch && contentMatch[1]) {
    return contentMatch[1].trim();
  }
  return chunk.trim();
}

function limitText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

async function buildContext(question: string) {
  const [embedder, records] = await Promise.all([getEmbeddingPipeline(), loadEmbeddings()]);

  if (!records.length) {
    return { context: "", sources: [] as SourceSnippet[] };
  }

  const embeddingOutput = await embedder(question, { pooling: "mean", normalize: true });
  const queryVector = toFloat32(embeddingOutput.data ?? []);

  const scored = records
    .map((record) => ({
      record,
      score: cosineSimilarity(record.embedding, queryVector),
    }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_CHUNKS);

  const baseSources: SourceSnippet[] = scored
    .filter(({ score }) => {
      const topScore = scored[0]?.score ?? 0;
      return score >= MIN_SIMILARITY || score >= topScore * 0.75;
    })
    .map(({ record, score }) => ({
      url: record.url,
      title: record.title,
      section: record.section,
      score,
      snippet: limitText(extractContent(record.chunk), MAX_SNIPPET_LENGTH),
    }));

  const includeProjects = /\bproject(s)?\b/i.test(question);
  const sourcesByUrl = new Map(baseSources.map((source) => [source.url, source]));

  if (includeProjects) {
    const projectDocs = new Map<string, SourceSnippet>();
    for (const record of records) {
      if (!record.url.includes("/projects/")) continue;
      if (projectDocs.has(record.url)) continue;
      projectDocs.set(record.url, {
        url: record.url,
        title: record.title,
        section: record.section,
        score: 0.25,
        snippet: limitText(extractContent(record.chunk), MAX_SNIPPET_LENGTH),
      });
    }

    for (const [url, source] of projectDocs) {
      if (!sourcesByUrl.has(url)) {
        baseSources.push(source);
        sourcesByUrl.set(url, source);
      }
    }
  }

  if (!baseSources.length) {
    return { context: "", sources: [] as SourceSnippet[] };
  }

  const sourcesWithIds = baseSources
    .sort((a, b) => b.score - a.score)
    .map((source, index) => ({ ...source, docId: `DOC${index + 1}` }));

  const context = sourcesWithIds
    .map(
      (source) =>
        `[${source.docId}] ${source.title} — ${source.section}\n${source.snippet}`
    )
    .join("\n\n");

  return { context, sources: sourcesWithIds };
}

async function handleAsk(id: string, question: string) {
  activeRequests.add(id);
  try {
    self.postMessage({ type: "status", id, status: "retrieving" } satisfies WorkerResponse);

    const { context, sources } = await buildContext(question);

    if (!activeRequests.has(id)) {
      return;
    }

    if (!context) {
      self.postMessage({
        type: "error",
        id,
        error: "I couldn't find relevant information in the portfolio. Try rephrasing your question.",
      } satisfies WorkerResponse);
      return;
    }

    self.postMessage({ type: "status", id, status: "answering" } satisfies WorkerResponse);

    const generator = await getGenerator();

    if (!activeRequests.has(id)) {
      return;
    }

    const needsListAnswer = /\b(list|which|what\s+projects|show|give|enumerate|provide\s+projects)\b/i.test(
      question
    );

    const instructions = needsListAnswer
      ? "If the question asks for multiple items, answer with a concise bullet list"
      : "Answer in 3–4 sentences. Do not invent information.";

    const contextGuide = sources
      .map(
        (source) =>
          `${source.docId}: ${source.title} — ${source.section} (similarity ${source.score.toFixed(2)})`
      )
      .join("\n");

    const prompt = `You are an AI assistant helping visitors understand my software portfolio. Only use information from the provided context snippets. ${instructions}

Context snippets:
${context}

Snippet summary:
${contextGuide}

Question: ${question}

Answer:`;

    let outputs = await generator(prompt, {
      max_new_tokens: needsListAnswer ? 220 : 280,
      temperature: 0.2,
      repetition_penalty: 1.2,
    });

    if (!activeRequests.has(id)) {
      return;
    }

    let answerText = cleanGeneratedText(outputs?.[0]?.generated_text ?? "").trim();

    if (answerText.length < MIN_ANSWER_LENGTH) {
      outputs = await generator(`${prompt}

Please restate the answer clearly following the required format and doc references.`, {
        max_new_tokens: needsListAnswer ? 220 : 280,
        temperature: 0.2,
        repetition_penalty: 1.15,
      });
      answerText = cleanGeneratedText(outputs?.[0]?.generated_text ?? "").trim();
    }

    if (answerText.length < MIN_ANSWER_LENGTH) {
      answerText = sources[0]
        ? `I couldn't form a full answer, but ${sources[0].docId} (${sources[0].title} — ${sources[0].section}) might have the details.`
        : "I couldn't form a direct answer, and the context didn't include enough information.";
    }

    self.postMessage({ type: "result", id, answer: answerText, sources: [] } satisfies WorkerResponse);
  } catch (error) {
    console.error("AI worker ask error", error);
    self.postMessage({
      type: "error",
      id,
      error: error instanceof Error ? error.message : "Something went wrong answering your question.",
    } satisfies WorkerResponse);
  } finally {
    activeRequests.delete(id);
  }
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const message = event.data;

  switch (message.type) {
    case "init": {
      void Promise.all([loadEmbeddings(), getEmbeddingPipeline(), getGenerator()])
        .then(() => {
          self.postMessage({ type: "ready" } satisfies WorkerResponse);
        })
        .catch((error) => {
          console.error("Failed to initialise AI worker", error);
        });
      break;
    }
    case "ask": {
      void handleAsk(message.id, message.question);
      break;
    }
    case "cancel": {
      activeRequests.delete(message.id);
      break;
    }
    default:
      console.warn("Unknown worker message", message);
  }
};

export default {};
