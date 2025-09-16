"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type StaticPathname =
  | "/"
  | "/blog"
  | "/landing"
  | "/contained-demo"
  | "/blank-demo"
  | "/floating-ui-demo";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  basePath?: StaticPathname; // restrict to known static routes only
}

export function BlogPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  basePath = "/blog"
}: BlogPaginationProps) {
  const t = useTranslations("Pagination");
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end pages for pagination
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // Adjust if we're at the beginning or end
      if (currentPage <= 3) {
        endPage = Math.min(totalPages, 5);
      }
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Add visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return { pathname: basePath, query: { page } } as const;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 py-8" aria-label="Pagination">
      {/* Previous Page Button */}
      {hasPrevPage ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href={getPageUrl(currentPage - 1)} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            {t("previous")}
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" size="sm" disabled className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          {t("previous")}
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant={isCurrentPage ? "outline" : "ghost" }
              size="sm"
              asChild={!isCurrentPage}
              disabled={isCurrentPage}
              className="min-w-[40px]"
            >
              {isCurrentPage ? (
                <span>{pageNum}</span>
              ) : (
                <Link href={getPageUrl(pageNum)}>{pageNum}</Link>
              )}
            </Button>
          );
        })}
      </div>

      {/* Next Page Button */}
      {hasNextPage ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href={getPageUrl(currentPage + 1)} className="flex items-center gap-2">
            {t("next")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" size="sm" disabled className="flex items-center gap-2">
          {t("next")}
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}