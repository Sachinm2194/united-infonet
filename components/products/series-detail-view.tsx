"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";

import { PageContainer } from "@/components/layout/page-container";

type SeriesModel = {
  model?: string | null;
  part_number?: string | null;
  product_name?: string | null;
  description?: string | null;
};

type SeriesDetail = {
  series_name: string;
  description?: string;
  images?: readonly string[];
  models?: readonly SeriesModel[];
};

type SeriesDetailViewProps = {
  series: SeriesDetail;
  categoryName: string;
};

export function SeriesDetailView({ series, categoryName }: SeriesDetailViewProps) {
  const images = series.images ?? [];
  const models = series.models ?? [];
  const [activeImage, setActiveImage] = useState(0);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const visibleModels = normalizedQuery
    ? models.filter((model) =>
        [model.model, model.part_number, model.product_name, model.description]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery)),
      )
    : models;

  const goToImage = (direction: number) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <>
      <PageContainer className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{categoryName}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {series.series_name}
            </h1>
            {series.description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
                {series.description}
              </p>
            ) : null}
          </div>

          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border-subtle bg-card">
              {images.length ? (
                <Image
                  src={images[activeImage]}
                  alt={`${series.series_name} product image ${activeImage + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted/10 px-6 text-center text-sm text-secondary">
                  Product images will be added soon.
                </div>
              )}
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => goToImage(-1)}
                    aria-label="Previous product image"
                    className="absolute cursor-pointer left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/85 text-background transition hover:bg-brand"
                  >
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToImage(1)}
                    aria-label="Next product image"
                    className="absolute cursor-pointer   right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/85 text-background transition hover:bg-brand"
                  >
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded bg-foreground/85 px-2 py-1 text-xs font-medium text-background">
                    {activeImage + 1} / {images.length}
                  </span>
                </>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    className={`relative aspect-[16/9] overflow-hidden rounded-md border bg-card transition ${
                      activeImage === index ? "border-brand ring-1 ring-brand" : "border-border-subtle"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 25vw, 10vw"
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </PageContainer>

      <section className="border-y border-border-subtle bg-section-alt">
        <PageContainer className="py-8 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Models in this Series</h2>
            {models.length ? (
              <label className="relative block w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" aria-hidden />
                <span className="sr-only">Search models</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search model or part number..."
                  className="h-10 w-full rounded-md border border-input-border bg-card pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-secondary focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </label>
            ) : null}
          </div>

          {models.length ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-secondary">
                    <th className="px-3 py-3 font-semibold">Product Name</th>
                    <th className="px-3 py-3 font-semibold">Part Number</th>
                    <th className="px-3 py-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleModels.map((model, index) => (
                    <tr key={`${model.product_name ?? model.model ?? "model"}-${index}`} className="border-b border-border-subtle align-top">
                      <td className="px-3 py-3 font-semibold text-foreground">{model.product_name ?? model.model ?? "-"}</td>
                      <td className="px-3 py-3 text-secondary">{model.part_number ?? model.model ?? "-"}</td>
                      <td className="px-3 py-3 leading-relaxed text-secondary">{model.description ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!visibleModels.length ? <p className="py-8 text-center text-sm text-secondary">No matching models found.</p> : null}
            </div>
          ) : (
            <p className="mt-5 text-sm text-secondary">Model details are available on request.</p>
          )}
        </PageContainer>
      </section>
    </>
  );
}
