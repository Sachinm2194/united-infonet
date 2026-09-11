"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Wraps the app so all scrolling goes through Lenis (inertia/smoothing),
 * while keeping GSAP's ScrollTrigger perfectly synced to that scroll position.
 *
 * Without this sync step, ScrollTrigger reads the raw browser scroll position
 * while Lenis is still easing toward it — pinned sections and scrubbed
 * animations will jitter and drift out of alignment.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who've asked the OS for reduced motion —
    // skip inertia scrolling entirely and let the page behave natively.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      allowNestedScroll: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const handleMobileMenuChange = (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail?.open;
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("mobile-menu-change", handleMobileMenuChange);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener("mobile-menu-change", handleMobileMenuChange);
    };
  }, []);

  return <>{children}</>;
}