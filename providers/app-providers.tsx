"use client";

import { ThemeProvider } from "@/context/theme-context";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      {children}
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  );
}
