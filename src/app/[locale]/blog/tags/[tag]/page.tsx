import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogPostsByTag, getBlogPosts } from "@/data/blog-posts";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
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
    title: `Posts tagged "${formattedTag}"`,
    description: `All blog posts tagged with ${formattedTag}`,
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
      maxWidth="4xl"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {/* Page header */}
          <div className="pb-6">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Posts tagged "{formattedTag}"
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>

          <BlogList posts={posts} showTitle={false} />
        </div>
      </div>
    </PageLayout>
  );
}