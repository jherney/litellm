export interface LLMModel {
  id: string;
  name: string;
  organization: string;
  parameters: string;
  quantizedSize: string;
  ramRequired: number; // in GB
  recommendedQuant: string;
  performanceScore: number; // 1-10
  compatibility: 'excellent' | 'good' | 'moderate' | 'tight';
  lastUpdated: string;
  releaseDate: string;
  description: string;
  useCases: string[];
  downloadUrl: string;
  license: string;
  architecture: string;
  contextLength: number;
  isNew: boolean;
  tags: string[];
}

export const systemSpecs = {
  cpu: "2 GHz",
  cores: 4,
  ram: "8 GB",
  description: "Low-spec / Budget PC"
};

export const models: LLMModel[] = [
  {
    id: "qwen2.5-3b",
    name: "Qwen 2.5 3B",
    organization: "Alibaba",
    parameters: "3B",
    quantizedSize: "1.8 GB (Q4_K_M)",
    ramRequired: 4,
    recommendedQuant: "Q4_K_M",
    performanceScore: 8,
    compatibility: "excellent",
    lastUpdated: "2025-01-15",
    releaseDate: "2024-12-01",
    description: "Excellent multilingual model with strong reasoning capabilities. One of the best small models available, punches way above its weight class.",
    useCases: ["Coding", "General chat", "Translation", "Math"],
    downloadUrl: "https://huggingface.co/Qwen/Qwen2.5-3B-Instruct-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: true,
    tags: ["multilingual", "coding", "reasoning", "instruct"]
  },
  {
    id: "phi-4",
    name: "Phi-4",
    organization: "Microsoft",
    parameters: "14B",
    quantizedSize: "7.5 GB (Q4_K_M)",
    ramRequired: 8,
    recommendedQuant: "Q4_K_M",
    performanceScore: 9,
    compatibility: "tight",
    lastUpdated: "2025-02-01",
    releaseDate: "2024-12-20",
    description: "Microsoft's latest small language model with exceptional reasoning. Requires most of your 8GB RAM at Q4 quantization but delivers near-70B performance on some benchmarks.",
    useCases: ["Math", "Reasoning", "Coding", "Science"],
    downloadUrl: "https://huggingface.co/microsoft/phi-4-gguf",
    license: "MIT",
    architecture: "Transformer (Dense)",
    contextLength: 16384,
    isNew: true,
    tags: ["reasoning", "math", "science", "coding"]
  },
  {
    id: "llama-3.2-3b",
    name: "Llama 3.2 3B",
    organization: "Meta",
    parameters: "3B",
    quantizedSize: "1.9 GB (Q4_K_M)",
    ramRequired: 4,
    recommendedQuant: "Q4_K_M",
    performanceScore: 7,
    compatibility: "excellent",
    lastUpdated: "2025-01-10",
    releaseDate: "2024-09-25",
    description: "Meta's compact model optimized for edge devices. Great for general-purpose tasks with solid English language performance and instruction following.",
    useCases: ["General chat", "Summarization", "Q&A", "Writing"],
    downloadUrl: "https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF",
    license: "Llama 3.2 Community",
    architecture: "Transformer (Dense)",
    contextLength: 131072,
    isNew: false,
    tags: ["general", "summarization", "english", "instruct"]
  },
  {
    id: "gemma-2-2b",
    name: "Gemma 2 2B",
    organization: "Google",
    parameters: "2B",
    quantizedSize: "1.4 GB (Q4_K_M)",
    ramRequired: 3,
    recommendedQuant: "Q5_K_M",
    performanceScore: 7,
    compatibility: "excellent",
    lastUpdated: "2025-01-05",
    releaseDate: "2024-07-15",
    description: "Google's lightweight model that can even run at Q5 quantization on 8GB systems. Surprisingly capable for its size with good instruction following.",
    useCases: ["General chat", "Classification", "Simple tasks", "Edge deployment"],
    downloadUrl: "https://huggingface.co/bartowski/gemma-2-2b-it-GGUF",
    license: "Gemma Terms of Use",
    architecture: "Transformer (Dense)",
    contextLength: 8192,
    isNew: false,
    tags: ["lightweight", "edge", "classification", "google"]
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B v0.3",
    organization: "Mistral AI",
    parameters: "7B",
    quantizedSize: "4.4 GB (Q4_K_M)",
    ramRequired: 6,
    recommendedQuant: "Q4_K_M",
    performanceScore: 8,
    compatibility: "good",
    lastUpdated: "2025-01-20",
    releaseDate: "2024-05-22",
    description: "The legendary 7B model that started the small-model revolution. Still very capable with excellent speed/quality tradeoff. Runs comfortably on 8GB RAM.",
    useCases: ["General chat", "Coding", "Creative writing", "Analysis"],
    downloadUrl: "https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: false,
    tags: ["general", "coding", "creative", "popular"]
  },
  {
    id: "deepseek-r1-distill-qwen-1.5b",
    name: "DeepSeek R1 Distill Qwen 1.5B",
    organization: "DeepSeek",
    parameters: "1.5B",
    quantizedSize: "1.1 GB (Q4_K_M)",
    ramRequired: 3,
    recommendedQuant: "Q6_K",
    performanceScore: 7,
    compatibility: "excellent",
    lastUpdated: "2025-02-10",
    releaseDate: "2025-01-20",
    description: "Distilled reasoning model from DeepSeek's R1. Amazing chain-of-thought capabilities at tiny size. Can run at Q6 on 8GB for better quality.",
    useCases: ["Math", "Reasoning", "Logic puzzles", "Step-by-step problems"],
    downloadUrl: "https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-1.5B-GGUF",
    license: "MIT",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: true,
    tags: ["reasoning", "math", "chain-of-thought", "distilled"]
  },
  {
    id: "smollm2-1.7b",
    name: "SmolLM2 1.7B",
    organization: "HuggingFace",
    parameters: "1.7B",
    quantizedSize: "1.2 GB (Q4_K_M)",
    ramRequired: 3,
    recommendedQuant: "Q6_K",
    performanceScore: 6,
    compatibility: "excellent",
    lastUpdated: "2025-01-08",
    releaseDate: "2024-12-10",
    description: "HuggingFace's ultra-small model trained on high-quality data. Great for on-device use and can be quantized aggressively while maintaining quality.",
    useCases: ["On-device", "Classification", "Simple Q&A", "Function calling"],
    downloadUrl: "https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 8192,
    isNew: true,
    tags: ["on-device", "ultra-small", "huggingface", "efficient"]
  },
  {
    id: "qwen2.5-7b",
    name: "Qwen 2.5 7B",
    organization: "Alibaba",
    parameters: "7B",
    quantizedSize: "4.5 GB (Q4_K_M)",
    ramRequired: 6,
    recommendedQuant: "Q4_K_M",
    performanceScore: 9,
    compatibility: "good",
    lastUpdated: "2025-01-15",
    releaseDate: "2024-12-01",
    description: "Top-tier 7B model with exceptional coding and math abilities. One of the best open models at this size. Runs well on 8GB with Q4 quantization.",
    useCases: ["Coding", "Math", "General chat", "Agentic tasks"],
    downloadUrl: "https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: false,
    tags: ["coding", "math", "agentic", "top-tier"]
  },
  {
    id: "llama-3.2-1b",
    name: "Llama 3.2 1B",
    organization: "Meta",
    parameters: "1B",
    quantizedSize: "0.8 GB (Q4_K_M)",
    ramRequired: 2,
    recommendedQuant: "Q8_0",
    performanceScore: 5,
    compatibility: "excellent",
    lastUpdated: "2024-11-01",
    releaseDate: "2024-09-25",
    description: "Ultra-compact model that can run at full Q8 precision on 8GB RAM. Good for simple tasks and can be used as a router/classifier in multi-model setups.",
    useCases: ["Classification", "Routing", "Simple tasks", "Edge/IoT"],
    downloadUrl: "https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF",
    license: "Llama 3.2 Community",
    architecture: "Transformer (Dense)",
    contextLength: 131072,
    isNew: false,
    tags: ["ultra-small", "classification", "edge", "router"]
  },
  {
    id: "qwen2.5-coder-3b",
    name: "Qwen 2.5 Coder 3B",
    organization: "Alibaba",
    parameters: "3B",
    quantizedSize: "2.0 GB (Q4_K_M)",
    ramRequired: 4,
    recommendedQuant: "Q5_K_M",
    performanceScore: 8,
    compatibility: "excellent",
    lastUpdated: "2025-01-15",
    releaseDate: "2024-12-01",
    description: "Specialized coding model that rivals much larger general models at code generation. Excellent for autocomplete and code review on low-spec machines.",
    useCases: ["Code generation", "Code review", "Debugging", "Documentation"],
    downloadUrl: "https://huggingface.co/Qwen/Qwen2.5-Coder-3B-Instruct-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: true,
    tags: ["coding", "specialized", "autocomplete", "developer"]
  },
  {
    id: "hermes-3-llama-3.1-8b",
    name: "Hermes 3 Llama 3.1 8B",
    organization: "Nous Research",
    parameters: "8B",
    quantizedSize: "5.0 GB (Q4_K_M)",
    ramRequired: 7,
    recommendedQuant: "Q4_K_S",
    performanceScore: 9,
    compatibility: "moderate",
    lastUpdated: "2025-01-12",
    releaseDate: "2024-08-20",
    description: "Nous Research's fine-tune of Llama 3.1 8B with excellent function calling and agentic capabilities. Tight on 8GB RAM but very capable.",
    useCases: ["Function calling", "Agentic tasks", "Tool use", "General chat"],
    downloadUrl: "https://huggingface.co/bartowski/Hermes-3-Llama-3.1-8B-GGUF",
    license: "Llama 3.1 Community",
    architecture: "Transformer (Dense)",
    contextLength: 131072,
    isNew: false,
    tags: ["agentic", "function-calling", "tools", "nous"]
  },
  {
    id: "minicpm-2.4b",
    name: "MiniCPM 2.4B",
    organization: "OpenBMB",
    parameters: "2.4B",
    quantizedSize: "1.6 GB (Q4_K_M)",
    ramRequired: 4,
    recommendedQuant: "Q5_K_M",
    performanceScore: 7,
    compatibility: "excellent",
    lastUpdated: "2025-01-03",
    releaseDate: "2024-11-15",
    description: "Chinese research lab's efficient model with strong multilingual support. Good balance of speed and quality for everyday tasks.",
    useCases: ["Multilingual", "General chat", "Translation", "Summarization"],
    downloadUrl: "https://huggingface.co/openbmb/MiniCPM3-4B-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: true,
    tags: ["multilingual", "efficient", "chinese", "general"]
  },
  {
    id: "gemma-3-4b",
    name: "Gemma 3 4B",
    organization: "Google",
    parameters: "4B",
    quantizedSize: "2.6 GB (Q4_K_M)",
    ramRequired: 5,
    recommendedQuant: "Q5_K_M",
    performanceScore: 8,
    compatibility: "good",
    lastUpdated: "2025-03-01",
    releaseDate: "2025-02-25",
    description: "Google's latest Gemma model with improved reasoning and multilingual support. Strong performance at 4B parameters with efficient architecture.",
    useCases: ["General chat", "Multilingual", "Reasoning", "Coding"],
    downloadUrl: "https://huggingface.co/bartowski/gemma-3-4b-it-GGUF",
    license: "Gemma Terms of Use",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: true,
    tags: ["multilingual", "reasoning", "google", "latest"]
  },
  {
    id: "olmo-2-7b",
    name: "OLMo 2 7B",
    organization: "AI2 (Allen Institute)",
    parameters: "7B",
    quantizedSize: "4.3 GB (Q4_K_M)",
    ramRequired: 6,
    recommendedQuant: "Q4_K_M",
    performanceScore: 7,
    compatibility: "good",
    lastUpdated: "2025-02-05",
    releaseDate: "2025-01-15",
    description: "Fully open model (data, weights, training code all open). Competitive with other 7B models while being completely transparent in its training.",
    useCases: ["Research", "General chat", "Fine-tuning", "Academic use"],
    downloadUrl: "https://huggingface.co/allenai/OLMo-2-1225-13B-GGUF",
    license: "AI Implications License",
    architecture: "Transformer (Dense)",
    contextLength: 4096,
    isNew: true,
    tags: ["open-source", "research", "transparent", "academic"]
  },
  {
    id: "exaone-3.5-2.4b",
    name: "EXAONE 3.5 2.4B",
    organization: "LG AI Research",
    parameters: "2.4B",
    quantizedSize: "1.5 GB (Q4_K_M)",
    ramRequired: 3,
    recommendedQuant: "Q6_K",
    performanceScore: 6,
    compatibility: "excellent",
    lastUpdated: "2025-01-18",
    releaseDate: "2024-12-05",
    description: "LG's efficient small model with strong performance on benchmarks relative to its size. Good for constrained environments with multilingual support.",
    useCases: ["General chat", "Multilingual", "Edge deployment", "Classification"],
    downloadUrl: "https://huggingface.co/bartowski/EXAONE-3.5-2.4B-Instruct-GGUF",
    license: "Apache 2.0",
    architecture: "Transformer (Dense)",
    contextLength: 32768,
    isNew: true,
    tags: ["efficient", "multilingual", "edge", "lg"]
  }
];

export const quantizationGuide = [
  {
    quant: "Q2_K",
    sizeRatio: "30-35%",
    quality: "Poor",
    description: "Aggressive compression, noticeable quality loss. Only for extreme constraints.",
    color: "red"
  },
  {
    quant: "Q3_K_M",
    sizeRatio: "38-42%",
    quality: "Acceptable",
    description: "Usable for simple tasks. Some degradation in complex reasoning.",
    color: "orange"
  },
  {
    quant: "Q4_K_M",
    sizeRatio: "45-50%",
    quality: "Good",
    description: "Best balance of size and quality. Recommended for most use cases.",
    color: "green"
  },
  {
    quant: "Q5_K_M",
    sizeRatio: "55-60%",
    quality: "Very Good",
    description: "Near-FP16 quality for most tasks. Use if RAM allows.",
    color: "green"
  },
  {
    quant: "Q6_K",
    sizeRatio: "62-68%",
    quality: "Excellent",
    description: "Virtually indistinguishable from full precision. Use when possible.",
    color: "blue"
  },
  {
    quant: "Q8_0",
    sizeRatio: "75-80%",
    quality: "Near Perfect",
    description: "Essentially full precision. Only for very small models on 8GB.",
    color: "blue"
  }
];

export const tips = [
  {
    title: "Use llama.cpp or Ollama",
    description: "These are the most optimized inference engines for CPU-only systems. Ollama is easiest to set up, llama.cpp gives more control.",
    icon: "cpu"
  },
  {
    title: "Close background apps",
    description: "Free up RAM before running LLMs. Every MB matters on 8GB systems. Close browsers, IDEs, and other memory-heavy apps.",
    icon: "memory"
  },
  {
    title: "Use mmap for large models",
    description: "Memory mapping allows the OS to page model data in/out of RAM. Slower but lets you run models larger than your RAM.",
    icon: "database"
  },
  {
    title: "Try Q4_K_M first",
    description: "This quantization offers the best quality-to-size ratio. Start here and adjust up or down based on your experience.",
    icon: "balance-scale"
  },
  {
    title: "Flash Attention helps",
    description: "If supported, enable flash attention in your inference engine. It reduces memory usage during long context processing.",
    icon: "bolt"
  },
  {
    title: "SSD helps with loading",
    description: "While inference is CPU-bound, loading models from SSD is much faster than HDD. Consider model caching in RAM.",
    icon: "hdd"
  }
];
