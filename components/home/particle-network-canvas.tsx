"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
  pulseOffset: number;
  nextPulseAt: number;
}

interface PulseRing {
  x: number;
  y: number;
  startedAt: number;
}

interface GlowBlob {
  baseX: number;
  baseY: number;
  radius: number;
  phase: number;
  speed: number;
}

const PARTICLE_COUNT_DESKTOP = 75;
const PARTICLE_COUNT_MOBILE = 25;
const LINK_DISTANCE = 155;
const MOUSE_RADIUS = 160;
const HUB_RATIO = 0.1;
const PULSE_DURATION_FRAMES = 90; // ~1.5s at 60fps
const PULSE_MAX_RADIUS = 46;
const GLOW_BLOB_COUNT = 3;
const SIGNAL_INTERVAL = 4;
const SIGNAL_SPEED = 0.004;
export const USE_DARK_THEME_COLORS = true;

const DARK_THEME_BACKGROUND = "rgb(5, 10, 15)";
const DARK_THEME_BRAND = "rgb(255, 106, 0)";
const DARK_THEME_BRAND_HOVER = "rgb(255, 133, 51)";
const DARK_THEME_LINE = "rgb(122, 135, 148)";

function resolveCssColorVar(varName: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const probe = document.createElement("div");
  probe.style.color = `var(${varName})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  return resolved && resolved !== "" ? resolved : fallback;
}

function withAlpha(rgbString: string, alpha: number): string {
  const match = rgbString.match(/\d+(\.\d+)?/g);
  if (!match || match.length < 3) return rgbString;
  const [r, g, b] = match;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, alpha)})`;
}

export function ParticleNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const backgroundRgb = USE_DARK_THEME_COLORS
      ? DARK_THEME_BACKGROUND
      : resolveCssColorVar("--background", "rgb(247, 249, 252)");
    const brandRgb = USE_DARK_THEME_COLORS
      ? DARK_THEME_BRAND
      : resolveCssColorVar("--brand", DARK_THEME_BRAND);
    const brandHoverRgb = USE_DARK_THEME_COLORS
      ? DARK_THEME_BRAND_HOVER
      : resolveCssColorVar("--brand-hover", DARK_THEME_BRAND_HOVER);
    const lineRgb = USE_DARK_THEME_COLORS
      ? DARK_THEME_LINE
      : resolveCssColorVar("--text-muted", DARK_THEME_LINE);

    let particles: Particle[] = [];
    let pulses: PulseRing[] = [];
    let glowBlobs: GlowBlob[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let elapsed = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count =
        width < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 0.9,
        isHub: Math.random() < HUB_RATIO,
        pulseOffset: Math.random() * Math.PI * 2,
        nextPulseAt: Math.random() * 200,
      }));

      glowBlobs = Array.from({ length: GLOW_BLOB_COUNT }, (_, i) => ({
        baseX: (width / (GLOW_BLOB_COUNT + 1)) * (i + 1),
        baseY: height * (0.3 + Math.random() * 0.4),
        radius: Math.max(width, height) * 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.002,
      }));

      pulses = [];
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function drawGlowBlobs() {
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const blob of glowBlobs) {
        const x = blob.baseX + Math.sin(elapsed * blob.speed + blob.phase) * 60;
        const y = blob.baseY + Math.cos(elapsed * blob.speed * 0.8 + blob.phase) * 40;
        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, blob.radius);
        gradient.addColorStop(0, withAlpha(brandRgb, 0.14));
        gradient.addColorStop(0.35, withAlpha(brandHoverRgb, 0.045));
        gradient.addColorStop(1, withAlpha(brandRgb, 0));
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, width, height);
      }
      ctx!.restore();
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const proximity = 1 - dist / LINK_DISTANCE;
            const isNearHub = a.isHub || b.isHub;
            const opacity = proximity * (isNearHub ? 0.62 : 0.34);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = withAlpha(
              isNearHub ? brandRgb : lineRgb,
              opacity
            );
            ctx!.lineWidth = isNearHub ? 1.35 : 1;
            ctx!.stroke();

            if ((i + j) % SIGNAL_INTERVAL === 0 && proximity > 0.2) {
              const signalProgress =
                (elapsed * SIGNAL_SPEED + i * 0.17 + j * 0.11) % 1;
              const signalX = a.x + (b.x - a.x) * signalProgress;
              const signalY = a.y + (b.y - a.y) * signalProgress;
              const signalRadius = isNearHub ? 3.2 : 2.2;
              const signalGlow = ctx!.createRadialGradient(
                signalX,
                signalY,
                0,
                signalX,
                signalY,
                signalRadius * 4
              );
              signalGlow.addColorStop(0, withAlpha(brandRgb, 0.85));
              signalGlow.addColorStop(1, withAlpha(brandRgb, 0));
              ctx!.fillStyle = signalGlow;
              ctx!.beginPath();
              ctx!.arc(signalX, signalY, signalRadius * 4, 0, Math.PI * 2);
              ctx!.fill();
              ctx!.fillStyle = withAlpha(brandHoverRgb, 1);
              ctx!.beginPath();
              ctx!.arc(signalX, signalY, signalRadius, 0, Math.PI * 2);
              ctx!.fill();
            }
          }
        }
      }
    }

    function drawParticles() {
      if (mouse.x > -1000 && mouse.y > -1000) {
        const cursorGlow = ctx!.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_RADIUS * 1.35
        );
        cursorGlow.addColorStop(0, withAlpha(brandRgb, 0.12));
        cursorGlow.addColorStop(1, withAlpha(brandRgb, 0));
        ctx!.fillStyle = cursorGlow;
        ctx!.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;
        }

        if (p.isHub) {
          // Schedule radar pulses
          if (elapsed >= p.nextPulseAt) {
            pulses.push({ x: p.x, y: p.y, startedAt: elapsed });
            p.nextPulseAt = elapsed + 180 + Math.random() * 240; // every 3-7s
          }

          const pulse = 1 + Math.sin(elapsed * 0.03 + p.pulseOffset) * 0.3;
          const radius = p.radius * 2.4 * pulse;

          // Soft bloom underneath the solid core
          const bloom = ctx!.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            radius * 5
          );
          bloom.addColorStop(0, withAlpha(brandRgb, 0.5));
          bloom.addColorStop(0.3, withAlpha(brandHoverRgb, 0.16));
          bloom.addColorStop(1, withAlpha(brandRgb, 0));
          ctx!.fillStyle = bloom;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, radius * 5, 0, Math.PI * 2);
          ctx!.fill();

          // Solid bright core
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx!.fillStyle = withAlpha(brandHoverRgb, 1);
          ctx!.fill();
        } else {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fillStyle = withAlpha(brandRgb, 0.85);
          ctx!.fill();
        }
      }
    }

    function drawPulses() {
      pulses = pulses.filter((pulse) => {
        const progress = (elapsed - pulse.startedAt) / PULSE_DURATION_FRAMES;
        if (progress >= 1) return false;

        const radius = PULSE_MAX_RADIUS * progress;
        const opacity = 0.55 * (1 - progress);

        ctx!.beginPath();
        ctx!.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
        ctx!.strokeStyle = withAlpha(brandRgb, opacity);
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
        return true;
      });
    }

    function step() {
      elapsed += 1;
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = backgroundRgb;
      ctx!.fillRect(0, 0, width, height);

      drawGlowBlobs();
      drawLines();
      drawParticles();
      drawPulses();

      animationFrame = requestAnimationFrame(step);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
      } else if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(step);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (prefersReducedMotion) {
      step();
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}