"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import { resolveIcon } from "@/lib/icon-map";
import { findCategory, getCategorySeries, buildSeriesPath } from "@/lib/products";
import type { ProductNode } from "@/lib/product-tree";
import { cn } from "@/lib/utils";

const productRouteSlugs: Record<string, string> = {
  "ip-phones": "cisco-unified-voip-phones",
  "uplink-or-network-module": "modules",
};

export function ProductCategoryCard({
  product,
  className,
  href,
}: {
  product: ProductNode;
  className?: string;
  href?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();
  const Icon = resolveIcon(product.icon);
  const routeSlug = productRouteSlugs[product.slug] ?? product.slug;
  const routeCategory = findCategory(routeSlug);
  const series = routeCategory
    ? getCategorySeries(routeCategory)
    : (product.children ?? []).map((child) => ({
        slug: child.slug,
        name: child.name,
      }));

  return (
    <div
      className={cn(
        "group block h-full [perspective:1200px]",
        className,
      )}
    >
      <div className={cn("relative h-[18.75rem] w-full transition-transform duration-500 [transform-style:preserve-3d] sm:h-[19.75rem]", isFlipped && "[transform:rotateY(180deg)]")}>
        <button
          type="button"
          data-card
          aria-label={`Show ${product.name} series`}
          onClick={() => (href ? router.push(href) : setIsFlipped(true))}
          className="absolute inset-0 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border-subtle bg-[#F9FBFD] text-left shadow-[0_10px_28px_rgba(15,23,42,0.1)] transition-shadow duration-300 hover:border-brand/35 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--brand)_22%,rgba(15,23,42,0.12))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:bg-[#1C242C] dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)] sm:h-[19.75rem] [backface-visibility:hidden]"
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

          <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" aria-hidden />
        </button>

        <div
          aria-label={`${product.name} series`}
          className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-xl border border-brand/30 bg-card p-4 shadow-[0_18px_40px_rgba(15,23,42,0.16)] [backface-visibility:hidden] [transform:rotateY(180deg)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand">Browse series</p>
              <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">{product.name}</h3>
            </div>
            <button
              type="button"
              aria-label={`Back to ${product.name}`}
              onClick={() => setIsFlipped(false)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
            </button>
          </div>
          {series.length > 0 ? (
            <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1 [scrollbar-color:color-mix(in_srgb,var(--brand)_55%,transparent)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/50">
              {series.map((item) => (
                <Link
                  key={item.slug}
                  href={buildSeriesPath(routeSlug, item.slug)}
                  className="flex items-center justify-between gap-2 rounded-md px-2 py-2 text-xs text-foreground transition-colors hover:bg-accent-subtle hover:text-brand"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="size-3 shrink-0" aria-hidden />
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-secondary">Details available on request.</p>
          )}
        </div>
      </div>
    </div>
  );
}
