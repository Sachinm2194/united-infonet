/**
 * Single source of truth for all product data.
 *
 * Structure is a recursive tree: Category -> (Brand) -> Series -> (Model).
 * Depth varies by category — Routers/Switches/Modules go Category -> Series,
 * while Firewalls and Wireless APs go Category -> Brand -> Series/Model,
 * because that's how your source docs actually organize them.
 *
 * Every surface (navbar dropdown, /products listing, /products/[...slug]
 * detail pages) reads from this same tree — build once, render at
 * different depths per surface. See buildProductPath() at the bottom for
 * the routing helper.
 */

export type ProductCondition = "New" | "Used" | "Refurbished";
export type QuoteAction = "buy" | "rent" | "amc" | "sell";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductNode {
  /** Unique within its parent's children, used to build the URL slug path */
  slug: string;
  name: string;
  /** Short line for cards/nav — one sentence max */
  shortDescription?: string;
  /** Lucide icon name, e.g. "Router", "Server" — resolve via a lookup map in the component */
  icon?: string;
  /** Public image path for cards and listings, e.g. "/products/router.png" */
  image?: string;
  /** Only present on leaf/near-leaf nodes with real spec data */
  specs?: ProductSpec[];
  /** Which commercial actions apply — feeds the "Request a Quote" flow's pre-fill */
  availableActions?: QuoteAction[];
  conditionOptions?: ProductCondition[];
  /** True only for entries with no backing in your company docs — render with a
   * "details on request" note instead of fabricated specs. Remove this flag
   * once real data is supplied. */
  isPlaceholder?: boolean;
  children?: ProductNode[];
}

export const productCatalog: ProductNode[] = [
  {
    slug: "routers",
    name: "Routers",
    shortDescription:
      "Routing platforms for branch, campus and enterprise networks.",
    icon: "Router",
    image: "/products/router.png",
    availableActions: ["buy", "rent", "amc", "sell"],
    conditionOptions: ["New", "Used", "Refurbished"],
    children: [
      {
        slug: "1000-series",
        name: "1000 Series",
        specs: [{ label: "Series", value: "1000" }],
      },
      {
        slug: "2000-series",
        name: "2000 Series",
        specs: [{ label: "Series", value: "2000" }],
      },
      {
        slug: "3000-series",
        name: "3000 Series",
        specs: [{ label: "Series", value: "3000" }],
      },
      {
        slug: "4000-series",
        name: "4000 Series",
        specs: [{ label: "Series", value: "4000" }],
      },
      {
        slug: "8000-series",
        name: "8000 Series",
        specs: [
          { label: "Series", value: "8000" },
          { label: "Model", value: "8300" },
        ],
      },
    ],
  },
  {
    slug: "switches",
    name: "Switches",
    shortDescription: "Switching hardware for wired connectivity.",
    icon: "Network",
    image: "/products/switch.png",
    availableActions: ["buy", "rent", "amc", "sell"],
    conditionOptions: ["New", "Used", "Refurbished"],
    children: [
      {
        slug: "2000-series",
        name: "2000 Series",
        specs: [{ label: "Series", value: "2000" }],
      },
      {
        slug: "3000-series",
        name: "3000 Series",
        specs: [{ label: "Series", value: "3000" }],
      },
      {
        slug: "9000-series",
        name: "9000 Series",
        specs: [{ label: "Series", value: "9000" }],
        children: [
          { slug: "9200", name: "9200" },
          { slug: "9300", name: "9300" },
          { slug: "9500", name: "9500" },
        ],
      },
    ],
  },
  {
    slug: "firewalls",
    name: "Firewalls",
    shortDescription:
      "Security appliances for controlled and protected traffic.",
    icon: "ShieldCheck",
    image: "/products/firewall.png",
    availableActions: ["buy", "rent", "amc"],
    conditionOptions: ["New", "Used", "Refurbished"],
    children: [
      {
        slug: "fortigate",
        name: "FortiGate",
        shortDescription: "Fortinet firewall appliances.",
      },
      {
        slug: "cisco",
        name: "Cisco Firewalls",
        shortDescription: "Cisco firewall appliances.",
      },
    ],
  },
  {
    slug: "wireless-access-points",
    name: "Wireless Access Points & Controllers",
    shortDescription: "Wireless infrastructure for consistent user access.",
    icon: "Wifi",
    image: "/products/access-point.png",
    availableActions: ["buy", "rent", "amc"],
    conditionOptions: ["New", "Used", "Refurbished"],
    children: [
      {
        slug: "cisco",
        name: "Cisco",
        children: [
          { slug: "1000-series", name: "1000 Series" },
          { slug: "2000-series", name: "2000 Series" },
          { slug: "3000-series", name: "3000 Series" },
          {
            slug: "9000-series",
            name: "9000 Series",
            children: [
              { slug: "9105-ax-1d", name: "9105-AX-1D" },
              { slug: "9115", name: "9115" },
              { slug: "9120", name: "9120" },
              { slug: "9130", name: "9130" },
            ],
          },
        ],
      },
      {
        slug: "aruba",
        name: "Aruba",
        shortDescription: "All models available.",
      },
    ],
  },
  {
    slug: "ip-phones",
    name: "IP Phones",
    shortDescription: "Business communication equipment for connected teams.",
    icon: "Phone",
    image: "/products/ip-phones.png",
    isPlaceholder: true,
    availableActions: ["buy", "rent"],
    conditionOptions: ["New", "Used", "Refurbished"],
    // No series/model data exists in your source docs yet — this category
    // renders on the site but with a "contact us for current models" note
    // instead of a fabricated spec list. Populate `children` once you have
    // real model data.
  },
  // {
  //   slug: "servers",
  //   name: "Servers",
  //   shortDescription:
  //     "Server hardware for infrastructure and workload requirements.",
  //   icon: "Server",
  //   isPlaceholder: true,
  //   availableActions: ["rent", "amc"],
  //   conditionOptions: ["New", "Used", "Refurbished"],
  //   // Currently only documented under Rental Services (Dell/Lenovo/Microsoft
  //   // laptops + generic "servers" line item) — no dedicated server product
  //   // line exists in your docs. `availableActions` deliberately omits "buy"
  //   // until that's confirmed; adjust once you have real sales data.
  // },
  {
    slug: "uplink-or-network-module",
    name: "Uplink Or Network Module",
    shortDescription: "The components that keep enterprise equipment useful.",
    icon: "Cpu",
    image: "/products/module.png",
    availableActions: ["buy", "sell"],
    conditionOptions: ["New", "Used", "Refurbished"],
    children: [
      { slug: "1g", name: "1G Modules" },
      { slug: "10g", name: "10G Modules" },
      { slug: "25g", name: "25G Modules" },
      { slug: "40g", name: "40/100G Modules" },
      { slug: "100g", name: "100G Modules" },
    ],
  },
];

/** Depth-limited view for the navbar — category -> immediate children only (2 levels). */
export function getNavProductMenu() {
  return productCatalog.map((category) => ({
    slug: category.slug,
    name: category.name,
    icon: category.icon,
    children: category.children?.map((child) => ({
      slug: child.slug,
      name: child.name,
    })),
  }));
}

/** Builds a `/products/...` URL from a slug path array. */
export function buildProductPath(slugPath: string[]): string {
  if (slugPath.length === 0) return "/products";
  return `/products/${slugPath.join("/")}`;
}

/** Walks the tree by a slug path, e.g. ["wireless-access-points","cisco","9000-series"]. */
export function findProductNode(
  slugPath: string[],
  nodes: ProductNode[] = productCatalog,
): ProductNode | undefined {
  if (slugPath.length === 0) return undefined;
  const [head, ...rest] = slugPath;
  const match = nodes.find((n) => n.slug === head);
  if (!match) return undefined;
  if (rest.length === 0) return match;
  if (!match.children) return undefined;
  return findProductNode(rest, match.children);
}

/** Builds the full slug path from root to a given node — for breadcrumbs. */
export function buildBreadcrumb(
  slugPath: string[],
  nodes: ProductNode[] = productCatalog,
  trail: ProductNode[] = [],
): ProductNode[] {
  if (slugPath.length === 0) return trail;
  const [head, ...rest] = slugPath;
  const match = nodes.find((n) => n.slug === head);
  if (!match) return trail;
  const nextTrail = [...trail, match];
  if (rest.length === 0 || !match.children) return nextTrail;
  return buildBreadcrumb(rest, match.children, nextTrail);
}
