"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LanguageSwitcher } from "./language-switcher";
// import { SearchInput } from "./search-input";
import { NavSearchBox } from "./nav-searchbox";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Common");
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to search results page
      router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const navigation = [
    // { name: t("home"), href: "/" as const },
    { name: t("home"), href: "/landing" as const },
    { name: t("blog") || "Blog", href: "/blog" as const },
    // { name: t("layouts"), href: "/contained-demo" as const },
    // { name: t("floatingUI"), href: "/floating-ui-demo" as const },
  ];

  return (
    <div className="flex items-center py-4">
      {/* Start Column - Logo */}
      <div className="flex-1 flex justify-start">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="NextJS Blog Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
          <span className="text-xl px-2 rounded-md font-bold text-gray-900 dark:text-gray-100 bg-lime-400 transition-colors">
            MURPHEYS LAB
          </span>
        </Link>
      </div>

      {/* Center Column - Navigation Links */}
      <div className="flex-1 flex justify-center">
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 font-bold hover:text-foreground hover:italic hover:underline hover:drop-shadow-[1rem_.25rem_0px_rgba(0,0,0,0.3)] transition-all duration-700 ease-in-out transform hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* End Column - Controls */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-0">
          {/* Search Input */}
          <NavSearchBox
            placeholder={t("search") || "Search..."}
            onSearch={handleSearch}
            className="w-64"
          />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden z-50">
          <div className="flex flex-col p-4 space-y-4">
            {/* Mobile Search */}
            <NavSearchBox
              placeholder={t("search") || "Search..."}
              onSearch={handleSearch}
              className="w-full"
            />

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center justify-between pt-2 border-t">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
