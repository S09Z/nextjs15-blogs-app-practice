"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { SearchInput } from "./search-input";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Common");

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // TODO: Implement search functionality
  };

  const navigation = [
    { name: t("home"), href: "/" as const },
    { name: t("blog") || "Blog", href: "/blog" as const },
    { name: t("landing"), href: "/landing" as const },
    { name: t("layouts"), href: "/contained-demo" as const },
    { name: t("floatingUI"), href: "/floating-ui-demo" as const },
  ];

  return (
    <div className="flex items-center justify-between py-4">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        NextJS Blog
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Input */}
        <SearchInput
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden z-50">
          <div className="flex flex-col p-4 space-y-4">
            {/* Mobile Search */}
            <SearchInput
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
