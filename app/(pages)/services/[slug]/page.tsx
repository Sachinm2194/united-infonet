import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    </>
  );
}
