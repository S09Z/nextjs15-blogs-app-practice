"use client";

import { useEffect, useCallback } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleReload = useCallback(() => {
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-200 dark:text-red-700">
            ⚠️
          </h1>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Critical Error
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            A critical error occurred that prevented the application from loading properly.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-400 mb-2">
                Error Details (Development Only):
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed text-ellipsis overflow-hidden w-full h-10 px-8 bg-red-600 text-white shadow hover:bg-red-700"
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={handleReload}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed text-ellipsis overflow-hidden w-full h-10 px-8 bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Reload Application
          </button>
        </div>
      </div>
    </div>
  );
}