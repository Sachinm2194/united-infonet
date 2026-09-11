const laptopComputerRepairService = {
  title: "Laptop & Computer Repair Service",

  description:
    "Professional diagnosis, repair, troubleshooting, upgrades, and maintenance for laptops, desktops, and business computers.",

  intro: {
    eyebrow: "LAPTOP & COMPUTER REPAIR",
    title: "Computer Problems? We Can Help.",
    description:
      "From cracked displays and power problems to motherboard faults, liquid damage, startup issues, and hardware upgrades, our technicians provide professional computer repair services.",
    ctaText: "Request a Repair",
  },

  problems: {
    eyebrow: "COMMON COMPUTER PROBLEMS",
    title: "Problems We Fix",
    description:
      "Our repair service covers common hardware failures, system problems, physical damage, and performance issues.",

    categories: [
      {
        id: "display",
        title: "Display Problems",
        items: [
          "LCD / LED cracked display screen",
          "Computer switches on but has no or dark display",
          "Black or garbled display output",
        ],
      },

      {
        id: "power",
        title: "Power & Charging",
        items: [
          "Broken charger",
          "Faulty charging socket",
          "No power",
        ],
      },

      {
        id: "hardware",
        title: "Hardware Problems",
        items: [
          "Faulty motherboard / logic board",
          "Faulty internal hardware",
          "Erratic or slow startup",
          "Random restarts",
        ],
      },

      {
        id: "damage",
        title: "Physical Damage",
        items: [
          "Liquid damage",
          "Water damage",
          "Fire damage",
          "Shock damage",
        ],
      },

      {
        id: "software",
        title: "Software & System Issues",
        items: [
          "Windows Blue Screen errors (BSOD)",
          "Device and driver installation",
          "Device and driver troubleshooting",
        ],
      },

      {
        id: "upgrades",
        title: "Hardware Upgrades",
        items: [
          "CPU upgrades",
          "Memory upgrades",
          "Hard drive upgrades",
          "Other hardware upgrades",
        ],
      },
    ],
  },

  repairServices: {
    eyebrow: "OUR SERVICES",
    title: "More Than Just Repairs",
    services: [
      {
        title: "Hardware Diagnosis",
        description:
          "Identify hardware faults and determine the right repair approach.",
      },
      {
        title: "Component Repair",
        description:
          "Repair or replace faulty computer hardware components where applicable.",
      },
      {
        title: "System Troubleshooting",
        description:
          "Resolve startup, display, operating system, driver, and performance issues.",
      },
      {
        title: "Hardware Upgrades",
        description:
          "Upgrade memory, storage, CPU, and other compatible hardware.",
      },
    ],
  },

  damageRepair: {
    eyebrow: "PHYSICAL DAMAGE",
    title: "Liquid, Fire or Shock Damage?",
    description:
      "We provide assessment and repair support for computers affected by liquid, water, fire, or physical shock damage.",
    ctaText: "Get Your Device Assessed",
  },

  upgradeServices: {
    eyebrow: "UPGRADES",
    title: "Give Your Computer a Performance Boost",
    description:
      "Improve the performance and usability of compatible systems with hardware upgrades such as memory, storage, CPU, and other components.",
    upgrades: [
      "CPU",
      "Memory",
      "Hard Drives",
      "Other Compatible Components",
    ],
  },

  repairProcess: {
    eyebrow: "OUR REPAIR PROCESS",
    title: "From Problem to Working Computer",
    steps: [
      {
        number: "01",
        title: "Diagnose",
        description:
          "We inspect and test the computer to identify the problem.",
      },
      {
        number: "02",
        title: "Assess",
        description:
          "We determine the required repair or replacement.",
      },
      {
        number: "03",
        title: "Repair",
        description:
          "Faulty components and system issues are professionally addressed.",
      },
      {
        number: "04",
        title: "Test",
        description:
          "The computer is tested to verify proper operation.",
      },
      {
        number: "05",
        title: "Return",
        description:
          "Your repaired computer is prepared for return.",
      },
    ],
  },

  cta: {
    eyebrow: "NEED COMPUTER REPAIR?",
    title: "Something wrong with your laptop or computer?",
    description:
      "Tell us what is happening with your device and our team can help identify the next step.",
    primaryButton: "Request a Repair",
    secondaryButton: "Get an Estimate",
  },
};

export default laptopComputerRepairService;