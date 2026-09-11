import { ProductCategoryCard } from "@/components/home/product-category-card";
import type { ProductNode } from "@/lib/product";

type ProductListViewProps = {
  nodes: ProductNode[];
  basePath: string;
};

function joinProductPath(basePath: string, slug: string) {
  const normalizedBase = basePath.replace(/\/$/, "");
  return `${normalizedBase}/${slug}`;
}

export function ProductListView({ nodes, basePath }: ProductListViewProps) {
  return (
    <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {nodes.map((node) => (
        <ProductCategoryCard
          key={node.slug}
          product={node}
          href={joinProductPath(basePath, node.slug)}
        />
      ))}
    </div>
  );
}
