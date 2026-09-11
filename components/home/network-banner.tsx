"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  ParticleNetworkCanvas,
  USE_DARK_THEME_COLORS,
} from "./particle-network-canvas";

interface NetworkBannerProps {
  title?: string;
  subtitle?: string;
}

export function NetworkBanner({
  title = "United Infonet",
  subtitle = "Performance. Security. Reliability.",
}: NetworkBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(titleMaskRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 18 });

      if (prefersReducedMotion) {
        gsap.set(titleMaskRef.current, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(subtitleRef.current, { autoAlpha: 1, y: 0 });
        return;
      }

      // Entrance timeline — this banner sits above the fold, so it plays on
      // load rather than waiting on a scroll trigger. A brief delay lets the
      // canvas mount and the layout settle before the curtain lifts.
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(titleMaskRef.current, {
        clipPath: "inset(0 0 0% 0)",
        ease: "power3.out",
        duration: 0.8,
      }).to(
        subtitleRef.current,
        { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.5 },
        "-=0.35"
      );

      // Subtle depth parallax as the page scrolls past the banner —
      // the network drifts slower than the page, giving it a sense of depth
      // without any scroll-jacking/pinning (banner is fixed-height, not a
      // full-viewport pinned hero).
      gsap.to(canvasWrapRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative h-[25rem] w-full overflow-hidden ${
        USE_DARK_THEME_COLORS ? "bg-[#050a0f]" : "bg-background"
      }`}
    >
      <div ref={canvasWrapRef} className="absolute inset-0 h-[120%] w-full">
        <ParticleNetworkCanvas />
      </div>

      {/* Scrim for text legibility — darker at the bottom where the headline sits */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
            USE_DARK_THEME_COLORS
              ? "from-[#050a0f]/90 via-transparent to-[#050a0f]/35"
              : "from-background/75 via-transparent to-background/25"
          }`}
        />

        <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-10 sm:px-10 sm:pb-14 md:px-16">
          <h1
            className={`max-w-2xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${
              USE_DARK_THEME_COLORS ? "text-white" : "text-foreground"
            }`}
          >
            <span
              ref={titleMaskRef}
              className="inline-block"
            style={{ clipPath: "inset(0 0 100% 0)" }}
          >
            {title}
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className={`mt-3 max-w-md text-sm sm:text-base ${
            USE_DARK_THEME_COLORS ? "text-slate-300" : "text-secondary"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}