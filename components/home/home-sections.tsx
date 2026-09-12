"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  ArchiveRestore,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  RefreshCw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";
import { CommercialOptions } from "@/components/home/commercial-options";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  brands,
  faqs,
  industries,
  networking,
  recoverySteps,
  security,
  services,
  whyPoints,
  type CardItem,
} from "../../lib/company-data";
import { ProductCategoryCard } from "@/components/home/product-category-card";
import { productCatalog, type ProductNode } from "@/lib/product-tree";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-9 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-secondary sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function IconCard({
  item,
  className = "",
  size = "default",
  tilt = false,
}: {
  item: CardItem;
  className?: string;
  size?: "default" | "sm";
  tilt?: boolean;
}) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!tilt || !cardRef.current) return;
    const card = cardRef.current;
    const handleMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateX: -y * 4,
        rotateY: x * 4,
        duration: 0.25,
        overwrite: true,
      });
    };
    const reset = () =>
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.35 });
    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", reset);
    return () => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", reset);
      gsap.set(card, { clearProps: "transform" });
    };
  }, [tilt]);
  return (
    <div ref={cardRef} className={tilt ? "[perspective:800px]" : ""}>
      <Card
        size={size}
        data-card
        className={`group relative h-full rounded-lg border border-border-subtle bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl ${className}`}
      >
        <CardHeader>
          <div className="relative mb-3 flex size-11 items-center justify-center rounded-lg bg-accent-subtle text-brand">
            <span
              className="absolute inset-[-0.4rem] rounded-lg bg-brand/10 blur-xl"
              aria-hidden="true"
            />
            <Icon className="relative size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-base text-foreground">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="leading-6">
            {item.description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export function ServiceCard({ item }: { item: CardItem }) {
  const Icon = item.icon;

  return (
    <Card data-card className="group relative h-full min-h-[255px] overflow-hidden rounded-2xl border border-border-subtle bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:bg-card-hover hover:shadow-[0_20px_60px_color-mix(in_srgb,var(--shadow)_80%,transparent)]">
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Decorative graphic */}
      <ServiceDecoration type={item.decoration} />

      {/* Icon */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-accent-subtle transition-all duration-500 group-hover:border-brand/30 group-hover:bg-brand/10">
        <Icon
          strokeWidth={1.8}
          className="h-6 w-6 text-brand transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Text */}
      <div className="relative z-10 mt-7 max-w-[300px]">
        <h3 className="text-xl font-medium tracking-[-0.02em] text-foreground">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-secondary">
          {item.description}
        </p>
      </div>

      {/* CTA */}
      {/* <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-sm font-semibold text-brand">
        <span>Learn more</span>

        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div> */}

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
    </Card>
  );
}
function ServiceDecoration({
  type,
}: {
  type?: CardItem["decoration"];
}) {
  if (type === "lines") {
    return (
      <div className="pointer-events-none absolute -bottom-10 -right-8 rotate-[-18deg] opacity-40">
        <div className="relative h-44 w-56">
          <div className="absolute right-0 top-5 h-px w-48 bg-orange-500/50" />
          <div className="absolute right-0 top-12 h-px w-56 bg-orange-500/30" />
          <div className="absolute right-0 top-20 h-px w-44 bg-orange-500/20" />
          <div className="absolute right-10 top-28 h-px w-40 bg-orange-500/20" />

          <div className="absolute right-16 top-1 h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
        </div>
      </div>
    );
  }

  if (type === "rings") {
    return (
      <div className="pointer-events-none absolute -bottom-24 -right-20 opacity-40">
        <div className="relative h-64 w-64 rounded-full border border-orange-500/20">
          <div className="absolute inset-6 rounded-full border border-orange-500/15" />
          <div className="absolute inset-14 rounded-full border border-orange-500/20" />
        </div>
      </div>
    );
  }

  if (type === "shield") {
    return (
      <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-[0.12]">
        <ShieldCheck
          strokeWidth={0.8}
          className="h-40 w-40 text-orange-500"
        />
      </div>
    );
  }

  if (type === "gear") {
    return (
      <div className="pointer-events-none absolute -bottom-12 -right-8 opacity-[0.13]">
        <Wrench
          strokeWidth={0.7}
          className="h-40 w-40 rotate-[-25deg] text-orange-500"
        />
      </div>
    );
  }

  if (type === "network") {
    return (
      <div className="pointer-events-none absolute bottom-2 right-2 h-40 w-48 opacity-30">
        <svg
          viewBox="0 0 200 150"
          className="h-full w-full"
          fill="none"
        >
          <path
            d="M20 110 L70 70 L120 100 L175 40"
            stroke="currentColor"
            className="text-orange-500"
            strokeWidth="1"
          />

          <path
            d="M70 70 L100 25"
            stroke="currentColor"
            className="text-orange-500"
            strokeWidth="1"
          />

          <path
            d="M120 100 L150 135"
            stroke="currentColor"
            className="text-orange-500"
            strokeWidth="1"
          />

          <circle cx="20" cy="110" r="4" className="fill-orange-500" />
          <circle cx="70" cy="70" r="4" className="fill-orange-500" />
          <circle cx="120" cy="100" r="4" className="fill-orange-500" />
          <circle cx="175" cy="40" r="4" className="fill-orange-500" />
          <circle cx="100" cy="25" r="4" className="fill-orange-500" />
          <circle cx="150" cy="135" r="4" className="fill-orange-500" />
        </svg>
      </div>
    );
  }

  if (type === "refresh") {
    return (
      <div className="pointer-events-none absolute -bottom-8 -right-6 opacity-[0.15]">
        <RefreshCw
          strokeWidth={0.8}
          className="h-40 w-40 text-orange-500"
        />
      </div>
    );
  }

  return null;
}
function ProductCategoriesCarousel({ items }: { items: ProductNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth, scrollWidth } = container;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();

    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, items.length]);

  const scrollByDirection = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const firstSlide = container.querySelector<HTMLElement>("[data-product-slide]");
    const gap = 16;
    const slideWidth = firstSlide?.offsetWidth ?? container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -(slideWidth + gap) : slideWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-w-0">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Scroll product categories left"
          disabled={!canScrollLeft}
          onClick={() => scrollByDirection("left")}
          className="hidden size-10 shrink-0 rounded-full border-border bg-card text-foreground shadow-sm disabled:opacity-30 sm:inline-flex"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </Button>

        <div
          ref={scrollRef}
          className="flex min-w-0 flex-1 items-start gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              data-product-slide
              data-reveal
              key={item.slug}
              className="w-[min(78%,14rem)] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
            >
              <ProductCategoryCard product={item} />
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Scroll product categories right"
          disabled={!canScrollRight}
          onClick={() => scrollByDirection("right")}
          className={cn(
            "hidden size-10 shrink-0 rounded-full shadow-sm disabled:opacity-30 sm:inline-flex",
            canScrollRight
              ? "border-brand bg-brand text-on-accent hover:bg-brand-hover"
              : "border-border bg-card text-foreground",
          )}
        >
          <ChevronRight className="size-5" aria-hidden />
        </Button>
      </div>

      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Scroll product categories left"
          disabled={!canScrollLeft}
          onClick={() => scrollByDirection("left")}
          className="size-10 rounded-full border-border bg-card text-foreground shadow-sm disabled:opacity-30"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Scroll product categories right"
          disabled={!canScrollRight}
          onClick={() => scrollByDirection("right")}
          className="size-10 rounded-full border-border bg-card text-foreground shadow-sm disabled:opacity-30"
        >
          <ChevronRight className="size-5" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function RevealSection({
  children,
  className = "",
  id,
  animation = "batch",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  animation?: "batch" | "about" | "checks" | "process" | "faq";
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;
      if (!ref.current) return;
      if (animation === "batch") {
        ScrollTrigger.batch(ref.current.querySelectorAll("[data-card]"), {
          start: "top 88%",
          once: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              {
                autoAlpha: 0,
                scale: 0.9,
                rotation: (index) => (index % 2 ? 3 : -3),
              },
              {
                autoAlpha: 1,
                scale: 1,
                rotation: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "back.out(1.5)",
              },
            ),
        });
      } else if (animation === "about") {
        const line =
          ref.current.querySelector<SVGLineElement>("[data-about-line]");
        if (line) {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              once: true,
            },
          });
        }
        gsap.fromTo(
          ref.current.querySelectorAll("[data-callout]"),
          { autoAlpha: 0, x: (index) => (index === 0 ? -36 : 36) },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      } else if (animation === "checks") {
        gsap.fromTo(
          ref.current.querySelectorAll("[data-check]"),
          { strokeDashoffset: 18, autoAlpha: 0 },
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.35,
            stagger: 0.08,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      } else if (animation === "process") {
        const line = ref.current.querySelector<SVGLineElement>(
          "[data-process-line]",
        );
        if (line) {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(line, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          });
        }
        gsap.fromTo(
          ref.current.querySelectorAll("[data-process-icon]"),
          { autoAlpha: 0.35, scale: 0.8 },
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 72%",
              end: "bottom 58%",
              scrub: true,
            },
          },
        );
      } else if (animation === "faq") {
        const cleanups: (() => void)[] = [];
        ref.current
          .querySelectorAll<HTMLDetailsElement>("details")
          .forEach((detail) => {
            const summary = detail.querySelector("summary");
            const panel = detail.querySelector<HTMLElement>("[data-faq-panel]");
            const chevron =
              detail.querySelector<HTMLElement>("[data-faq-chevron]");
            if (!summary || !panel) return;
            panel.style.height = detail.open ? "auto" : "0px";
            panel.style.overflow = "hidden";
            const handleClick = () =>
              requestAnimationFrame(() => {
                if (detail.open) {
                  panel.style.height = "0px";
                  gsap.to(panel, {
                    height: panel.scrollHeight,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                      panel.style.height = "auto";
                    },
                  });
                  if (chevron) gsap.to(chevron, { rotate: 180, duration: 0.3 });
                } else {
                  gsap.to(panel, {
                    height: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  if (chevron) gsap.to(chevron, { rotate: 0, duration: 0.3 });
                }
              });
            summary.addEventListener("click", handleClick);
            cleanups.push(() =>
              summary.removeEventListener("click", handleClick),
            );
          });
        return () => cleanups.forEach((cleanup) => cleanup());
      }
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

function BrandMarquee() {
  const forwardTrackRef = useRef<HTMLDivElement>(null);
  const reverseTrackRef = useRef<HTMLDivElement>(null);
  const marqueeTweensRef = useRef<gsap.core.Tween[]>([]);
  useGSAP(
    () => {
      if (
        !forwardTrackRef.current ||
        !reverseTrackRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const forwardTween = gsap.to(forwardTrackRef.current, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
      const reverseTween = gsap.fromTo(
        reverseTrackRef.current,
        { xPercent: -50 },
        { xPercent: 0, duration: 28, ease: "none", repeat: -1 },
      );
      marqueeTweensRef.current = [forwardTween, reverseTween];
      return () => {
        forwardTween.kill();
        reverseTween.kill();
        marqueeTweensRef.current = [];
      };
    },
    { scope: forwardTrackRef },
  );
  const items = [...brands, ...brands];
  return (
    <div
      className="grid gap-3 overflow-hidden"
      onMouseEnter={() =>
        marqueeTweensRef.current.forEach((tween) => tween.timeScale(0))
      }
      onMouseLeave={() =>
        marqueeTweensRef.current.forEach((tween) => tween.timeScale(1))
      }
    >
      <div ref={forwardTrackRef} className="flex w-max gap-4 py-2">
        {items.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="relative flex h-24 w-44 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-white px-5 shadow-md transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:scale-110 hover:border-brand/50 hover:shadow-xl"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={180}
              height={64}
              sizes="176px"
              className="max-h-12 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
      <div ref={reverseTrackRef} className="flex w-max gap-4 py-2">
        {items.map((brand, index) => (
          <div
            key={`reverse-${brand.name}-${index}`}
            className="relative flex h-24 w-44 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-white px-5 shadow-md transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:scale-110 hover:border-brand/50 hover:shadow-xl"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={180}
              height={64}
              sizes="176px"
              className="max-h-12 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ListPanel({
  title,
  items,
  icon: Icon,
  accent = "brand",
}: {
  title: string;
  items: string[];
  icon: CardItem["icon"];
  accent?: "brand" | "network";
}) {
  return (
    <Card
      data-card
      className={`h-full rounded-lg border-y-border border-r-border border-l-4 bg-card shadow-md ${accent === "network" ? "border-l-sky-500" : "border-l-brand"}`}
    >
      <CardHeader>
        <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent-subtle text-brand">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm leading-6 text-secondary"
            >
              <svg
                data-check
                className="mt-1 size-4 shrink-0 overflow-visible text-brand [stroke-dasharray:18]"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m3 8 3 3 7-7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function HomeSections() {
  return (
    <div className="bg-background">
      <RevealSection
        animation="about"
        className="border-b border-border bg-section"
      >
        <PageContainer className="grid min-w-0 gap-10 py-8 sm:py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          <div data-reveal>
            <SectionHeading
              eyebrow="About United Infonet"
              title="Infrastructure that keeps business moving."
              description="United Infonet is a Bengaluru-based IT infrastructure company with 10+ years of industry expertise across design, procurement, implementation and ongoing support."
            />
          </div>
          <div className="relative grid gap-3 sm:grid-cols-2">
            <svg
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <line
                data-about-line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                className="stroke-brand"
                strokeWidth="2"
              />
            </svg>
            <div data-callout className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-brand">
                <Check className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Cost-effective
                </p>
                <p className="mt-1 text-sm text-secondary">
                  Practical solutions shaped around the requirement.
                </p>
              </div>
            </div>
            <div data-callout className="flex gap-4 sm:pl-8">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-brand">
                <ArchiveRestore className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Secure and scalable
                </p>
                <p className="mt-1 text-sm text-secondary">
                  Infrastructure designed to support changing needs.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection
        id="solutions"
        className="border-b border-border bg-section-alt"
      >
        <PageContainer className="relative py-8 sm:py-12">
          <div
            className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-500/[0.04] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-orange-500/[0.035] blur-3xl"
            aria-hidden
          />
          <SectionHeading
            eyebrow="What We Do"
            title="End-to-end IT infrastructure support"
            description="From equipment and implementation to maintenance and recovery, choose the support model that fits your environment."
          />
          <div className="relative grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <div data-reveal key={item.title}>
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection
        id="products"
        className="border-b border-border bg-section"
      >
        <PageContainer className="py-8 sm:py-12">
          <SectionHeading
            eyebrow="Product Categories"
            title="The equipment behind dependable networks"
            description="Access the hardware categories required to build, extend and maintain enterprise IT infrastructure."
          />
          <ProductCategoriesCarousel items={productCatalog} />
        </PageContainer>
      </RevealSection>

      <RevealSection className="relative overflow-hidden border-b border-border bg-section-why">
        <PageContainer className="relative py-8 sm:py-12">
          <div
            className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand/[0.07] blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <SectionHeading
              eyebrow="Why United Infonet"
              title="A practical partner for infrastructure decisions"
              description="Support across the lifecycle, with a solutions-first approach and clear communication."
            />
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((item) => (
              <div data-reveal key={item.title}>
                <IconCard item={item} />
              </div>
            ))}
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection
        animation="checks"
        className="border-b border-border bg-section"
      >
        <PageContainer className="py-8 sm:py-12">
          <SectionHeading
            eyebrow="Networking & Security"
            title="Build connected environments with confidence"
            description="Bring connectivity, monitoring and protection together across campus, branch and enterprise environments."
          />
          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            <ListPanel
              title="Networking"
              items={networking}
              icon={services[4].icon}
              accent="network"
            />
            <ListPanel
              title="Security"
              items={security}
              icon={services[2].icon}
              accent="brand"
            />
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection className="relative border-b border-border bg-section-commercial">
        <PageContainer className="relative pt-8 pb-6 sm:pt-12 sm:pb-8">
          <div
            className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl dark:bg-cyan-500/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 bottom-4 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-3xl dark:bg-sky-400/[0.06]"
            aria-hidden
          />
          <div className="relative">
            <SectionHeading
              eyebrow="Flexible Support"
              title="Commercial options that meet the moment"
              description="Choose flexible access to equipment or a structured maintenance relationship for your environment."
            />
          </div>
          <div className="relative">
            <CommercialOptions />
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection
        animation="process"
        className="border-b border-border bg-section"
      >
        <PageContainer className="py-8 sm:py-12">
          <SectionHeading
            eyebrow="Asset Recovery"
            title="A responsible path for retired equipment"
            description="A clear process for assessment, recovery and responsible handling of enterprise assets."
          />
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-[10%] right-[10%] top-9 hidden h-1 w-[80%] lg:block"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <line
                data-process-line
                x1="0"
                y1="2"
                x2="100%"
                y2="2"
                className="stroke-brand"
                strokeWidth="2"
              />
            </svg>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    data-reveal
                    key={step.title}
                    data-process-icon
                    className="relative rounded-lg border border-border-subtle bg-card p-5 shadow-md"
                  >
                    <span className="text-xs font-semibold text-brand">
                      0{index + 1}
                    </span>
                    <div className="mt-5 flex size-10 items-center justify-center rounded-full bg-accent-subtle text-brand">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection className="border-b border-border bg-section-alt">
        <PageContainer className="py-8 sm:py-12">
          <SectionHeading
            eyebrow="Industries"
            title="Infrastructure shaped around your environment"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item) => (
              <div data-reveal key={item.title}>
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
        </PageContainer>
      </RevealSection>

      <RevealSection
        animation="batch"
        className="border-b border-border bg-section"
      >
        <PageContainer className="py-8 sm:py-12">
          <SectionHeading
            eyebrow="Technology Ecosystem"
            title="Working across trusted technology brands"
          />
          <BrandMarquee />
        </PageContainer>
      </RevealSection>

      <RevealSection
        animation="faq"
        className="border-b border-border bg-section-alt"
      >
        <PageContainer className="py-8 sm:py-12">
          <SectionHeading eyebrow="FAQ" title="Questions, answered clearly" />
          <div className="  divide-y divide-border rounded-xl border border-border bg-card px-5 shadow-md">
            {faqs.map((faq) => (
              <details data-reveal key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    data-faq-chevron
                    className="size-4 shrink-0 text-secondary"
                    aria-hidden="true"
                  />
                </summary>
                <div data-faq-panel>
                  <p className="pt-3 pr-8 text-sm leading-6 text-secondary">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </PageContainer>
      </RevealSection>

      <section
        id="contact"
        className="relative overflow-hidden border-t border-border bg-section-alt"
      >
        <div
          data-cta-glow
          className="pointer-events-none absolute -right-20 top-1/2 size-80 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
          aria-hidden
        />
        <PageContainer className="items-start gap-6 py-8 pb-6 sm:gap-8 sm:py-10 sm:pb-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Start a conversation
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
              Let&apos;s Build the Right IT Infrastructure for Your Business
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-brand-hover"
            >
              <Mail className="size-4" aria-hidden="true" />
              Request a Quote
            </a>
            <a
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              Contact Us
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
