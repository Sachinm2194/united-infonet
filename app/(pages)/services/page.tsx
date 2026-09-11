import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buildServicePath, serviceMenuCatalog } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our services at United Infonet.",
};

export default function ServicesPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="border-b border-border-subtle pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">What We Do</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Services</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary sm:text-base">
          Explore repair, recovery, installation, and infrastructure services from United Infonet.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceMenuCatalog.map((service) => (
          <Link
            key={service.slug}
            href={buildServicePath(service.slug)}
            className="group border border-border-subtle p-5 transition-colors hover:border-brand"
          >
            <h2 className="text-base font-semibold text-foreground">{service.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{service.description}</p>
            <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              View service
            </span>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
