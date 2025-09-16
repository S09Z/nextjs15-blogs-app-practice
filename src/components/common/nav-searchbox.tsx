"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface NavSearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function NavSearchBox({
  placeholder = "Search...",
  onSearch,
  className
}: NavSearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleToggle = () => {
    if (isExpanded) {
      // If expanded and has query, search; otherwise collapse
      if (searchQuery.trim()) {
        onSearch?.(searchQuery);
      } else {
        setIsExpanded(false);
      }
    } else {
      // Expand and focus input
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setIsExpanded(false);
  };

  // Detect platform (macOS vs Windows/Linux)
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      const isSearchHotkey = isMac
        ? (event.metaKey && event.key === 'k')
        : (event.ctrlKey && event.key === 'k');

      if (isSearchHotkey) {
        event.preventDefault();

        if (!isExpanded) {
          // Open search
          setIsExpanded(true);
        } else {
          // Close search if already expanded
          setIsExpanded(false);
          setSearchQuery("");
        }
      }

      // Handle Escape key to close search
      if (event.key === 'Escape' && isExpanded) {
        if (searchQuery.trim()) {
          // Clear search query first
          setSearchQuery("");
        } else {
          // Close search if empty
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, searchQuery, isMac]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.closest('.nav-search-container')?.contains(event.target as Node)) {
        if (isExpanded && !searchQuery.trim()) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, searchQuery]);

  return (
    <div className={`nav-search-container relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center justify-end">
        {/* Search Input - Hidden/Visible based on expanded state */}
        <div
          className={`relative overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'w-64 opacity-100 mr-0' : 'w-0 opacity-0 mr-0'
            }`}
          style={{
            transformOrigin: 'right center'
          }}
        >
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            className="pr-8 bg-gray-100 dark:bg-gray-800 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-full"
          />
          {/* Close button inside input */}
          <div className={`absolute right-1 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
            isExpanded && searchQuery ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Icon Button with Hotkey */}
        <Button
          type={isExpanded && searchQuery.trim() ? "submit" : "button"}
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="flex-shrink-0 flex items-center gap-2 px-2 py-2 hover:bg-muted transition-all duration-300"
          title={isExpanded ? "Search" : `${isExpanded ? 'Close' : 'Open'} search (${isMac ? '⌘' : 'Ctrl'}+K)`}
        >
          {/* Keyboard shortcut hint beside icon */}
          <div className={`transition-all duration-300 ease-in-out ${
            !isExpanded ? 'max-w-16 opacity-100' : 'max-w-0 opacity-0'
          }`}>
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-1 rounded border border-border whitespace-nowrap">
              {isMac ? '⌘K' : 'Ctrl+K'}
            </span>
          </div>
          <Search className="h-4 w-4 transition-all duration-300" />
        </Button>
      </form>
    </div>
  );
}