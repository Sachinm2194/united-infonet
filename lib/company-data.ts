import type { LucideIcon } from "lucide-react";
import {
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  Cable,
  CloudCog,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  LifeBuoy,
  Network,
  Package,
  PackageCheck,
  RefreshCcw,
  RefreshCw,
  Router,
  School,
  Server,
  ShieldCheck,
  ShoppingBag,
  Wrench,
} from "lucide-react";

export type Icon = LucideIcon;

export type CardItem = {
  title: string;
  description: string;
  icon: React.ElementType;
  decoration?: "lines" | "rings" | "shield" | "gear" | "network" | "refresh";
};

export const services: CardItem[] = [
  {
    title: "Sales",
    description:
      "New, used and refurbished equipment for practical infrastructure needs.",
    icon: Package,
    decoration: "lines",
  },
  {
    title: "Rental & Leasing",
    description:
      "Flexible enterprise hardware rental for changing requirements.",
    icon: Boxes,
    decoration: "rings",
  },
  {
    title: "AMC",
    description:
      "Annual maintenance contracts for dependable ongoing support.",
    icon: ShieldCheck,
    decoration: "shield",
  },
  {
    title: "Repair",
    description:
      "Repair services and technical support for critical equipment.",
    icon: Wrench,
    decoration: "gear",
  },
  {
    title: "Network Consulting",
    description:
      "Network consulting and implementation for connected workplaces.",
    icon: Network,
    decoration: "network",
  },
  {
    title: "Asset Recovery",
    description:
      "Asset recovery and buyback with secure, responsible handling.",
    icon: RefreshCw,
    decoration: "refresh",
  },
];

export const products: CardItem[] = [
  { title: "Routers", description: "Routing platforms for branch, campus and enterprise networks.", icon: Router },
  { title: "Switches", description: "Switching hardware for reliable wired connectivity.", icon: Network },
  { title: "Firewalls", description: "Security appliances for controlled and protected traffic.", icon: ShieldCheck },
  { title: "Wireless Access Points & Controllers", description: "Wireless infrastructure for consistent user access.", icon: CloudCog },
  { title: "IP Phones", description: "Business communication equipment for connected teams.", icon: LifeBuoy },
  { title: "Servers", description: "Server hardware for infrastructure and workload requirements.", icon: Server },
  { title: "Uplink Or Network Module", description: "The components that keep enterprise equipment useful.", icon: Cpu },
];

export const whyPoints: CardItem[] = [
  { title: "10+ years industry expertise", description: "Practical knowledge across enterprise infrastructure requirements.", icon: BadgeCheck },
  { title: "End-to-end infrastructure support", description: "From design and procurement through implementation and support.", icon: Boxes },
  { title: "Enterprise IT infrastructure", description: "Focused capability across hardware, networking and security.", icon: Server },
  { title: "Sales, rental and AMC", description: "Flexible commercial and support options for different needs.", icon: RefreshCcw },
  { title: "EOL/EOS hardware support", description: "Support pathways for equipment beyond standard lifecycle stages.", icon: LifeBuoy },
  { title: "Solutions-first approach", description: "Recommendations shaped around the requirement, not a one-size-fits-all package.", icon: Wrench },
  { title: "Integrity and transparency", description: "Clear, responsible communication throughout the engagement.", icon: ShieldCheck },
];

export const networking = [
  "LAN/WAN Design & Implementation",
  "Structured Cabling",
  "Core Routing & Switching",
  "Network Monitoring",
  "Wireless Network Solutions",
  "Campus & Enterprise Network Integration",
];

export const security = [
  "Endpoint Security",
  "Next-Generation Firewall / UTM",
  "Advanced Threat Protection",
  "Web & Email Filtering",
  "DLP",
  "Security Compliance & Audits",
];

export const commercialFeatures: CardItem[] = [
  { title: "Sales", description: "New, used and refurbished equipment for practical infrastructure needs.", icon: ShoppingBag },
  { title: "Rental & Leasing", description: "Flexible enterprise hardware rental that helps teams match infrastructure to current requirements.", icon: PackageCheck },
  { title: "AMC Support", description: "Annual maintenance contracts that keep support structured around the equipment and environment.", icon: BadgeCheck },
];

export const recoverySteps = [
  { title: "Assess", icon: Boxes },
  { title: "Collect", icon: PackageCheck },
  { title: "Secure Data Destruction", icon: ShieldCheck },
  { title: "Buyback / Recovery", icon: RefreshCcw },
  { title: "Responsible Disposal", icon: ArchiveRestore },
];

export const industries: CardItem[] = [
  { title: "BFSI", description: "Infrastructure considerations for financial environments.", icon: Landmark },
  { title: "Education", description: "Connected learning and administration environments.", icon: GraduationCap },
  { title: "Manufacturing", description: "Reliable connectivity for operational workplaces.", icon: Factory },
  { title: "Healthcare", description: "Infrastructure support for connected care environments.", icon: HeartPulse },
  { title: "IT / ITES", description: "Scalable infrastructure for technology-led teams.", icon: School },
  { title: "Government", description: "Structured infrastructure for public-service environments.", icon: Cable },
];

export const brands = [
  { name: "Cisco", src: "/partners/Cisco-logo.png" },
  { name: "Dell", src: "/partners/Dell-Log.webp" },
  { name: "Fortinet", src: "/partners/fortinet-logo.png" },
  { name: "HPE Aruba", src: "/partners/Hpe-aruba-networking-logo.svg.webp" },
  { name: "Microsoft", src: "/partners/microsoft-logo.png" },
  { name: "Redington", src: "/partners/redington-logo.png" },
];

export const faqs = [
  { question: "Do you supply new, used and refurbished equipment?", answer: "Yes. United Infonet supports sales of new, used and refurbished enterprise equipment based on the requirement." },
  { question: "Do you offer equipment rental?", answer: "Rental and leasing options are available for flexible enterprise hardware requirements." },
  { question: "What does AMC support cover?", answer: "Annual Maintenance Contracts provide a structured approach to ongoing equipment support." },
  { question: "Can you support EOL/EOS hardware?", answer: "United Infonet provides support options for equipment that has reached end-of-life or end-of-support stages." },
  { question: "What networking equipment do you support?", answer: "The offering includes routers, switches, firewalls, wireless infrastructure, and Uplink Or Network Modules." },
  { question: "Do you handle network implementation?", answer: "Yes. Network consulting and implementation services cover LAN/WAN, routing, switching, wireless and enterprise integration." },
  { question: "Do you provide asset buyback?", answer: "Asset recovery and buyback support includes assessment, collection, secure data destruction and responsible disposal." },
  { question: "Where is United Infonet based?", answer: "United Infonet is a Bengaluru-based IT infrastructure company." },
];
