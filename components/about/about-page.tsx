"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Check,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PageContainer } from "@/components/layout/page-container";
import { ValuesNetwork } from "@/components/about/values-network";

const stats = [
  { target: 10, suffix: "+", label: "Years of expertise" },
  { target: 500, suffix: "+", label: "Projects supported" },
  { target: 24, suffix: "/7", label: "Support mindset" },
  { target: 100, suffix: "%", label: "Solutions-first" },
];

const milestones = [
  { year: "2015", title: "United Infonet begins", progress: 0.1 },
  { year: "2018", title: "Expanding enterprise capability", progress: 0.34 },
  { year: "2021", title: "End-to-end support takes shape", progress: 0.62 },
  { year: "2026", title: "Ready for what is next", progress: 0.9 },
];

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroBadgesRef = useRef<HTMLDivElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);
  const approachImageRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelDotRef = useRef<SVGCircleElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const badgeItems =
        heroBadgesRef.current?.querySelectorAll("[data-badge]") ?? [];
      const storyImage = storyImageRef.current;
      const approachImage = approachImageRef.current;
      const milestones = milestonesRef.current;
      const path = pathRef.current;
      const dot = travelDotRef.current;
      const statValues =
        pageRef.current?.querySelectorAll<HTMLElement>("[data-stat-value]");

      statValues?.forEach((node, index) => {
        const stat = stats[index];
        if (stat) node.textContent = `${stat.target}${stat.suffix}`;
      });

      if (reduced) {
        gsap.set(
          [
            badgeItems,
            storyImage,
            approachImage,
            path,
            milestones?.querySelectorAll("[data-milestone]"),
          ],
          { autoAlpha: 1, clearProps: "all" },
        );
        return;
      }

      statValues?.forEach((node, index) => {
        const stat = stats[index];
        if (!stat) return;
        const counter = { value: 0 };
        node.textContent = `0${stat.suffix}`;
        gsap.to(counter, {
          value: stat.target,
          duration: 1.5,
          delay: 0.35,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = `${Math.round(counter.value)}${stat.suffix}`;
          },
        });
      });

      gsap.fromTo(
        badgeItems,
        { autoAlpha: 0, x: 55 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.35)",
        },
      );

      if (storyImage) {
        gsap.fromTo(
          storyImage,
          { xPercent: mobile ? 0 : 40, y: mobile ? 28 : 0, autoAlpha: 0 },
          {
            xPercent: 0,
            y: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: storyImage,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      }
      if (approachImage) {
        gsap.fromTo(
          approachImage,
          { xPercent: mobile ? 0 : -40, y: mobile ? 28 : 0, autoAlpha: 0 },
          {
            xPercent: 0,
            y: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: approachImage,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      }

      if (milestones && path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: milestones,
            start: "top 78%",
            end: "bottom 65%",
            scrub: true,
            onUpdate: (self) => {
              milestones
                .querySelectorAll<HTMLElement>("[data-milestone]")
                .forEach((node) => {
                  const active = Number(node.dataset.progress) <= self.progress;
                  gsap.to(node, {
                    scale: active ? 1.08 : 1,
                    autoAlpha: active ? 1 : 0.55,
                    duration: 0.2,
                    overwrite: true,
                  });
                });
            },
          },
        });
        if (dot && !mobile) {
          gsap.to(dot, {
            keyframes: [
              { x: 100, y: 98 },
              { x: 270, y: 38 },
              { x: 430, y: 115 },
              { x: 610, y: 46 },
              { x: 760, y: 88 },
            ],
            duration: 7,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      }
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef} className="bg-background text-foreground">
      <section className="overflow-hidden border-b border-border bg-section">
        <PageContainer className="grid gap-12 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.85fr)] lg:items-center lg:py-4">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              About Us
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Your Partner in <span className="text-brand">IT Networking</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-secondary sm:text-lg">
              We help businesses build dependable infrastructure through
              practical networking, security, hardware and lifecycle support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-on-accent hover:bg-brand-hover"
              >
                Explore Services <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-semibold hover:bg-card"
              >
                Talk to us <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(({ label, suffix }) => (
                <div
                  key={label}
                  className="rounded-lg border border-border-subtle bg-card p-3"
                >
                  <strong data-stat-value className="block text-xl text-brand">
                    0{suffix}
                  </strong>
                  <span className="mt-1 block text-xs text-secondary">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-xl">
            <Image
              src="/Images/hero-data-center-engineer.png"
              alt="Engineer working in a data center"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw  "
              className="object-contain"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent dark:from-background/75" />
            <div
              ref={heroBadgesRef}
              className="absolute right-4 top-5 flex flex-col gap-2 sm:right-6 sm:top-8"
            >
              {["Secure", "Scalable", "Reliable", "Future-Ready"].map(
                (badge, index) => (
                  <div
                    data-badge
                    key={badge}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-background/85 px-3 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-sm"
                  >
                    <Check className="size-3.5 text-brand" />
                    {badge}
                  </div>
                ),
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-border bg-section-alt">
        <PageContainer className="grid gap-10 py-8 sm:py-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Our Story
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built around the way infrastructure really works.
            </h2>
            <p className="mt-5 text-sm leading-7 text-secondary sm:text-base">
              United Infonet grew from a simple belief: technology decisions
              should be clear, useful and grounded in the environment they
              serve. Today, we bring together equipment expertise, network
              thinking and long-term support.
            </p>
            <blockquote className="mt-7 border-l-2 border-brand pl-5 text-base font-medium leading-7 text-foreground">
              “The best infrastructure is the infrastructure people can depend
              on.”
            </blockquote>
          </div>
          <div
            ref={storyImageRef}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-subtle shadow-lg"
          >
            <Image
              src="/Images/office-team-meeting.jpg"
              alt="United Infonet team meeting"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-border bg-section">
        <PageContainer className="py-8 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              What Drives Us
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Values that keep every connection meaningful.
            </h2>
          </div>
          <ValuesNetwork />
        </PageContainer>
      </section>

      <section className="border-b border-border bg-section-alt">
        <PageContainer className="grid gap-10 py-8 sm:py-12 md:grid-cols-2 md:items-center">
          <div
            ref={approachImageRef}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-subtle shadow-lg"
          >
            <Image
              src="/Images/network-infrastructure.jpg"
              alt="Network infrastructure equipment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-black/5 to-transparent p-6 dark:from-background/90 dark:via-background/10">
              <span className="text-xl font-semibold text-white">
                Building Connections That Matter
              </span>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Our Approach
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Practical by design. Reliable by nature.
            </h2>
            <p className="mt-5 text-sm leading-7 text-secondary sm:text-base">
              We listen first, design around the environment and stay
              accountable after deployment.
            </p>
            <ul className="mt-7 grid gap-4">
              {[
                "Understand the environment",
                "Design for today and tomorrow",
                "Deploy with care",
                "Support beyond the handover",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent-subtle text-brand">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover"
            >
              See how we help <ArrowRight className="size-4" />
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-border bg-section">
        <PageContainer className="py-8 sm:py-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Key Milestones
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A steady path forward.
            </h2>
          </div>
          <div
            ref={milestonesRef}
            className="relative mt-12 overflow-hidden rounded-2xl border border-border-subtle bg-card p-5 sm:p-10"
          >
            <svg
              viewBox="0 0 800 150"
              className="h-40 w-full overflow-visible"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d="M20 105 C130 15 190 140 300 65 S470 10 560 80 S690 135 780 35"
                stroke="currentColor"
                className="text-brand"
                strokeWidth="2"
              />
              <circle
                ref={travelDotRef}
                cx="20"
                cy="105"
                r="4"
                className="fill-brand"
              />
            </svg>
            <div className="mt-2 grid gap-5 sm:grid-cols-4">
              {milestones.map((milestone) => (
                <div
                  data-milestone
                  data-progress={milestone.progress}
                  key={milestone.year}
                  className="transition-transform"
                >
                  <span className="text-sm font-bold text-brand">
                    {milestone.year}
                  </span>
                  <p className="mt-2 text-sm font-medium">{milestone.title}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section
        ref={ctaRef}
        id="contact"
        className="relative overflow-hidden bg-section"
      >
        <Image
          src="/Images/global-network.jpg"
          alt="Global network connections"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/55" />
        <div className="relative">
          <PageContainer className="py-8 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Let&apos;s connect
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Infrastructure that moves your business forward.
            </h2>
            <Link
              href="/services"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-on-accent hover:bg-brand-hover"
            >
              Start a conversation <ArrowRight className="size-4" />
            </Link>
          </PageContainer>
        </div>
      </section>
    </div>
  );
}
