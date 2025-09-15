"use client";

import { BlogPost } from "@/types/blog";
import { BlogPostCard } from "./blog-post-card";

interface BlogListProps {
  posts: BlogPost[];
  title?: string;
  showTitle?: boolean;
}

export function BlogList({ posts, title = "Latest", showTitle = true }: BlogListProps) {
  return (
    <div className="space-y-2">
      {showTitle && (
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
      )}

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
          </div>
        ) : (
          posts.map((post) => <BlogPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}