"use client";

import { BlogPost } from "@/types/blog";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, User } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="py-12">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Date and meta info */}
        <div className="xl:col-span-1">
          <div className="flex items-center gap-4 xl:flex-col xl:items-start xl:gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="xl:col-span-3">
          <div className="space-y-4">
            {/* Title */}
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                className="text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={{
                    pathname: "/blog/tags/[tag]",
                    params: { tag: tag.toLowerCase().replace(/\s+/g, "-") },
                  }}
                  className="inline-block"
                >
                  <span className="px-3 py-1.5 text-sm font-bold bg-lime-400 text-black rounded-full border-2 border-black hover:bg-lime-300 transition-all duration-200 uppercase tracking-wide shadow-sm font-mono">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 leading-6">
              {post.description}
            </p>

            {/* Read more */}
            <div>
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
                aria-label={`Read more about "${post.title}"`}
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}