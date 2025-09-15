import { cn } from "@/lib/utils";
import type { LayoutProps } from "@/types/layout";

interface ContainedLayoutTemplateProps extends LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function ContainedLayoutTemplate({
  children,
  header,
  footer,
  sidebar,
  maxWidth = "2xl",
  className,
}: ContainedLayoutTemplateProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {/* Header */}
      {header && (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className={cn("container mx-auto px-4", maxWidthClass)}>
            {header}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-64 border-r bg-muted/50 p-4 hidden lg:block">
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className={cn("container mx-auto px-4 py-6", maxWidthClass)}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t bg-muted/50">
          <div className={cn("container mx-auto px-4 py-6", maxWidthClass)}>
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}
