// Auto-generated TypeScript data. All supplied fields and values preserved.
export const isrSeriesCardsAndModulesData = {
  slug: "isr-series-cards-and-modules",
  banner: "/banners/isr-series-cards-banner.png",
  "category": "ISR Series Cards & Modules",
  "brand": "Cisco",
  "description": "Cisco ISR Series Cards and Modules provide additional WAN, Ethernet, serial, and voice interfaces for Cisco Integrated Services Routers. The listed Ethernet WAN modules operate as routed Layer 3 ports. Layer 2 switching between local ports on the module or between module ports and other router ports is not supported. Cisco Gigabit Ethernet WAN modules do not support Power over Ethernet (PoE).",
  "products": [
    {
      "series": "ISR Series Cards & Modules",
      "series_name": "ISR Series Cards & Modules",
      "images": [
        "/products/isr-series-cards/isr-series-cards-and-modules/isr-series-cards-and-modules-01.png",
        "/products/isr-series-cards/isr-series-cards-and-modules/isr-series-cards-and-modules-02.png",
        "/products/isr-series-cards/isr-series-cards-and-modules/isr-series-cards-and-modules-03.png",
        "/products/isr-series-cards/isr-series-cards-and-modules/isr-series-cards-and-modules-04.png",
        "/products/isr-series-cards/isr-series-cards-and-modules/isr-series-cards-and-modules-05.png"
      ],
      "description": "Cisco ISR Series Cards and Modules provide additional WAN, Ethernet, serial, and voice interfaces for Cisco Integrated Services Routers. The listed Ethernet WAN modules operate as routed Layer 3 ports. Layer 2 switching between local ports on the module or between module ports and other router ports is not supported. Cisco Gigabit Ethernet WAN modules do not support Power over Ethernet (PoE).",
      "models": [
    {
      "part_number": "NIM-4E/M",
      "product_name": "Cisco NIM-4E/M",
      "description": "Analog voice network interface card NIM-4E/M",
      "module_type": "Network Interface Module",
      "interface_type": "Analog Voice",
      "specifications": {
        "ports": 4,
        "interface": "E/M",
        "function": "Analog voice"
      }
    },
    {
      "part_number": "NIM-2FXS",
      "product_name": "Cisco NIM-2FXS",
      "description": "Cisco Analog voice network interface card NIM-2FXS",
      "module_type": "Network Interface Module",
      "interface_type": "Analog Voice",
      "specifications": {
        "ports": 2,
        "interface": "FXS",
        "function": "Analog voice"
      }
    },
    {
      "part_number": "NIM-1GE-CU-SFP",
      "product_name": "Cisco NIM-1GE-CU-SFP",
      "description": "1-Port Gigabit Ethernet WAN Network Interface Module NIM-1GE-CU-SFP",
      "module_type": "Network Interface Module",
      "interface_type": "Gigabit Ethernet WAN",
      "specifications": {
        "ports": 1,
        "speed": "Gigabit Ethernet",
        "wan": true,
        "copper_interface": "CU",
        "sfp_support": true,
        "poe": false,
        "port_mode": "Routed Layer 3"
      }
    },
    {
      "part_number": "NIM-2GE-CU-SFP",
      "product_name": "Cisco NIM-2GE-CU-SFP",
      "description": "2-Port Gigabit Ethernet WAN Modules NIM-2GE-CU-SFP",
      "module_type": "Network Interface Module",
      "interface_type": "Gigabit Ethernet WAN",
      "specifications": {
        "ports": 2,
        "speed": "Gigabit Ethernet",
        "wan": true,
        "copper_interface": "CU",
        "sfp_support": true,
        "poe": false,
        "port_mode": "Routed Layer 3"
      }
    },
    {
      "part_number": "NIM-4FXO",
      "product_name": "Cisco NIM-4FXO",
      "description": "NIM-4FXO 4-port Network Interface Module - FXO",
      "module_type": "Network Interface Module",
      "interface_type": "Analog Voice",
      "specifications": {
        "ports": 4,
        "interface": "FXO",
        "function": "Analog voice / telephony"
      }
    },
    {
      "part_number": "NIM-2T",
      "product_name": "Cisco NIM-2T",
      "description": "2-Port Serial WAN Interface card",
      "module_type": "Network Interface Module",
      "interface_type": "Serial WAN",
      "specifications": {
        "ports": 2,
        "interface": "Serial",
        "function": "WAN connectivity"
      }
    },
    {
      "part_number": "NIM-1CE1T1-PRI",
      "product_name": "Cisco NIM-1CE1T1-PRI",
      "description": "Multiflex Trunk Voice and WAN network interface module",
      "module_type": "Network Interface Module",
      "interface_type": "Voice and WAN",
      "specifications": {
        "interface": "CE1/T1 PRI",
        "function": "Multiflex trunk voice and WAN",
        "supports": [
          "Voice",
          "WAN"
        ]
      }
    }
      ]
    }
  ],
  "ethernet_wan_modules": [
    {
      "part_number": "NIM-1GE-CU-SFP",
      "description": "Cisco 1-Port Gigabit Ethernet WAN Network Interface Module",
      "ports": 1,
      "speed": "Gigabit Ethernet",
      "poe": false
    },
    {
      "part_number": "NIM-2GE-CU-SFP",
      "description": "Cisco 2-Port Gigabit Ethernet WAN Network Interface Module",
      "ports": 2,
      "speed": "Gigabit Ethernet",
      "poe": false
    },
    {
      "part_number": "SM-X-6X1G",
      "description": "Cisco 6-Port High-Density Gigabit Ethernet WAN Service Module",
      "ports": 6,
      "speed": "Gigabit Ethernet",
      "module_type": "Service Module",
      "poe": false
    },
    {
      "part_number": "SM-X-4X1G-1X10G",
      "description": "Cisco 4-Port High-Density Gigabit or 1-Port 10 Gigabit Ethernet WAN Service Module",
      "ports": {
        "gigabit_ethernet": 4,
        "10_gigabit_ethernet": 1
      },
      "module_type": "Service Module",
      "poe": false,
      "operating_modes": [
        {
          "mode": "4-port Gigabit Ethernet",
          "available_ports": 4
        },
        {
          "mode": "1-port 10 Gigabit Ethernet",
          "available_ports": 1,
          "restriction": "Using the 10 Gigabit Ethernet port disables the other ports"
        }
      ]
    }
  ],
  "technical_details": {
    "port_operation": "The ports on these modules work as routed Layer 3 ports.",
    "layer_2_switching": "Layer 2 switching between local ports on the module or between ports on the module and other ports within the router system is not supported.",
    "external_switching": "The port terminates Layer 2 trunks from externally connected switches.",
    "vlan_handling": "Layer 2 trunk and VLAN information is not switched onto other ports in the system.",
    "routing": "The host router routes all traffic entering these modules.",
    "gigabit_ethernet_poe": false
  },
  "summary": {
    "total_individual_listed_skus": 7,
    "listed_skus": [
      "NIM-4E/M",
      "NIM-2FXS",
      "NIM-1GE-CU-SFP",
      "NIM-2GE-CU-SFP",
      "NIM-4FXO",
      "NIM-2T",
      "NIM-1CE1T1-PRI"
    ],
    "ethernet_wan_module_types_described": 4,
    "additional_ethernet_wan_service_module_skus_described": [
      "SM-X-6X1G",
      "SM-X-4X1G-1X10G"
    ]
  }
} as const;
