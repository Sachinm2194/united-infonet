/**
 * Cisco Small Business Switches catalogue
 * Converted from the supplied catalogue data without removing fields,
 * descriptions, specifications, SKUs, or summary information.
 */

export type SpecificationValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | Record<string, unknown>;

export interface ProductModel {
  part_number: string;
  product_name: string;
  description: string;
  specifications: Record<string, SpecificationValue>;
}

export interface ProductSeries {
  series: string;
  series_name: string;
  description: string;
  images?: string[];
  models: ProductModel[];
}

export interface ProductCategory {
  slug: string;
  banner: string;
  category: string;
  brand: string;
  description: string;
  products: ProductSeries[];
  summary: {
    total_subcategories: number;
    total_individual_skus: number;
    sku_count_by_subcategory: Record<string, number>;
    all_skus: string[];
  };
}

export const ciscoSmallBusinessSwitchesData: ProductCategory = {
  slug: "cisco-small-business-switches",
  banner: "/banners/cisco-small-business-switches-banner.png",
  "category": "Cisco Small Business Switches",
  "brand": "Cisco",
  "description": "Cisco Small Business switches for small and medium-sized business networking environments, including Gigabit Ethernet, Fast Ethernet, PoE/PoE+, SFP, combo ports, and stackable managed switches.",
  "products": [
    {
      "series": "Cisco 300 Series",
      "series_name": "Cisco 300 Series",
      "images": [
        "/products/cisco-small-business-switches/cisco-300-series/cisco-300-series-01.png",
        "/products/cisco-small-business-switches/cisco-300-series/cisco-300-series-02.png",
        "/products/cisco-small-business-switches/cisco-300-series/cisco-300-series-03.png",
        "/products/cisco-small-business-switches/cisco-300-series/cisco-300-series-04.png",
        "/products/cisco-small-business-switches/cisco-300-series/cisco-300-series-05.png"
      ],
      "description": "Cisco 300 Series Small Business managed switches with Fast Ethernet and Gigabit Ethernet connectivity, PoE/PoE+ options, and combo mini-GBIC ports.",
      "models": [
        {
          "part_number": "SG300-10",
          "product_name": "Cisco SG300-10",
          "description": "8 10/100/1000 ports, 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 10,
            "copper_ports": 8,
            "copper_speed": "10/100/1000 Mbps",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-10P",
          "product_name": "Cisco SG300-10P",
          "description": "8 10/100/1000 PoE ports with 62W power budget, 2 Combo mini-GBIC ports",
          "specifications": {
            "ports": 10,
            "poe_ports": 8,
            "port_speed": "10/100/1000 Mbps",
            "poe": true,
            "poe_power_budget": "62 W",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-28PP-K9",
          "product_name": "Cisco SG300-28PP-K9",
          "description": "26 10/100/1000 ports (24 PoE+ ports with 180W power budget), 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 26,
            "copper_ports": 26,
            "port_speed": "10/100/1000 Mbps",
            "poe_plus_ports": 24,
            "poe_plus": true,
            "poe_power_budget": "180 W",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-28SFP",
          "product_name": "Cisco SG300-28SFP",
          "description": "26 10/100/1000 ports (SFP), 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 26,
            "interface_type": "SFP",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-52MP",
          "product_name": "Cisco SG300-52MP",
          "description": "50 10/100/1000 ports (48 PoE+ ports with 740W power budget), 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 50,
            "port_speed": "10/100/1000 Mbps",
            "poe_plus_ports": 48,
            "poe_plus": true,
            "poe_power_budget": "740 W",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-52P",
          "product_name": "Cisco SG300-52P",
          "description": "50 10/100/1000 ports (48 PoE+ ports with 375W power budget), 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 50,
            "port_speed": "10/100/1000 Mbps",
            "poe_plus_ports": 48,
            "poe_plus": true,
            "poe_power_budget": "375 W",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-52",
          "product_name": "Cisco SG300-52",
          "description": "50 10/100/1000 ports, 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 50,
            "port_speed": "10/100/1000 Mbps",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-28MP",
          "product_name": "Cisco SG300-28MP",
          "description": "26 10/100/1000 ports (24 PoE+ ports with 375W power budget), 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 26,
            "port_speed": "10/100/1000 Mbps",
            "poe_plus_ports": 24,
            "poe_plus": true,
            "poe_power_budget": "375 W",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-28",
          "product_name": "Cisco SG300-28",
          "description": "26 10/100/1000 ports, 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 26,
            "port_speed": "10/100/1000 Mbps",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SG300-20",
          "product_name": "Cisco SG300-20",
          "description": "18 10/100/1000 ports, 2 combo mini-GBIC ports",
          "specifications": {
            "ports": 18,
            "port_speed": "10/100/1000 Mbps",
            "combo_ports": 2,
            "combo_type": "Mini-GBIC"
          }
        },
        {
          "part_number": "SF300-08",
          "product_name": "Cisco SF300-08",
          "description": "8 10/100 ports",
          "specifications": {
            "ports": 8,
            "port_speed": "10/100 Mbps"
          }
        }
      ]
    },
    {
      "series": "Cisco 350 Series",
      "series_name": "Cisco 350 Series",
      "images": [
        "/products/cisco-small-business-switches/cisco-350-series/cisco-350-series-01.png",
        "/products/cisco-small-business-switches/cisco-350-series/cisco-350-series-02.png",
        "/products/cisco-small-business-switches/cisco-350-series/cisco-350-series-03.png",
        "/products/cisco-small-business-switches/cisco-350-series/cisco-350-series-04.png"
      ],
      "description": "Cisco 350 Series Small Business managed switches with Gigabit Ethernet, PoE, PoE+, SFP, and combo copper/SFP connectivity.",
      "models": [
        {
          "part_number": "SG350-28P",
          "product_name": "Cisco SG350-28P",
          "description": "24 10/100/1000 ports (24 PoE ports with 195W power budget), 2 Gigabit copper/SFP combo + 2 SFP ports",
          "specifications": {
            "total_ports": 28,
            "copper_ports": 24,
            "port_speed": "10/100/1000 Mbps",
            "poe_ports": 24,
            "poe_power_budget": "195 W",
            "combo_ports": 2,
            "combo_type": "Gigabit copper/SFP",
            "sfp_ports": 2
          }
        },
        {
          "part_number": "SG350-28SFP",
          "product_name": "Cisco SG350-28SFP",
          "description": "24 SFP Gigabit slots, 2 Gigabit copper/SFP combo",
          "specifications": {
            "total_ports": 28,
            "sfp_gigabit_slots": 24,
            "combo_ports": 2,
            "combo_type": "Gigabit copper/SFP"
          }
        },
        {
          "part_number": "SG350-52",
          "product_name": "Cisco SG350-52",
          "description": "48 10/100/1000 ports, 2 Gigabit copper/SFP combo + 2 SFP ports",
          "specifications": {
            "total_ports": 52,
            "copper_ports": 48,
            "port_speed": "10/100/1000 Mbps",
            "combo_ports": 2,
            "combo_type": "Gigabit copper/SFP",
            "sfp_ports": 2
          }
        },
        {
          "part_number": "SF350-24MP",
          "product_name": "Cisco SF350-24MP",
          "description": "24 10/100 PoE+ ports with 375W power budget, 2 Gigabit copper/SFP combo + 2 SFP ports",
          "specifications": {
            "total_ports": 28,
            "poe_plus_ports": 24,
            "port_speed": "10/100 Mbps",
            "poe_plus": true,
            "poe_power_budget": "375 W",
            "combo_ports": 2,
            "combo_type": "Gigabit copper/SFP",
            "sfp_ports": 2
          }
        }
      ]
    },
    {
      "series": "Cisco 500 Series",
      "series_name": "Cisco 500 Series",
      "images": [
        "/products/cisco-small-business-switches/cisco-500-series/cisco-500-series-01.png",
        "/products/cisco-small-business-switches/cisco-500-series/cisco-500-series-02.png",
        "/products/cisco-small-business-switches/cisco-500-series/cisco-500-series-03.png",
        "/products/cisco-small-business-switches/cisco-500-series/cisco-500-series-04.png"
      ],
      "description": "Cisco 500 Series stackable managed Small Business switches, including Gigabit PoE/PoE+ and 10-Gigabit uplink models.",
      "models": [
        {
          "part_number": "SG500X-48MP",
          "product_name": "Cisco SG500X-48MP",
          "description": "48-Port Gigabit POE with 4-Port 10-Gigabit Stackable Managed Switch",
          "specifications": {
            "gigabit_ports": 48,
            "poe": true,
            "uplink_ports": 4,
            "uplink_speed": "10 Gigabit",
            "switch_type": "Stackable Managed Switch"
          }
        },
        {
          "part_number": "SG500X-24P",
          "product_name": "Cisco SG500X-24P",
          "description": "4P GB POE with 4Port 10GB Stackable Managed Switch",
          "specifications": {
            "poe": true,
            "gigabit_poe_ports": 24,
            "uplink_ports": 4,
            "uplink_speed": "10 Gigabit",
            "switch_type": "Stackable Managed Switch"
          }
        },
        {
          "part_number": "SG500-52MP",
          "product_name": "Cisco SG500-52MP",
          "description": "52-port Gigabit Max PoE+ Stackable Managed Switch",
          "specifications": {
            "ports": 52,
            "port_speed": "Gigabit",
            "poe_plus": true,
            "switch_type": "Stackable Managed Switch"
          }
        },
        {
          "part_number": "SG500-28P",
          "product_name": "Cisco SG500-28P",
          "description": "28-port Gigabit POE Stackable Managed Switch",
          "specifications": {
            "ports": 28,
            "port_speed": "Gigabit",
            "poe": true,
            "switch_type": "Stackable Managed Switch"
          }
        },
        {
          "part_number": "SF500-48P",
          "product_name": "Cisco SF500-48P",
          "description": "48-Port 10/100 PoE Stackable Managed Switch",
          "specifications": {
            "ports": 48,
            "port_speed": "10/100 Mbps",
            "poe": true,
            "switch_type": "Stackable Managed Switch"
          }
        },
        {
          "part_number": "SG500XG-8F8T",
          "product_name": "Cisco SG500XG-8F8T",
          "description": "16-port 10-Gigabit Stackable Managed Switch",
          "specifications": {
            "ports": 16,
            "port_speed": "10 Gigabit",
            "switch_type": "Stackable Managed Switch"
          }
        }
      ]
    }
  ],
  "summary": {
    "total_subcategories": 3,
    "total_individual_skus": 21,
    "sku_count_by_subcategory": {
      "Cisco 300 Series": 11,
      "Cisco 350 Series": 4,
      "Cisco 500 Series": 6
    },
    "all_skus": [
      "SG300-10",
      "SG300-10P",
      "SG300-28PP-K9",
      "SG300-28SFP",
      "SG300-52MP",
      "SG300-52P",
      "SG300-52",
      "SG300-28MP",
      "SG300-28",
      "SG300-20",
      "SF300-08",
      "SG350-28P",
      "SG350-28SFP",
      "SG350-52",
      "SF350-24MP",
      "SG500X-48MP",
      "SG500X-24P",
      "SG500-52MP",
      "SG500-28P",
      "SF500-48P",
      "SG500XG-8F8T"
    ]
  }
};

export default ciscoSmallBusinessSwitchesData;
