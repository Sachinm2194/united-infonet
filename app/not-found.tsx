import Link from "next/link";
import { Home, Radio, Signal } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nodes = [
  { className: "left-[12%] top-[24%] size-2" },
  { className: "left-[25%] top-[68%] size-3" },
  { className: "right-[17%] top-[30%] size-3" },
  { className: "right-[28%] top-[72%] size-2" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center px-6 py-8 sm:px-10 sm:py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_6%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[min(80vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15 [box-shadow:0_0_0_3rem_color-mix(in_oklch,var(--brand)_3%,transparent),0_0_0_8rem_color-mix(in_oklch,var(--brand)_2%,transparent)]" />

        {nodes.map((node) => (
          <span
            key={node.className}
            className={cn(
              "absolute rounded-full bg-brand shadow-[0_0_18px_var(--brand)]",
              node.className,
            )}
          />
        ))}

        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-2 text-brand sm:mb-6 sm:gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-brand/30 bg-brand/10 sm:size-11">
              <Radio className="size-5" aria-hidden="true" />
            </span>
            <span className="h-px w-8 bg-brand/40 sm:w-12" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Signal lost
            </span>
            <span className="h-px w-8 bg-brand/40 sm:w-12" />
            <span className="flex size-9 items-center justify-center rounded-full border border-brand/30 bg-brand/10 sm:size-11">
              <Signal className="size-5" aria-hidden="true" />
            </span>
          </div>

          <p className="font-mono text-[clamp(4rem,14vw,8rem)] font-bold leading-none tracking-[0.08em] text-brand [text-shadow:0_0_30px_color-mix(in_oklch,var(--brand)_28%,transparent)]">
            404
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:mt-5 sm:text-5xl">
            This route is out of range.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-secondary sm:mt-4 sm:text-lg sm:leading-7">
            The page you were looking for is not available at this address. Let&apos;s get you back to a connected starting point.
          </p>

          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 h-11 gap-3 bg-brand px-7 font-semibold text-on-accent shadow-[0_10px_30px_color-mix(in_oklch,var(--brand)_24%,transparent)] hover:bg-brand-hover sm:mt-7",
            )}
          >
            <Home className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
