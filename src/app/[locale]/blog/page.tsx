import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BlogList } from "@/components/blog/blog-list";
import { getBlogPosts } from "@/data/blog-posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, design, and technology",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      maxWidth="4xl"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <BlogList posts={posts} title="Latest" />
      </div>
    </PageLayout>
  );
}