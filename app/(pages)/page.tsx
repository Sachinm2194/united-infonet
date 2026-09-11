import type { Metadata } from "next";

import HomeComponent from "@/components/home";

export const metadata: Metadata = {
  title: "Enterprise IT Infrastructure Solutions",
  description:
    "Cost-effective, secure and scalable IT infrastructure solutions from United Infonet.",
};

export default function HomePage() {
  return <HomeComponent />;
}
