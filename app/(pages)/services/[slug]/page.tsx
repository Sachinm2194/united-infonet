import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { CategoryBanner } from "@/components/products/category-banner";
import { CiscoRepairServicePage } from "@/components/services/cisco-repair-service-page";
import { FoundryRepairServicePage } from "@/components/services/foundry-repair-service-page";
import { JuniperRepairServicePage } from "@/components/services/juniper-repair-service-page";
import { LaptopComputerRepairServicePage } from "@/components/services/laptop-computer-repair-service-page";
import { NetworkDevicesServicePage } from "@/components/services/network-devices-service-page";
import { OperatingSystemInstallationServicePage } from "@/components/services/operating-system-installation-service-page";
import { ServerRepairServicePage } from "@/components/services/server-repair-service-page";
import { ItAssetRecoveryServicePage } from "@/components/services/it-asset-recovery-service-page";
import { ItRecyclingEnvironmentServicePage } from "@/components/services/it-recycling-environment-service-page";
import { ServiceDetailView } from "@/components/services/service-detail-view";
import { findServiceMenuItem } from "@/lib/services";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findServiceMenuItem(slug);

  return {
    title: service?.title ?? "Services",
    description: service?.description ?? "Explore our services at United Infonet.",
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = findServiceMenuItem(slug);

  if (!service) notFound();

  return (
    <>
      <CategoryBanner banner="/banners/solutions-banner.png" title="Services" />
      {service.slug === "cisco-repair-service" ? (
        <CiscoRepairServicePage />
      ) : service.slug === "juniper-networks-repair-service" ? (
        <JuniperRepairServicePage />
      ) : service.slug === "foundry-repair-service" ? (
        <FoundryRepairServicePage />
      ) : service.slug === "laptop-computer-repair-service" ? (
        <LaptopComputerRepairServicePage />
      ) : service.slug === "server-repair-service" ? (
        <ServerRepairServicePage />
      ) : service.slug === "operating-system-installation" ? (
        <OperatingSystemInstallationServicePage />
      ) : service.slug === "network-devices" ? (
        <NetworkDevicesServicePage />
      ) : service.slug === "it-recycling-environment" ? (
        <ItRecyclingEnvironmentServicePage />
      ) : service.slug === "it-asset-recovery" ? (
        <ItAssetRecoveryServicePage />
      ) : (
        <ServiceDetailView service={service} />
      )}
      <section className="border-t border-border-subtle bg-section-alt">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Need this service?</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Request a tailored quote.</h2>
          </div>
          <Link
            href={`/contact?type=consult&product=${encodeURIComponent(service.title)}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-brand px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-brand-hover"
          >
            Get a Quote <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
