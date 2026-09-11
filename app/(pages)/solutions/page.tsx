import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryBanner } from "@/components/products/category-banner";
import { PageContainer } from "@/components/layout/page-container";
import { buildSolutionPath, solutionCatalog } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Explore United Infonet networking, rental, maintenance, and repair solutions.",
};

export default function SolutionsPage() {
  return (
    <>
      <CategoryBanner banner="/banners/solutions-banner.png" title="Solutions" />
      <PageContainer className="py-8 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Our Solutions</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Networking solutions for every stage of your infrastructure
        </h1>
        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {solutionCatalog.map((solution) => (
            <Link
              key={solution.slug}
              href={buildSolutionPath(solution.slug)}
              className="group flex min-h-16 items-center gap-3 border-b border-border-subtle py-4"
            >
              <ArrowRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
              <span className="text-sm font-medium text-foreground">{solution.name}</span>
            </Link>
          ))}
        </div>
      </PageContainer>
    </>
  );
}