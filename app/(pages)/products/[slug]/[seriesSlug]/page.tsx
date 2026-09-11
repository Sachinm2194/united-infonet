import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryBanner } from "@/components/products/category-banner";
import { SeriesDetailView } from "@/components/products/series-detail-view";
import { findSeries, getSeriesPageTitle } from "@/lib/products";

type SeriesPageProps = {
  params: Promise<{ slug: string; seriesSlug: string }>;
};

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { slug, seriesSlug } = await params;
  const result = findSeries(slug, seriesSlug);

  return {
    title: result ? getSeriesPageTitle(result.series) : "Products",
    description:
      result?.series.description ??
      `Explore ${result?.category.category ?? "networking products"} at United Infonet.`,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug, seriesSlug } = await params;
  const result = findSeries(slug, seriesSlug);

  if (!result) notFound();

  const { category, series } = result;

  return (
    <>
      <CategoryBanner banner={category.banner} title={category.category} />
      <SeriesDetailView
        categoryName={category.category}
        series={{ ...series, series_name: getSeriesPageTitle(series) }}
      />
    </>
  );
}
