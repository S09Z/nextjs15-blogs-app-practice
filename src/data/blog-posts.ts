import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 15 and React Server Components",
    description: "Learn how to leverage the power of React Server Components in Next.js 15 to build faster, more efficient web applications with better user experience.",
    content: "Full content would go here...",
    publishedAt: "2024-03-15",
    tags: ["Next.js", "React", "Server Components", "Web Development"],
    author: {
      name: "John Doe",
      avatar: "/avatars/john-doe.jpg"
    },
    readingTime: 8,
    slug: "getting-started-nextjs-15-react-server-components"
  },
  {
    id: "2",
    title: "Building Beautiful UIs with Tailwind CSS and Radix UI",
    description: "Discover how to combine the utility-first approach of Tailwind CSS with the accessible components of Radix UI to create stunning user interfaces.",
    content: "Full content would go here...",
    publishedAt: "2024-03-10",
    tags: ["Tailwind CSS", "Radix UI", "UI/UX", "Design System"],
    author: {
      name: "Jane Smith",
      avatar: "/avatars/jane-smith.jpg"
    },
    readingTime: 12,
    slug: "building-beautiful-uis-tailwind-radix"
  },
  {
    id: "3",
    title: "Mastering TypeScript for Modern React Development",
    description: "A comprehensive guide to using TypeScript effectively in React applications, covering advanced patterns, best practices, and common pitfalls.",
    content: "Full content would go here...",
    publishedAt: "2024-03-05",
    tags: ["TypeScript", "React", "JavaScript", "Development"],
    author: {
      name: "Mike Johnson",
      avatar: "/avatars/mike-johnson.jpg"
    },
    readingTime: 15,
    slug: "mastering-typescript-modern-react-development"
  },
  {
    id: "4",
    title: "Implementing Dark Mode with CSS Variables and React",
    description: "Learn how to implement a smooth dark mode toggle using CSS custom properties and React hooks, with proper theme persistence and system preference detection.",
    content: "Full content would go here...",
    publishedAt: "2024-02-28",
    tags: ["CSS", "React", "Dark Mode", "Theme"],
    author: {
      name: "Sarah Wilson",
      avatar: "/avatars/sarah-wilson.jpg"
    },
    readingTime: 6,
    slug: "implementing-dark-mode-css-variables-react"
  },
  {
    id: "5",
    title: "Optimizing Performance in Next.js Applications",
    description: "Explore various techniques to optimize your Next.js applications for better performance, including code splitting, image optimization, and caching strategies.",
    content: "Full content would go here...",
    publishedAt: "2024-02-20",
    tags: ["Next.js", "Performance", "Optimization", "Web Vitals"],
    author: {
      name: "David Chen",
      avatar: "/avatars/david-chen.jpg"
    },
    readingTime: 10,
    slug: "optimizing-performance-nextjs-applications"
  },
  {
    id: "6",
    title: "Building Accessible Forms with React Hook Form",
    description: "Master the art of creating accessible, performant forms in React using React Hook Form, with validation, error handling, and ARIA compliance.",
    content: "Full content would go here...",
    publishedAt: "2024-02-15",
    tags: ["React", "Forms", "Accessibility", "UX"],
    author: {
      name: "Emily Rodriguez",
      avatar: "/avatars/emily-rodriguez.jpg"
    },
    readingTime: 9,
    slug: "building-accessible-forms-react-hook-form"
  }
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getBlogPostsPaginated(page: number = 1, pageSize: number = 6): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const sortedPosts = getBlogPosts();
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}