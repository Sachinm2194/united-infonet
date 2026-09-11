import ciscoDevicesSupport from "./cisco-devices-support";
import itEquipmentRentalSupport from "./it-equipment-rental-support";
import networkingAmcServices from "./networking-amc-services";
import repairServiceSupport from "./repair-service-support";

export type SolutionContent = {
  slug: string;
  name: string;
  description: string;
  items: SolutionItem[];
};

export type SolutionItem = string | { title: string; description: string };

export const solutionCatalog: SolutionContent[] = [
  {
    slug: "it-equipment-rental-support",
    name: "IT Equipment Rental Support",
    description: "Flexible rental options for networking, server, and end-user equipment for short- and long-term requirements.",
    items: itEquipmentRentalSupport,
  },
  {
    slug: "repair-service-support",
    name: "Repair Service Support",
    description: "Testing, diagnosis, and repair support for network hardware, servers, laptops, computers, and related equipment.",
    items: repairServiceSupport,
  },
  {
    slug: "networking-amc-services",
    name: "Networking AMC Services",
    description: "Annual maintenance contracts for dependable support across networking equipment, servers, laptops, and computers.",
    items: networkingAmcServices,
  },
  {
    slug: "cisco-devices-support",
    name: "Cisco Devices Support",
    description: ciscoDevicesSupport.description,
    items: ciscoDevicesSupport.services,
  },
];

export function findSolution(slug: string): SolutionContent | undefined {
  return solutionCatalog.find((solution) => solution.slug === slug);
}

export function buildSolutionPath(slug: string): string {
  return `/solutions/${slug}`;
}