"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full text-center px-6">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
                404
              </h1>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Page Not Found
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Sorry, the page you are looking for doesn&apos;t exist or has been moved.
              </p>
            </div>

            <div className="space-y-4">
              <Button asChild variant="default" size="lg" className="w-full">
                <Link href="/en">
                  Go Home
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}