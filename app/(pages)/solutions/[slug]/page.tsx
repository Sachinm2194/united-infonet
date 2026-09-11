import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryBanner } from "@/components/products/category-banner";
import { SolutionDetailView } from "@/components/solutions/solution-detail-view";
import { findSolution } from "@/lib/solutions";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = findSolution(slug);

  return {
    title: solution?.name ?? "Solutions",
    description: solution?.description ?? "Explore United Infonet solutions.",
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = findSolution(slug);

  if (!solution) notFound();

  return (
    <>
      <CategoryBanner banner="/banners/solutions-banner.png" title="Solutions" />
      <SolutionDetailView solution={solution} />
    </>
  );
}