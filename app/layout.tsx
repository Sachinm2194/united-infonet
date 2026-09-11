import type { Metadata, Viewport } from "next";
import { Inclusive_Sans } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";

import "./globals.css";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";

export const inclusiveSans = Inclusive_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "United Infonet",
    template: "%s | United Infonet",
  },
  description: "United Infonet — your trusted technology partner.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("ui-theme");
    if (theme !== "light" && theme !== "dark") theme = "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`flex min-h-full flex-col antialiased ${inclusiveSans.className}`}
        suppressHydrationWarning
      >
        <AppProviders>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AppProviders>
      </body>
    </html>
  );
}
