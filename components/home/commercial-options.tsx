"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Cog, Package, ShoppingCart } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const options = [
  {
    number: "01",
    title: "Sales",
    description: "Purchase the right enterprise hardware with expert guidance and support.",
    icon: ShoppingCart,
    shape: "M18 55 C16 29 40 11 72 17 C104 5 139 19 151 46 C173 68 160 103 133 112 C112 131 72 123 51 130 C27 123 12 94 18 55 Z",
  },
  {
    number: "02",
    title: "Rental & Leasing",
    description: "Flexible enterprise hardware rental that helps teams match infrastructure to current requirements.",
    icon: Package,
    shape: "M19 43 C33 19 59 20 81 13 C107 6 142 21 153 48 C169 72 153 101 130 111 C108 126 79 118 56 126 C30 119 7 91 19 66 C14 56 14 49 19 43 Z",
  },
  {
    number: "03",
    title: "AMC Support",
    description: "Annual maintenance contracts that keep support structured around the equipment and environment.",
    icon: Cog,
    shape: "M20 37 C36 13 70 17 92 12 C119 12 148 29 153 55 C161 79 145 105 119 113 C98 128 67 119 45 124 C22 114 10 91 16 68 C10 56 13 45 20 37 Z",
  },
] as const;

function isSectionInView(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.82 && rect.bottom > 0;
}

export function CommercialOptions() {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorRef = useRef<SVGPathElement>(null);
  const particleRef = useRef<SVGCircleElement>(null);
  const blobRefs = useRef<Array<HTMLElement | null>>([]);
  const detailRefs = useRef<Array<HTMLElement | null>>([]);
  const iconRefs = useRef<Array<SVGSVGElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const listenerCleanups: Array<() => void> = [];
    let revealTimeline: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const setup = () => {
        const connector = connectorRef.current;
        const particle = particleRef.current;
        const blobs = blobRefs.current.filter(Boolean) as HTMLElement[];
        const details = detailRefs.current.filter(Boolean) as HTMLElement[];
        const icons = iconRefs.current.filter(Boolean) as SVGSVGElement[];

        if (!connector || !particle || blobs.length !== 3 || details.length !== 3) {
          return false;
        }

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const touchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
        const connectorLength = connector.getTotalLength();
        const connectorProgress = { value: 0 };

        gsap.set(connector, { strokeDasharray: connectorLength, strokeDashoffset: connectorLength });
        gsap.set(blobs, { autoAlpha: 0, y: 24, scale: 0.97, transformOrigin: "50% 50%" });
        gsap.set(details, { autoAlpha: 0, y: 8 });
        gsap.set(particle, { autoAlpha: 0 });

        const moveParticle = () => {
          const point = connector.getPointAtLength(connectorLength * connectorProgress.value);
          gsap.set(particle, { attr: { cx: point.x, cy: point.y } });
        };

        const playReveal = () => {
          if (revealTimeline?.progress() === 1) return;
          revealTimeline?.play(0);
        };

        revealTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out" },
          onComplete: () => {
            gsap.set(blobs, { clearProps: "transform" });
          },
        });

        revealTimeline
          .to(connector, { strokeDashoffset: 0, duration: 1.1, ease: "power3.out" }, 0)
          .to(blobs, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.18 }, 0.18)
          .to(details, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.16 }, 0.46);

        ScrollTrigger.create({
          id: "commercial-options-reveal",
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: playReveal,
        });

        if (reducedMotion) {
          revealTimeline.progress(1).kill();
          gsap.set(connector, { strokeDashoffset: 0 });
          gsap.set([blobs, details, particle], { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
        } else {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            if (isSectionInView(section)) playReveal();
          });

          revealTimeline.call(() => {
            gsap.set(particle, { autoAlpha: 0.9 });
            gsap.to(connectorProgress, {
              value: 1,
              duration: 7,
              ease: "none",
              onUpdate: moveParticle,
              onComplete: () => gsap.set(particle, { autoAlpha: 0 }),
            });
          }, [], 0.6);

          const media = gsap.matchMedia();
          media.add("(min-width: 768px)", () => {
            blobs.forEach((blob, index) => {
              gsap.to(blob, {
                y: index === 1 ? 4 : 3,
                rotation: index === 1 ? 0.4 : 0.3,
                duration: [4.8, 5.7, 4.4][index],
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.22,
              });
            });
          });
          media.add("(max-width: 767px)", () => {
            blobs.forEach((blob, index) => {
              gsap.to(blob, {
                y: index === 1 ? 2 : 1.5,
                rotation: index === 1 ? 0.2 : 0.15,
                duration: [5.3, 6.1, 4.9][index],
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2,
              });
            });
          });
        }

        if (!touchDevice && !reducedMotion) {
          blobs.forEach((blob, index) => {
            const quickX = gsap.quickTo(blob, "x", { duration: 0.35, ease: "power3.out" });
            const quickY = gsap.quickTo(blob, "y", { duration: 0.35, ease: "power3.out" });
            const quickRotation = gsap.quickTo(blob, "rotation", { duration: 0.35, ease: "power3.out" });
            const icon = icons[index];
            const handleMove = (event: PointerEvent) => {
              const bounds = blob.getBoundingClientRect();
              quickX(((event.clientX - bounds.left) / bounds.width - 0.5) * 4);
              quickY(((event.clientY - bounds.top) / bounds.height - 0.5) * 4 - 2);
              quickRotation(((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5);
            };
            const handleEnter = () => {
              gsap.to(blob, { scale: 1.015, duration: 0.35, overwrite: true });
              gsap.to(blob.querySelector(".commercial-blob-outline"), { opacity: 1, duration: 0.3, overwrite: true });
              gsap.to(blob.querySelector(".commercial-blob-aura"), { opacity: 0.22, duration: 0.3, overwrite: true });
              gsap.to(blob.querySelector(".commercial-arrow"), { x: 5, duration: 0.3, overwrite: true });
              gsap.to(icon, { scale: 1.08, rotation: index === 0 ? 3 : index === 1 ? 4 : 25, duration: 0.35, overwrite: true });
            };
            const handleLeave = () => {
              quickX(0);
              quickY(0);
              quickRotation(0);
              gsap.to(blob, { scale: 1, duration: 0.35, overwrite: true });
              gsap.to(blob.querySelector(".commercial-blob-outline"), { opacity: 0.7, duration: 0.3, overwrite: true });
              gsap.to(blob.querySelector(".commercial-blob-aura"), { opacity: 0, duration: 0.3, overwrite: true });
              gsap.to(blob.querySelector(".commercial-arrow"), { x: 0, duration: 0.3, overwrite: true });
              gsap.to(icon, { scale: 1, rotation: 0, duration: 0.35, overwrite: true });
            };
            blob.addEventListener("pointermove", handleMove);
            blob.addEventListener("pointerenter", handleEnter);
            blob.addEventListener("pointerleave", handleLeave);
            listenerCleanups.push(() => {
              blob.removeEventListener("pointermove", handleMove);
              blob.removeEventListener("pointerenter", handleEnter);
              blob.removeEventListener("pointerleave", handleLeave);
            });
          });
        }

        return true;
      };

      if (!setup()) {
        requestAnimationFrame(() => {
          if (!setup()) {
            const blobs = blobRefs.current.filter(Boolean) as HTMLElement[];
            const details = detailRefs.current.filter(Boolean) as HTMLElement[];
            gsap.set([...blobs, ...details], { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
            if (connectorRef.current) {
              gsap.set(connectorRef.current, { strokeDashoffset: 0 });
            }
          }
        });
      }

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);
      listenerCleanups.push(() => window.removeEventListener("resize", handleResize));
    }, sectionRef);

    return () => {
      listenerCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="commercial-options" aria-label="Commercial options">
      <svg className="commercial-connector" viewBox="0 0 1200 430" preserveAspectRatio="none" aria-hidden="true">
        <path ref={connectorRef} d="M185 150 C340 105 340 300 500 240 S675 105 790 205 S965 340 1085 278" />
        <circle ref={particleRef} r="3.5" cx="185" cy="150" />
      </svg>
      <div className="commercial-options-grid">
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <article
              key={option.number}
              ref={(element) => { blobRefs.current[index] = element; }}
              className={`commercial-blob commercial-blob-${index + 1}`}
            >
              <div className="commercial-blob-aura" aria-hidden="true" />
              <svg className="commercial-blob-shape" viewBox="0 0 170 145" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <path className="commercial-blob-fill" d={option.shape} />
                <path className="commercial-blob-outline" d={option.shape} />
              </svg>
              <div ref={(element) => { detailRefs.current[index] = element; }} className="commercial-blob-content">
                <span className="commercial-blob-number" aria-hidden="true">{option.number}</span>
                <div className="commercial-blob-topline">
                  <Icon ref={(element) => { iconRefs.current[index] = element; }} className="commercial-blob-icon" size={19} strokeWidth={1.6} aria-hidden="true" />
                  <span>{option.number} / 03</span>
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <button type="button" className="commercial-arrow" aria-label={`Explore ${option.title}`}>
                  <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
