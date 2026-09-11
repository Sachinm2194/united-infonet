"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Heart, Lightbulb, ShieldCheck, Target } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
const centerPoint = { x: 400, y: 210 };
const radius = { desktop: 145, mobile: 103 };

const valueNodes: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "people", label: "People", icon: Heart },
  { id: "innovation", label: "Innovation", icon: Lightbulb },
  { id: "impact", label: "Impact", icon: Target },
  { id: "reliability", label: "Reliability", icon: ShieldCheck },
];

const baseAngles = valueNodes.map((_, index) => -Math.PI / 2 + index * (Math.PI / 2));

export function ValuesNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const glowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lineRefs = useRef<Array<SVGPathElement | null>>([]);
  const packetRefs = useRef<Array<SVGCircleElement | null>>([]);
  const orbitTimelineRef = useRef<gsap.core.Tween | null>(null);
  const highlightNodeRef = useRef<(index: number) => void>(() => undefined);
  const resetLineStylesRef = useRef<() => void>(() => undefined);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const orbit = orbitRef.current;
      const center = centerRef.current;
      const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
      const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[];
      const glows = glowRefs.current.filter(Boolean) as HTMLDivElement[];
      const lines = lineRefs.current.filter(Boolean) as SVGPathElement[];
      const packets = packetRefs.current.filter(Boolean) as SVGCircleElement[];
      const orbitRadius = mobile ? radius.mobile : radius.desktop;

      const pointFor = (angle: number) => ({
        x: centerPoint.x + Math.cos(angle) * orbitRadius,
        y: centerPoint.y + Math.sin(angle) * orbitRadius,
      });

      const updateNetwork = (angle: number) => {
        if (orbit) orbit.style.transform = `rotate(${angle}deg)`;
        nodes.forEach((node, index) => {
          const point = pointFor(baseAngles[index]);
          node.style.transform = `translate(calc(-50% + ${point.x - centerPoint.x}px), calc(-50% + ${point.y - centerPoint.y}px))`;
        });
        icons.forEach((icon) => {
          icon.style.transform = `rotate(${-angle}deg)`;
        });

        const points = baseAngles.map((baseAngle) => pointFor(baseAngle + (angle * Math.PI) / 180));
        points.forEach((point, index) => {
          const nextPoint = points[(index + 1) % points.length];
          lines[index].setAttribute("d", `M ${centerPoint.x} ${centerPoint.y} L ${point.x} ${point.y}`);
          lines[4 + index].setAttribute("d", `M ${point.x} ${point.y} L ${nextPoint.x} ${nextPoint.y}`);
        });
      };

      const resetLineStyles = () => {
        gsap.to(lines, { strokeOpacity: 0.55, strokeWidth: 1.5, duration: 0.2, overwrite: true });
      };

      const highlightNode = (index: number) => {
        const connected = new Set([index, 4 + index, 4 + ((index + 3) % 4)]);
        gsap.to(lines, {
          strokeOpacity: (_target, lineIndex) => (connected.has(lineIndex) ? 1 : 0.3),
          strokeWidth: (_target, lineIndex) => (connected.has(lineIndex) ? 2.25 : 1.5),
          duration: 0.2,
          overwrite: true,
        });
        gsap.to(nodes[index], { scale: 1.12, duration: 0.25, overwrite: true });
        gsap.to(glows[index], { opacity: 0.55, duration: 0.25, overwrite: true });
      };

      highlightNodeRef.current = highlightNode;
      resetLineStylesRef.current = resetLineStyles;

      updateNetwork(0);
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 0, strokeOpacity: 0.55 });
      gsap.set([center, ...nodes], { autoAlpha: 1 });
      gsap.set(nodes, { scale: 1 });
      gsap.set(glows, { opacity: 0.2 });

      if (reduced) {
        gsap.set([center, ...nodes], { autoAlpha: 1, clearProps: "transform" });
        gsap.set(lines, { strokeDashoffset: 0 });
        updateNetwork(0);
        return;
      }

      gsap
        .timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 72%", once: true } })
        .fromTo(lines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" });

      orbitTimelineRef.current = gsap.to({ angle: 0 }, {
        angle: 360,
        duration: mobile ? 70 : 50,
        repeat: -1,
        ease: "none",
        onUpdate: function () {
          updateNetwork(this.targets()[0].angle);
        },
      });

      packets.forEach((packet, index) => {
        const line = lines[index];
        const progress = { value: 0 };
        const updatePacket = () => {
          const point = line.getPointAtLength(line.getTotalLength() * progress.value);
          packet.setAttribute("cx", String(point.x));
          packet.setAttribute("cy", String(point.y));
        };
        gsap.to(progress, {
          value: 1,
          duration: mobile ? 1.5 : 0.8,
          delay: index * (mobile ? 0.35 : 0.12),
          repeat: -1,
          ease: "none",
          onUpdate: updatePacket,
        });
      });

      return () => {
        orbitTimelineRef.current?.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-14 h-[320px] w-full max-w-3xl overflow-hidden bg-[radial-gradient(circle_at_1px_1px,color-mix(in_srgb,var(--brand)_18%,transparent)_1px,transparent_0)] bg-[size:18px_18px] md:h-[420px]"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 420" fill="none" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <path
            key={`line-${index}`}
            ref={(element) => { lineRefs.current[index] = element; }}
            pathLength="1"
            className="text-brand"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <circle
            key={`packet-${index}`}
            ref={(element) => { packetRefs.current[index] = element; }}
            r="3"
            className="fill-brand"
          />
        ))}
      </svg>

      <div ref={orbitRef} className="absolute inset-0" onPointerLeave={() => orbitTimelineRef.current?.resume()}>
        {valueNodes.map(({ id, label, icon: Icon }, index) => (
          <div
            key={id}
            ref={(element) => { nodeRefs.current[index] = element; }}
            className="absolute left-1/2 top-1/2 flex size-[70px] cursor-pointer items-center justify-center rounded-full border border-brand/40 bg-card/60 p-2 text-center shadow-lg backdrop-blur-md md:size-[96px]"
            onPointerEnter={() => {
              orbitTimelineRef.current?.pause();
              const node = nodeRefs.current[index];
              if (node) highlightNodeRef.current(index);
            }}
            onPointerLeave={() => {
              gsap.to(nodeRefs.current[index], { scale: 1, duration: 0.25, overwrite: true });
              gsap.to(glowRefs.current[index], { opacity: 0.2, duration: 0.25, overwrite: true });
              resetLineStylesRef.current();
            }}
          >
            <div ref={(element) => { glowRefs.current[index] = element; }} className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle,var(--brand)_0%,transparent_70%)] opacity-20 blur-xl" />
            <div ref={(element) => { iconRefs.current[index] = element; }} className="flex flex-col items-center gap-1">
              <Icon className="size-5 text-brand md:size-6" />
              <span className="text-[10px] font-semibold leading-tight md:text-xs">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div ref={centerRef} className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand bg-accent-subtle text-center shadow-[0_0_45px_color-mix(in_srgb,var(--brand)_25%,transparent)] md:size-32">
        <span className="text-sm font-semibold md:text-base">Our Values</span>
      </div>
    </div>
  );
}