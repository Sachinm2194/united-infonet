"use client";

import { ThemeProvider } from "@/context/theme-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
