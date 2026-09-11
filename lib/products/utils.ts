import { findCategory, productCatalog } from "./catalog";

export interface ProductSeriesEntry {
  readonly series: string;
  readonly series_name: string;
  readonly description?: string;
}

export interface NavSeriesItem {
  slug: string;
  name: string;
}

export interface NavCategoryItem {
  slug: string;
  name: string;
  children: NavSeriesItem[];
}

export function seriesToSlug(series: string): string {
  return series
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSeriesName(entry: ProductSeriesEntry): string {
  return entry.series;
}

export function getSeriesPageTitle(entry: ProductSeriesEntry): string {
  return entry.series_name;
}

export function getCategorySeries(category: {
  products?: readonly ProductSeriesEntry[];
}): NavSeriesItem[] {
  if (!category.products?.length) return [];

  const slugCounts = new Map<string, number>();

  return category.products.map((item) => {
    const baseSlug = seriesToSlug(item.series);
    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);

    return {
      slug: count === 0 ? baseSlug : `${baseSlug}-${count + 1}`,
      name: getSeriesName(item),
    };
  });
}

export function buildSeriesPath(categorySlug: string, seriesSlug: string): string {
  return `/products/${categorySlug}/${seriesSlug}`;
}

export function findSeries(categorySlug: string, seriesSlug: string) {
  const category = findCategory(categorySlug);
  if (!category?.products?.length) return undefined;

  const seriesList = getCategorySeries(category);
  const seriesIndex = seriesList.findIndex((item) => item.slug === seriesSlug);
  if (seriesIndex === -1) return undefined;

  const series = category.products[seriesIndex];
  return { category, series, seriesSlug };
}

export function getNavProductMenu(): NavCategoryItem[] {
  return productCatalog.map((category) => ({
    slug: category.slug,
    name: category.category,
    children: getCategorySeries(category),
  }));
}
