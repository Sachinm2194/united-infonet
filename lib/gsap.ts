"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins exactly once, and only in the browser.
// Next.js renders this module on the server too, where `window` doesn't exist —
// GSAP/ScrollTrigger must never touch the DOM at that point.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger, useGSAP };