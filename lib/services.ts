/**
 * Single source of truth for all service data. Flat structure — one level
 * only: each service is a single page, with `features` as descriptive
 * bullet points (not separate routable sub-pages/dropdowns).
 *
 * The 6 top-level match what's already live in your "What We Do" section:
 * Sales, Rental & Leasing, AMC, Repair, Network Consulting, Asset Recovery.
 *
 * NOTE — Security Solutions: your docs document this as its own full
 * category (endpoint security, next-gen firewall/UTM, threat protection,
 * web/email filtering, DLP, compliance audits) but it is NOT currently one
 * of the 6 live service cards. Included here as a 7th entry so the data
 * isn't silently dropped — delete this node if you'd rather keep exactly 6.
 */

import ciscoRepairService from "@/lib/services/cisco-repair-service";
import foundryRepairService from "@/lib/services/foundry-repair-service";
import itAssetRecovery from "@/lib/services/it-asset-recovery";
import itRecyclingEnvironment from "@/lib/services/it-recycling-environment";
import juniperNetworksRepairService from "@/lib/services/juniper-networks-repair-service";
import laptopComputerRepairService from "@/lib/services/laptop-computer-repair-service";
import networkDevices from "@/lib/services/network-devices";
import operatingSystemInstallation from "@/lib/services/operating-system-installation";
import serverRepairService from "@/lib/services/server-repair-service";

export type QuoteAction = "buy" | "rent" | "amc" | "repair" | "sell" | "consult";

export type ServiceMenuItem = {
  slug: string;
  title: string;
  description: string;
};

export const serviceMenuCatalog: ServiceMenuItem[] = [
  { slug: "cisco-repair-service", ...ciscoRepairService },
  { slug: "juniper-networks-repair-service", ...juniperNetworksRepairService },
  { slug: "foundry-repair-service", ...foundryRepairService },
  { slug: "laptop-computer-repair-service", ...laptopComputerRepairService },
  { slug: "server-repair-service", ...serverRepairService },
  { slug: "operating-system-installation", ...operatingSystemInstallation },
  { slug: "network-devices", ...networkDevices },
  { slug: "it-recycling-environment", ...itRecyclingEnvironment },
  { slug: "it-asset-recovery", ...itAssetRecovery },
];

export function findServiceMenuItem(slug: string): ServiceMenuItem | undefined {
  return serviceMenuCatalog.find((service) => service.slug === slug);
}

export interface ServiceNode {
  slug: string;
  name: string;
  /** Short line for cards/nav — one sentence max */
  shortDescription?: string;
  /** Longer paragraph for the service's own detail page */
  description?: string;
  /** Lucide icon name, e.g. "ShoppingCart", "Wrench" — resolve via a lookup map in the component */
  icon?: string;
  /** Bullet points shown on the service's own page — descriptive only, not separate routes */
  features?: string[];
  /** Which "Request a Quote" flow types this service maps to */
  availableActions?: QuoteAction[];
  /** True only for entries with no backing in your company docs. */
  isPlaceholder?: boolean;
}

export const serviceCatalog: ServiceNode[] = [
  {
    slug: "sales",
    name: "Sales",
    shortDescription: "New, used, and refurbished equipment.",
    icon: "ShoppingCart",
    availableActions: ["buy"],
    isPlaceholder: true,
    // Not explicitly named as a standalone "service" in your docs — inferred
    // from the products themselves being available, and from the Buy-Back
    // program's mention of "new, used, or refurbished" equipment. Consider
    // linking this page's content directly to the product catalog rather
    // than writing separate service copy for it.
  },
  {
    slug: "rental-leasing",
    name: "Rental & Leasing",
    shortDescription: "Short-term and long-term hardware rental.",
    description:
      "Flexible and cost-effective IT rental services tailored to short-term and project-specific needs — testing, training, or events, with fast deployment and scalability.",
    icon: "CalendarClock",
    availableActions: ["rent"],
    features: [
      "Routers",
      "Switches",
      "Firewalls",
      "Servers",
      "Laptops",
      "Network accessories",
    ],
  },
  {
    slug: "amc",
    name: "AMC",
    shortDescription: "Annual maintenance contracts for dependable ongoing support.",
    description:
      "Proactive maintenance, troubleshooting, and support for your IT infrastructure — covering active and passive network components, with specialist support for EOL/EOS Cisco hardware.",
    icon: "ShieldCheck",
    availableActions: ["amc"],
    features: [
      "Proactive maintenance & troubleshooting",
      "Active & passive network component support",
      "EOL/EOS Cisco hardware support",
      "Dedicated on-site & remote assistance",
    ],
  },
  {
    slug: "repair",
    name: "Repair",
    shortDescription: "Repair services and technical support for critical equipment.",
    icon: "Wrench",
    availableActions: ["repair"],
    isPlaceholder: true,
    // No backing in either source document — "chip-level repair" specifically
    // has zero documentation. AMC covers maintenance/troubleshooting, but a
    // standalone repair service isn't described. Populate once confirmed.
  },
  {
    slug: "network-consulting",
    name: "Network Consulting",
    shortDescription: "Network consulting and implementation for connected workplaces.",
    description:
      "End-to-end IT infrastructure solutions from design and procurement to implementation and ongoing support.",
    icon: "Network",
    availableActions: ["consult"],
    features: [
      "IT infrastructure design & implementation",
      "Enterprise networking — LAN/WAN design, structured cabling, core routing & switching, network monitoring, wireless network solutions, campus & enterprise integration",
      "Data center setup & virtualization",
      "System integration & technology upgrades",
    ],
  },
  {
    slug: "asset-recovery",
    name: "Asset Recovery",
    shortDescription: "Asset recovery and buyback with secure, responsible handling.",
    description:
      "Secure, efficient, and environmentally responsible recovery of used routers, switches, servers, and telephony equipment — removing logistical hassles and maximizing returns.",
    icon: "Recycle",
    availableActions: ["sell"],
    features: [
      "IT Hardware Buy-Back Program",
      "Secure data destruction & logistics",
      "Refurbish & responsible disposal",
    ],
  },
  {
    slug: "security-solutions",
    name: "Security Solutions",
    shortDescription: "End-to-end security architecture for your infrastructure.",
    description:
      "Advanced, scalable, and compliant security solutions designed to protect your infrastructure end to end.",
    icon: "Lock",
    availableActions: ["consult"],
    // See file-level note above — not currently one of the 6 live cards.
    features: [
      "Endpoint security for desktops & servers",
      "Next-gen firewall & UTM solutions",
      "Advanced threat protection & response",
      "Web & email filtering solutions",
      "Data Loss Prevention (DLP)",
      "Information security compliance & audits",
    ],
  },
];

/** Flat list for the navbar dropdown — no nested flyout, just Category -> single list. */
export function getNavServiceMenu() {
  return serviceCatalog.map((service) => ({
    slug: service.slug,
    name: service.name,
    icon: service.icon,
    shortDescription: service.shortDescription,
  }));
}

export function findServiceNode(slug: string): ServiceNode | undefined {
  return serviceCatalog.find((s) => s.slug === slug);
}

/** Builds a `/services/...` URL from a service slug. */
export function buildServicePath(slug?: string): string {
  if (!slug) return "/services";
  return `/services/${slug}`;
}