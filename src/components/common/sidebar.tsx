import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Sidebar() {
  const recentPosts = [
    { title: "Getting Started with Next.js 15", href: "/blog/nextjs-15" },
    { title: "Building with Radix UI", href: "/blog/radix-ui" },
    { title: "Tailwind CSS Best Practices", href: "/blog/tailwind" },
  ];

  const categories = [
    { name: "Development", count: 12, href: "/category/development" },
    { name: "Design", count: 8, href: "/category/design" },
    { name: "Tutorials", count: 15, href: "/category/tutorials" },
  ];

  return (
    <div className="space-y-6">
      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentPosts.map((post, index) => (
            <Link
              key={index}
              href={post.href}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {post.title}
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{category.name}</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">
                {category.count}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Subscribe to get the latest posts delivered to your email.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm border rounded-md bg-background"
            />
            <button className="w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
