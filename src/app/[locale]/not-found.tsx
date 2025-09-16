import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("Errors.404");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
            404
          </h1>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("description")}
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild variant="default" size="lg" className="w-full">
            <Link href="/">
              {t("goHome")}
            </Link>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => window.history.back()}
          >
            {t("goBack")}
          </Button>
        </div>
      </div>
    </div>
  );
}