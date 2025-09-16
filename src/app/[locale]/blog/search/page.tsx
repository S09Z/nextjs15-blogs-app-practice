"use client";

import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogPosts } from "@/data/blog-posts";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Metadata } from "next";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const allPosts = getBlogPosts();

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();
    return allPosts.filter(post => {
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.author.name.toLowerCase().includes(searchTerm)
      );
    });
  }, [query, allPosts]);

  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      maxWidth="2xl"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Search Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                Search Results
              </h1>
            </div>

            {query && (
              <div className="space-y-2">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Results for "{query}"
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                </p>
              </div>
            )}

            {!query && (
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Enter a search query to find blog posts
              </p>
            )}
          </div>

          {/* Search Results */}
          {query && (
            <div>
              {filteredPosts.length > 0 ? (
                <BlogList posts={filteredPosts} showTitle={false} />
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try searching with different keywords or browse all posts.
                  </p>
                  <Button asChild>
                    <Link href="/blog">
                      View All Posts
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* No Query State */}
          {!query && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Start searching
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Use the search box in the header to find specific blog posts.
              </p>
              <Button asChild>
                <Link href="/blog">
                  Browse All Posts
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}