import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about United Infonet.",
};

export default function AboutUsPage() {
  return <AboutPage />;
}
