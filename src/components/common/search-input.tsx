"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  className
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`header-search ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 w-full bg-background border-border transition-all duration-200"
        />
      </div>
    </form>
  );
}