import {
  pipeline,
  env,
  FeatureExtractionPipeline,
  TextGenerationPipeline,
  TextStreamer,
} from "@huggingface/transformers";

// Configuration
env.allowLocalModels = false;
env.useBrowserCache = true;

// Model URLs - using lightweight models suitable for browser
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
// Using the smallest available model (82M parameters) - not instruction-tuned but much faster
const GENERATION_MODEL = "Xenova/distilgpt2"; // Smallest GPT-2 variant

// Embedding data structure
interface EmbeddingEntry {
  id: string;
  slug: string;
  collection: string;
  content: string;
  embeddings: number[] | Float32Array;
}

// Worker message types
interface WorkerMessage {
  type: "init" | "ask";
  id?: string;
  question?: string;
}

interface ProgressMessage {
  type: "status" | "ready" | "result" | "error";
  id?: string;
  message?: string;
  answer?: string;
  error?: string;
}

class RAGWorker {
  private embedder: FeatureExtractionPipeline | undefined;
  private generator: TextGenerationPipeline | undefined;
  private streamer: TextStreamer | undefined;
  private dataset: Map<string, EmbeddingEntry>;
  private searchIndex: Map<string, Set<string>>;
  private isInitialized: boolean = false;

  constructor() {
    this.embedder = undefined;
    this.generator = undefined;
    this.streamer = undefined;
    this.dataset = new Map();
    this.searchIndex = new Map();
  }

  // Tokenize text for keyword search
  tokenizeForSearch(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((term) => term.length > 2);
  }

  // Build inverted index for keyword search
  buildSearchIndex(): void {
    this.searchIndex.clear();
    this.dataset.forEach((doc) => {
      const terms = this.tokenizeForSearch(doc.content);
      terms.forEach((term) => {
        const termSet = this.searchIndex.get(term) || new Set<string>();
        termSet.add(doc.id);
        this.searchIndex.set(term, termSet);
      });
    });
  }

  // Text-based search using TF-IDF-like scoring
  textSearch(query: string, k: number = 10): Array<{ docId: string; textScore: number }> {
    const queryTerms = this.tokenizeForSearch(query);
    const docScores = new Map<string, number>();

    queryTerms.forEach((term) => {
      const docs = this.searchIndex.get(term) || new Set<string>();
      docs.forEach((docId: string) => {
        const doc = this.dataset.get(docId);
        if (!doc) return;

        const termFreq = this.tokenizeForSearch(doc.content).filter((t) => t === term).length;
        const score = termFreq * Math.log(this.dataset.size / (docs.size + 1));
        docScores.set(docId, (docScores.get(docId) || 0) + score);
      });
    });

    const maxScore = Math.max(...Array.from(docScores.values()), 1);
    return Array.from(docScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map(([docId, score]) => ({
        docId,
        textScore: score / maxScore,
      }));
  }

  // Cosine similarity between two vectors
  cosineSimilarity(
    a: Float32Array | number[],
    b: Float32Array | number[]
  ): number {
    const aArray = Array.isArray(a) ? a : Array.from(a);
    const bArray = Array.isArray(b) ? b : Array.from(b);

    const dotProduct = aArray.reduce((sum, val, i) => sum + val * bArray[i], 0);
    const normA = Math.sqrt(aArray.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(bArray.reduce((sum, val) => sum + val * val, 0));

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  }

  // Hybrid search combining semantic and text search
  async hybridSearch(
    query: string,
    topK: number = 3,
    semanticWeight: number = 0.7,
    requestId: string,
    progressCallback: (message: ProgressMessage) => void
  ): Promise<Array<{ id: string; score: number; content: string }>> {
    if (!this.embedder) throw new Error("Embedder not initialized");

    // Semantic search
    progressCallback({
      type: "status",
      id: requestId,
      message: "Embedding query...",
    });
    const questionEmbedding = await this.embedder(query, {
      pooling: "mean",
      normalize: true,
    });
    // Handle different data types from transformers.js
    const embeddingData = questionEmbedding.data;
    const queryVector = embeddingData instanceof Float32Array
      ? embeddingData
      : new Float32Array(Array.from(embeddingData as ArrayLike<number>));

    progressCallback({
      type: "status",
      id: requestId,
      message: "Searching embeddings...",
    });
    const semanticResults: Array<{ docId: string; score: number }> = [];

    for (const [docId, doc] of this.dataset) {
      const embeddings = doc.embeddings instanceof Float32Array
        ? doc.embeddings
        : new Float32Array(doc.embeddings);
      const score = this.cosineSimilarity(queryVector, embeddings);
      semanticResults.push({ docId, score });
    }

    // Text search
    progressCallback({
      type: "status",
      id: requestId,
      message: "Performing keyword search...",
    });
    const textResults = this.textSearch(query, topK * 2);

    // Combine results
    const combinedResults = new Map<
      string,
      { semanticScore: number; textScore: number; content: string }
    >();

    semanticResults.forEach((result) => {
      const doc = this.dataset.get(result.docId);
      if (!doc) return;

      if (!combinedResults.has(result.docId)) {
        combinedResults.set(result.docId, {
          semanticScore: 0,
          textScore: 0,
          content: doc.content,
        });
      }
      const entry = combinedResults.get(result.docId);
      if (entry) entry.semanticScore = result.score;
    });

    textResults.forEach((result) => {
      if (!combinedResults.has(result.docId)) {
        const doc = this.dataset.get(result.docId);
        if (!doc) return;
        combinedResults.set(result.docId, {
          semanticScore: 0,
          textScore: 0,
          content: doc.content,
        });
      }
      const entry = combinedResults.get(result.docId);
      if (entry) entry.textScore = result.textScore;
    });

    // Final scoring
    return Array.from(combinedResults.entries())
      .map(([id, data]) => ({
        id,
        score:
          data.semanticScore * semanticWeight +
          data.textScore * (1 - semanticWeight),
        content: data.content,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  // Initialize the RAG system
  async init(progressCallback: (message: ProgressMessage) => void): Promise<void> {
    try {
      // Load embedding model - try WebGPU first, fallback to CPU
      progressCallback({
        type: "status",
        message: "Loading embedding model...",
      });
      console.log("Loading embedding model:", EMBEDDING_MODEL);
      let embedderResult;
      try {
        embedderResult = await pipeline("feature-extraction", EMBEDDING_MODEL, {
          device: "webgpu",
        });
        console.log("Embedding model loaded with WebGPU");
      } catch (webgpuError) {
        console.warn("WebGPU not available, falling back to CPU:", webgpuError);
        embedderResult = await pipeline("feature-extraction", EMBEDDING_MODEL);
        console.log("Embedding model loaded with CPU");
      }
      this.embedder = embedderResult as unknown as FeatureExtractionPipeline;

      // Load text generation model
      progressCallback({
        type: "status",
        message: "Loading language model (this may take a minute)...",
      });
      console.log("Loading generation model:", GENERATION_MODEL);
      const generatorResult = await pipeline("text-generation", GENERATION_MODEL, {
        dtype: "fp32",
      });
      console.log("Generation model loaded successfully");
      this.generator = generatorResult as unknown as TextGenerationPipeline;

      // Create text streamer for real-time updates
      this.streamer = new TextStreamer(this.generator.tokenizer, {
        skip_prompt: true,
        callback_function: (text: string) => {
          // Stream updates can be sent here if needed
        },
      });

      // Load embeddings dataset
      progressCallback({
        type: "status",
        message: "Loading embeddings...",
      });
      const response = await fetch("/embeddings/index.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch embeddings: ${response.status} ${response.statusText}`);
      }

      const jsonData: EmbeddingEntry[] = await response.json();
      this.dataset = new Map(
        jsonData.map((doc) => [
          doc.id,
          {
            ...doc,
            embeddings:
              doc.embeddings instanceof Float32Array
                ? doc.embeddings
                : new Float32Array(doc.embeddings),
          },
        ])
      );

      // Build search index
      progressCallback({
        type: "status",
        message: "Building search index...",
      });
      this.buildSearchIndex();

      this.isInitialized = true;
      console.log("RAG system initialized successfully");
      progressCallback({
        type: "ready",
      });
    } catch (error) {
      console.error("RAG initialization error:", error);
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      progressCallback({
        type: "error",
        error: `Initialization failed: ${message}`,
      });
      // Don't throw - send error message instead
      progressCallback({
        type: "ready", // Send ready anyway so UI doesn't hang, but with error state
      });
    }
  }

  // Query the RAG system
  async query(
    question: string,
    requestId: string,
    progressCallback: (message: ProgressMessage) => void
  ): Promise<void> {
    if (!this.isInitialized || !this.embedder || !this.generator) {
      throw new Error("RAG system not initialized");
    }

    try {
      // Perform hybrid search
      const results = await this.hybridSearch(
        question,
        3, // topK
        0.7, // semanticWeight
        requestId,
        progressCallback
      );

      // Build context from retrieved chunks
      const context = results
        .map(
          (result, idx) =>
            `[Source ${idx + 1}]\n${result.content.substring(0, 500)}...`
        )
        .join("\n\n");

      // Create prompt for DistilGPT-2 (simple text completion format)
      const prompt = `Context from my portfolio:
${context}

Question: ${question}

Answer (as Oscar RC, in first person):`;

      // Generate response
      progressCallback({
        type: "status",
        id: requestId,
        message: "Generating answer...",
      });

      const response = await this.generator(prompt, {
        max_new_tokens: 256,
        do_sample: true,
        temperature: 0.8,
        top_p: 0.9,
        return_full_text: false,
      });

      // Extract generated text
      const firstResponse = Array.isArray(response[0])
        ? response[0][0]
        : response[0];

      if (!firstResponse) {
        throw new Error("No generation output received");
      }

      // Define the expected structure for generated messages
      interface GeneratedMessage {
        content: string;
      }

      const answer =
        typeof firstResponse.generated_text === "string"
          ? firstResponse.generated_text.trim()
          : firstResponse.generated_text
              .reduce((acc: string, msg: GeneratedMessage) => acc + msg.content, "")
              .trim();

      progressCallback({
        type: "result",
        id: requestId,
        answer,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Sorry, I couldn't answer that right now. Please try again later.";
      progressCallback({
        type: "error",
        id: requestId,
        error: errorMessage,
      });
    }
  }
}

// Create RAG instance
const rag = new RAGWorker();

// Worker message handler
self.addEventListener("message", async (event: MessageEvent<WorkerMessage>) => {
  const { type, id, question } = event.data;

  switch (type) {
    case "init": {
      console.log("Worker received init message");
      try {
        await rag.init((message) => {
          console.log("Sending progress message:", message.type);
          self.postMessage(message);
        });
        console.log("Init completed successfully");
      } catch (error) {
        console.error("Worker init error:", error);
        self.postMessage({
          type: "error",
          error: error instanceof Error ? error.message : "Failed to initialize",
        });
        // Still send ready so UI doesn't hang
        self.postMessage({
          type: "ready",
        });
      }
      break;
    }

    case "ask": {
      if (!question || !id) {
        self.postMessage({
          type: "error",
          id,
          error: "Missing question or request ID",
        });
        return;
      }

      await rag.query(question, id, (message) => {
        self.postMessage(message);
      });
      break;
    }

    default:
      self.postMessage({
        type: "error",
        error: `Unknown message type: ${type}`,
      });
  }
});
