import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BlogList } from "@/components/blog/blog-list";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { getBlogPostsPaginated } from "@/data/blog-posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - NextJS Blog",
  description: "Thoughts on software development, design, and technology. Explore our latest articles on Next.js, React, TypeScript, and modern web development.",
  openGraph: {
    title: "Blog - NextJS Blog",
    description: "Thoughts on software development, design, and technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - NextJS Blog",
    description: "Thoughts on software development, design, and technology",
  },
};

interface BlogPageProps {
  searchParams: { page?: string };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1;
  const { posts, totalPages, currentPage, hasNextPage, hasPrevPage } = getBlogPostsPaginated(page, 6);

  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      maxWidth="full"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <BlogList posts={posts} title="Latest" />
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          basePath="/blog"
        />
      </div>
    </PageLayout>
  );
}