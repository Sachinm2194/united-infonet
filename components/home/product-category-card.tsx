import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { resolveIcon } from "@/lib/icon-map";
import { buildProductPath, type ProductNode } from "@/lib/product-tree";
import { cn } from "@/lib/utils";

export function ProductCategoryCard({
  product,
  className,
  href,
}: {
  product: ProductNode;
  className?: string;
  href?: string;
}) {
  const linkHref = href ?? buildProductPath([product.slug]);
  const Icon = resolveIcon(product.icon);

  return (
    <Link href={linkHref} className={cn("group block h-full", className)}>
      <article
        data-card
        className="relative flex h-[18.75rem] w-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-[#F9FBFD] shadow-[0_10px_28px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--brand)_22%,rgba(15,23,42,0.12))] dark:bg-[#1C242C] dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_18px_44px_color-mix(in_srgb,var(--brand)_28%,rgba(0,0,0,0.4))] sm:h-[19.75rem]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />

        <div className="relative h-[11.75rem] shrink-0 overflow-hidden sm:h-[12.25rem]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--brand)_14%,transparent),transparent_58%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
              className="z-[1] object-contain p-2.5 transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:p-3"
            />
          ) : (
            <div className="absolute inset-0 z-[1] flex items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                <Icon className="size-6" aria-hidden />
              </div>
            </div>
          )}
        </div>

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col p-3">
          <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand">
            {product.name}
          </h3>
          {product.shortDescription && (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-secondary">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-auto flex justify-end pt-2">
            <span
              className="flex size-8 items-center justify-center rounded-full border border-brand/25 bg-brand/5 text-brand transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-on-accent"
              aria-hidden
            >
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full"
          aria-hidden
        />
      </article>
    </Link>
  );
}
