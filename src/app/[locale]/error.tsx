"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Errors.500");

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-200 dark:text-red-700">
            500
          </h1>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("description")}
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-400 mb-2">
                {t("errorDetails")}
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {t("errorId")}: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button
            variant="destructive"
            size="lg"
            className="w-full"
            onClick={reset}
          >
            {t("tryAgain")}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => window.location.href = "/"}
          >
            {t("goHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}