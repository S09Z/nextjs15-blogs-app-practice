export type LayoutTemplate = "blank" | "contained";

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface PageLayoutProps {
  template?: LayoutTemplate;
  children: React.ReactNode;
  className?: string;
}
