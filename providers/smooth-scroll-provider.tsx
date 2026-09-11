"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

function refreshScrollMeasurements() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

function resetDocumentScrollState() {
  const html = document.documentElement;
  const body = document.body;

  html.classList.remove("menu-open", "lenis", "lenis-smooth", "lenis-stopped");
  html.style.overflow = "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
}

/**
 * Keeps ScrollTrigger measurements in sync with the native document scrollbar.
 * The site uses normal browser scrolling (no smooth-scroll hijacking) so every
 * page can be scrolled fully from top to bottom on all devices.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    resetDocumentScrollState();
    refreshScrollMeasurements();

    const handleResize = () => refreshScrollMeasurements();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("load", handleResize);
      resetDocumentScrollState();
    };
  }, []);

  return <>{children}</>;
}
