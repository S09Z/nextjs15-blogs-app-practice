export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  readingTime: number; // in minutes
  slug: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}