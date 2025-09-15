import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { getBlogPost, getBlogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      maxWidth="4xl"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {/* Article header */}
          <header className="space-y-6 pb-10">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {post.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block"
                >
                  <span className="text-sm font-medium text-primary hover:text-primary/80 uppercase tracking-wide transition-colors">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </header>

          {/* Article content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8">
              {post.description}
            </p>

            <div className="space-y-6">
              <p>
                This is where the full blog post content would go. For now, this is a placeholder
                showing how the blog post layout would look with proper typography and spacing.
              </p>

              <p>
                You could integrate this with a content management system, markdown files, or any
                other content source. The layout is designed to be flexible and work with various
                content formats.
              </p>

              <h2>Example Section</h2>
              <p>
                This demonstrates how headings and paragraphs would be styled within the blog post.
                The prose classes from Tailwind provide excellent typography defaults.
              </p>

              <blockquote>
                <p>
                  This is an example blockquote that shows how quoted content would appear in
                  your blog posts.
                </p>
              </blockquote>

              <h3>Another Section</h3>
              <p>
                Continue adding your content here. The layout will automatically handle spacing,
                typography, and responsive design.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-10 mt-10 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}