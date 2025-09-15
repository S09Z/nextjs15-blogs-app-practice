import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "th"],

  // Used when no locale matches
  defaultLocale: "en",

  // The prefix for all pathnames
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/blog/tags/[tag]": "/blog/tags/[tag]",
    "/landing": "/landing",
    "/contained-demo": "/contained-demo",
    "/blank-demo": "/blank-demo",
    "/floating-ui-demo": "/floating-ui-demo",
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
