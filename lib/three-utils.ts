// import * as THREE from "three";

// /**
//  * Resolves a CSS custom property (hex, oklch, hsl — any format) to a
//  * THREE.Color by letting the browser compute it via a throwaway element,
//  * same trick used for the canvas particle background.
//  */
// export function resolveCssColorToThree(
//   varName: string,
//   fallbackHex: number
// ): THREE.Color {
//   if (typeof document === "undefined") return new THREE.Color(fallbackHex);
//   const probe = document.createElement("div");
//   probe.style.color = `var(${varName})`;
//   probe.style.display = "none";
//   document.body.appendChild(probe);
//   const computed = getComputedStyle(probe).color;
//   document.body.removeChild(probe);

//   const match = computed.match(/\d+(\.\d+)?/g);
//   if (!match || match.length < 3) return new THREE.Color(fallbackHex);
//   const [r, g, b] = match.map(Number);
//   return new THREE.Color(r / 255, g / 255, b / 255);
// }

// /** Small radial-gradient sprite used as the point material's texture, so
//  * points render as soft glowing dots instead of hard squares. */
// export function createGlowSpriteTexture(): THREE.CanvasTexture {
//   const size = 64;
//   const canvas = document.createElement("canvas");
//   canvas.width = size;
//   canvas.height = size;
//   const ctx = canvas.getContext("2d")!;
//   const gradient = ctx.createRadialGradient(
//     size / 2,
//     size / 2,
//     0,
//     size / 2,
//     size / 2,
//     size / 2
//   );
//   gradient.addColorStop(0, "rgba(255,255,255,1)");
//   gradient.addColorStop(0.35, "rgba(255,255,255,0.7)");
//   gradient.addColorStop(1, "rgba(255,255,255,0)");
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, size, size);
//   const texture = new THREE.CanvasTexture(canvas);
//   texture.needsUpdate = true;
//   return texture;
// }

// /**
//  * Fibonacci sphere distribution — spreads N points evenly across a unit
//  * sphere (much more even than random spherical coordinates, which cluster
//  * at the poles).
//  */
// export function fibonacciSpherePoints(count: number): [number, number, number][] {
//   const points: [number, number, number][] = [];
//   const goldenAngle = Math.PI * (3 - Math.sqrt(5));
//   for (let i = 0; i < count; i++) {
//     const y = 1 - (i / (count - 1)) * 2;
//     const radiusAtY = Math.sqrt(1 - y * y);
//     const theta = goldenAngle * i;
//     const x = Math.cos(theta) * radiusAtY;
//     const z = Math.sin(theta) * radiusAtY;
//     points.push([x, y, z]);
//   }
//   return points;
// }

// /**
//  * Deterministic pseudo-landmass mask — combines a few sine waves over the
//  * point's position to produce continent-like clusters instead of a fully
//  * uniform "lit sphere." Not real geography, just enough irregularity to
//  * read as landmasses rather than a uniform dot grid.
//  */
// export function isLandmassPoint(x: number, y: number, z: number): boolean {
//   const n =
//     Math.sin(x * 4.1 + y * 2.3) +
//     Math.sin(y * 5.2 - z * 3.1) +
//     Math.sin(z * 4.4 + x * 3.3);
//   return n > 0.35;
// }
