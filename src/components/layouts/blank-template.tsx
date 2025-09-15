import { cn } from "@/lib/utils";
import type { LayoutProps } from "@/types/layout";

export function BlankTemplate({ children, className }: LayoutProps) {
  return <div className={cn("min-h-screen w-full", className)}>{children}</div>;
}
