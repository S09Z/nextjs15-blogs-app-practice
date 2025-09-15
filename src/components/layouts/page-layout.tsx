"use client";

import { BlankTemplate } from "./blank-template";
import { ContainedLayoutTemplate } from "./contained-layout-template";
import type { PageLayoutProps } from "@/types/layout";

interface PageLayoutConfig {
  template?: "blank" | "contained";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export function PageLayout({
  children,
  template = "contained",
  ...config
}: PageLayoutProps & PageLayoutConfig) {
  switch (template) {
    case "blank":
      return (
        <BlankTemplate className={config.className}>{children}</BlankTemplate>
      );

    case "contained":
      return (
        <ContainedLayoutTemplate
          header={config.header}
          footer={config.footer}
          sidebar={config.sidebar}
          maxWidth={config.maxWidth}
          className={config.className}
        >
          {children}
        </ContainedLayoutTemplate>
      );

    default:
      return (
        <ContainedLayoutTemplate className={config.className}>
          {children}
        </ContainedLayoutTemplate>
      );
  }
}
