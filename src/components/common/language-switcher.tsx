"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/floating-ui";
import { Languages } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const dropdownItems = languages.map((lang) => ({
    label: `${lang.flag} ${lang.name}`,
    value: lang.code,
    onClick: () => {
      if (lang.code !== locale) {
        // Handle dynamic routes that need params
        if (pathname.includes('[') && params) {
          router.push({ pathname, params } as any, { locale: lang.code });
        } else {
          router.push(pathname as any, { locale: lang.code });
        }
      }
    },
  }));

  return (
    <Dropdown
      items={dropdownItems}
      placement="bottom-start"
      className="min-w-[120px]"
    >
      <Button variant="ghost" size="sm" className="gap-2">
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <span className="sm:hidden">{currentLanguage?.flag}</span>
      </Button>
    </Dropdown>
  );
}
