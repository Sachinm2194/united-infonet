import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveIcon } from "@/lib/icon-map";
import { productCatalog, type ProductNode, type QuoteAction } from "@/lib/product";

const ACTION_LABELS: Record<QuoteAction, string> = {
  buy: "Request a Quote — Buy",
  rent: "Request a Quote — Rent",
  amc: "Request AMC",
  sell: "Request Sell / Buyback",
};

function getCategoryImage(slug: string) {
  const category = productCatalog.find((item) => item.slug === slug);
  return category?.image;
}

function buildContactHref(action: QuoteAction, productSlug: string) {
  const params = new URLSearchParams({
    type: action,
    product: productSlug,
  });
  return `/contact?${params.toString()}`;
}

type ProductDetailViewProps = {
  node: ProductNode;
};

export function ProductDetailView({ node }: ProductDetailViewProps) {
  const image = node.image ?? getCategoryImage(node.slug);
  const Icon = resolveIcon(node.icon);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-12">
      <div className="relative mx-auto aspect-[5/6] w-full max-w-sm overflow-hidden rounded-2xl border border-border-subtle bg-black lg:mx-0">
        {image ? (
          <Image
            src={image}
            alt={node.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 22rem"
            className="object-contain p-5"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="flex size-20 items-center justify-center rounded-xl border border-border bg-card text-brand">
              <Icon className="size-10" aria-hidden />
            </div>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Product</p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          {node.name}
        </h1>
        {node.shortDescription && (
          <p className="mt-4 max-w-prose text-sm text-secondary sm:text-base">
            {node.shortDescription}
          </p>
        )}

        {node.isPlaceholder ? (
          <Card className="mt-6 border-brand/30 bg-brand/5">
            <CardContent className="p-4 text-sm leading-6 text-secondary">
              Contact us for current models and availability.
            </CardContent>
          </Card>
        ) : node.specs?.length ? (
          <Card className="mt-6 border-border-subtle shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Specifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <dl className="divide-y divide-border">
                {node.specs.map((spec) => (
                  <div
                    key={`${spec.label}-${spec.value}`}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <dt className="text-secondary">{spec.label}</dt>
                    <dd className="font-medium text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ) : null}

        {node.conditionOptions?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {node.conditionOptions.map((condition) => (
              <span
                key={condition}
                className="inline-flex rounded-full border border-border-subtle bg-card px-3 py-1 text-xs font-medium text-secondary"
              >
                {condition}
              </span>
            ))}
          </div>
        ) : null}

        {node.availableActions?.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {node.availableActions.map((action) => (
              <Link
                key={action}
                href={buildContactHref(action, node.slug)}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-brand-hover"
              >
                {ACTION_LABELS[action]}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
