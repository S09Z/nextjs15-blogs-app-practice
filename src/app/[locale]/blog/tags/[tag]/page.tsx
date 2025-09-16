import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogPostsByTag, getBlogPosts } from "@/data/blog-posts";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const allTags = posts.flatMap(post =>
    post.tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-'))
  );
  const uniqueTags = Array.from(new Set(allTags));

  return uniqueTags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const formattedTag = tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return {
    title: `Posts tagged "${formattedTag}" - NextJS Blog`,
    description: `All blog posts tagged with ${formattedTag}. Explore articles related to ${formattedTag}.`,
    openGraph: {
      title: `Posts tagged "${formattedTag}" - NextJS Blog`,
      description: `All blog posts tagged with ${formattedTag}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Posts tagged "${formattedTag}" - NextJS Blog`,
      description: `All blog posts tagged with ${formattedTag}`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const formattedTag = tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const posts = getBlogPostsByTag(formattedTag);

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

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Posts tagged "{formattedTag}"
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>

          <BlogList posts={posts} showTitle={false} />
        </div>
      </div>
    </PageLayout>
  );
}