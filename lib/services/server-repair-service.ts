const serverRepairService = {
  title: "Server Repair & Service",

  description:
    "Professional testing, diagnosis, maintenance, and repair for file servers, power systems, UPS units, RAID storage, and server hardware.",

  intro: {
    eyebrow: "SERVER REPAIR & SERVICE",
    title: "Keep Your Server Running Reliably",
    description:
      "From power and UPS problems to RAID failures, shutdown issues, and unusual server noise, our technicians can diagnose and repair common file server hardware problems.",
    ctaText: "Request a Repair",
  },

  commonProblems: {
    eyebrow: "COMMON SERVER PROBLEMS",
    title: "Problems We Fix",
    description:
      "Our service covers common file server hardware and reliability issues.",

    problems: [
      {
        id: "power",
        number: "01",
        title: "No Power",
        description:
          "Server will not power on or shows no signs of power.",
      },
      {
        id: "ups",
        number: "02",
        title: "UPS Backup Failure",
        description:
          "UPS backup is not working correctly or fails to provide backup power.",
      },
      {
        id: "shutdown",
        number: "03",
        title: "Won't Shut Down",
        description:
          "Server remains running or does not complete the shutdown process.",
      },
      {
        id: "raid",
        number: "04",
        title: "RAID / Mirror Drive Failure",
        description:
          "Problems with RAID arrays, mirrored drives, or server storage.",
      },
      {
        id: "noise",
        number: "05",
        title: "Excessive Noise",
        description:
          "Unusual or increased server noise that may indicate a hardware problem.",
      },
    ],
  },

  serviceAreas: {
    eyebrow: "SERVER HARDWARE SUPPORT",
    title: "What We Diagnose",
    areas: [
      {
        title: "Power Systems",
        description:
          "Diagnosis of server power and startup problems.",
      },
      {
        title: "UPS Systems",
        description:
          "Assessment of UPS backup and power protection issues.",
      },
      {
        title: "RAID & Storage",
        description:
          "Troubleshooting RAID, mirrored drives, and storage failures.",
      },
      {
        title: "Server Hardware",
        description:
          "Investigation of hardware faults, unusual noise, and operational problems.",
      },
    ],
  },

  repairProcess: {
    eyebrow: "OUR REPAIR PROCESS",
    title: "Diagnose. Repair. Verify.",
    steps: [
      {
        number: "01",
        title: "Diagnose",
        description:
          "We inspect and test the server to identify the hardware problem.",
      },
      {
        number: "02",
        title: "Repair",
        description:
          "The identified hardware issue is professionally addressed.",
      },
      {
        number: "03",
        title: "Test",
        description:
          "The server is tested to verify proper operation.",
      },
      {
        number: "04",
        title: "Return",
        description:
          "The repaired server is prepared for return and deployment.",
      },
    ],
  },

  cta: {
    eyebrow: "SERVER HARDWARE PROBLEM?",
    title: "Something wrong with your file server?",
    description:
      "Tell us what is happening with your server and our team can help identify the right repair approach.",
    primaryButton: "Request a Repair",
    secondaryButton: "Get an Estimate",
  },
};

export default serverRepairService;