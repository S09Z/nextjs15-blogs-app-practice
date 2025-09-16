import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { getBlogPost, getBlogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    title: `${post.title} - NextJS Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      siteName: "NextJS Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: post.author.name,
    },
    robots: {
      index: true,
      follow: true,
    },
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
      maxWidth="full"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12 space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.description}
            </p>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-b border-gray-200 dark:border-gray-700 py-4">
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-bold bg-lime-400 text-black rounded-full border-2 border-black cursor-pointer hover:bg-lime-300 transition-all duration-200 uppercase tracking-wide shadow-sm font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                This is a placeholder for the blog post content. In a real application,
                you would parse markdown content or fetch rich content from a CMS or
                database. The content would be rendered here with proper typography
                and formatting.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                Getting Started
              </h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                Key Features
              </h3>

              <ul className="list-disc list-inside space-y-2">
                <li>Feature one with detailed explanation</li>
                <li>Feature two with comprehensive coverage</li>
                <li>Feature three with practical examples</li>
              </ul>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                Implementation Details
              </h2>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Pro Tip
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  This is a highlighted section that contains important
                  information or tips related to the blog post content.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                Conclusion
              </h2>

              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    ← All Posts
                  </Link>
                </Button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </PageLayout>
  );
}