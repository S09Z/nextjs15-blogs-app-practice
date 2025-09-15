import Link from "next/link";

export function Footer() {
  return (
    <div className="text-center text-sm text-muted-foreground">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2024 NextJS Blog. All rights reserved.</p>

        <div className="flex items-center space-x-4">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/sitemap"
            className="hover:text-foreground transition-colors"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
}
