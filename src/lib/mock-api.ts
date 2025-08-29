// Mock API for development and demo purposes

export interface FeedItem {
  id: string;
  title: string;
  summary: string;
  contributor: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  sourceType: "url" | "pdf";
  url?: string;
  fileId?: string;
  rating?: number;
}

export interface SearchAnswer {
  answer: string;
  confidence: number;
  citations: Array<{
    documentId: string;
    title: string;
    url?: string;
    contributor?: {
      id: string;
      name: string;
    };
  }>;
}

export interface Job {
  id: string;
  agent: "ingestion" | "embedding" | "feed" | "qa";
  status: "queued" | "running" | "succeeded" | "failed";
  startedAt: string;
  durationMs?: number;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  contributions: number;
  lastActiveAt: string;
}

// Mock data
const mockFeedItems: FeedItem[] = [
  {
    id: "1",
    title: "The Future of AI in Healthcare",
    summary: "Comprehensive analysis of how artificial intelligence is transforming medical diagnosis and treatment.",
    contributor: { id: "user1", name: "Dr. Sarah Chen", avatarUrl: undefined },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sourceType: "url",
    url: "https://example.com/ai-healthcare",
    rating: 4.5,
  },
  {
    id: "2", 
    title: "Machine Learning Research Paper Collection",
    summary: "Latest papers on deep learning architectures and their applications in computer vision.",
    contributor: { id: "user2", name: "Alex Rodriguez" },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    sourceType: "pdf",
    fileId: "doc123",
    rating: 4.8,
  },
  {
    id: "3",
    title: "Climate Change Impact Assessment",
    summary: "Global analysis of climate patterns and their effects on biodiversity and human settlements.",
    contributor: { id: "user3", name: "Prof. Maria Santos" },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    sourceType: "url",
    url: "https://example.com/climate-study",
    rating: 4.2,
  },
];

const mockJobs: Job[] = [
  {
    id: "job1",
    agent: "ingestion",
    status: "succeeded",
    startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    durationMs: 2500,
  },
  {
    id: "job2",
    agent: "embedding",
    status: "running",
    startedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "job3",
    agent: "qa",
    status: "failed",
    startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    durationMs: 1200,
    error: "Rate limit exceeded",
  },
  {
    id: "job4",
    agent: "feed",
    status: "succeeded",
    startedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    durationMs: 800,
  },
  {
    id: "job5",
    agent: "ingestion",
    status: "queued",
    startedAt: new Date().toISOString(),
  },
  {
    id: "job6",
    agent: "embedding",
    status: "succeeded",
    startedAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    durationMs: 3200,
  },
];

const mockUsers: User[] = [
  {
    id: "user1",
    name: "Dr. Sarah Chen",
    contributions: 12,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user2", 
    name: "Alex Rodriguez",
    contributions: 8,
    lastActiveAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user3",
    name: "Prof. Maria Santos", 
    contributions: 15,
    lastActiveAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock API functions with realistic delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getFeed(cursor?: string, limit: number = 20) {
    await delay(300);
    return {
      items: mockFeedItems,
      nextCursor: undefined,
    };
  },

  async getAnswer(query: string): Promise<SearchAnswer> {
    await delay(800);
    return {
      answer: `Based on the available knowledge, ${query.toLowerCase()} involves several key factors. The research indicates that current approaches show promising results, though further investigation is needed for comprehensive understanding.`,
      confidence: 0.75,
      citations: [
        {
          documentId: "1",
          title: "The Future of AI in Healthcare",
          url: "https://example.com/ai-healthcare",
          contributor: { id: "user1", name: "Dr. Sarah Chen" },
        },
        {
          documentId: "2",
          title: "Machine Learning Research Paper Collection",
          contributor: { id: "user2", name: "Alex Rodriguez" },
        },
      ],
    };
  },

  async getJobs(): Promise<Job[]> {
    await delay(200);
    return mockJobs;
  },

  async getUser(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(u => u.id === id) || null;
  },

  async ingestUrl(url: string, contributorId?: string) {
    await delay(1000);
    return {
      documentId: `doc_${Date.now()}`,
      title: "Extracted Title from URL",
    };
  },

  async ingestPdf(file: File) {
    await delay(2000);
    return {
      documentId: `doc_${Date.now()}`,
      pages: 12,
      title: file.name.replace('.pdf', ''),
    };
  },

  async rate(documentId: string, rating: number) {
    await delay(200);
    return { ok: true };
  },
};