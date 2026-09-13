"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

interface NetworkBannerProps {
	title?: string;
	subtitle?: string;
}

export function NetworkBanner2({
	title = "Enterprise Networking & IT Infrastructure Solutions",
	subtitle = "Cost-effective, secure and scalable IT infrastructure solutions covering hardware, networking, implementation, rental, maintenance and support.",
}: NetworkBannerProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const eyebrowRef = useRef<HTMLParagraphElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const actionsRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)"
			).matches;

			if (prefersReducedMotion) {
				gsap.set(
					[
						eyebrowRef.current,
						titleRef.current,
						subtitleRef.current,
						actionsRef.current,
						".banner-eyebrow-char",
						".banner-title-char",
					],
					{ autoAlpha: 1, clearProps: "transform,filter,clipPath" }
				);
				return;
			}

			gsap.set(".banner-eyebrow-char", {
				autoAlpha: 0,
				y: -220,
				rotateX: -75,
			});
			gsap.set(".banner-title-char", {
				autoAlpha: 0,
				y: 32,
				filter: "blur(8px)",
			});
			gsap.set(subtitleRef.current, { autoAlpha: 0, y: 18 });
			gsap.set(actionsRef.current, { autoAlpha: 0, y: 18 });

			gsap.fromTo(
				imageRef.current,
				{ scale: 1.08 },
				{ scale: 1, duration: 1.8, ease: "power2.out" }
			);
			const textTimeline = gsap.timeline({ delay: 0.3 });
			textTimeline
				.to(".banner-eyebrow-char", {
					autoAlpha: 1,
					y: 0,
					rotateX: 0,
					duration: 0.55,
					stagger: 0.035,
					ease: "bounce.out",
				}, 0)
				.to(
					".banner-title-char",
					{
						autoAlpha: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.55,
						stagger: 0.055,
						ease: "power3.out",
					},
					0
				)
				.to(
					subtitleRef.current,
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
					},
					0
				)
				.to(
					actionsRef.current,
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.55,
						ease: "back.out(1.4)",
					},
					0
				);
		},
		{ scope: sectionRef }
	);

	return (
		<section
			ref={sectionRef}
			className="relative h-[25rem] max-h-[26.5rem] w-full overflow-hidden bg-background sm:h-[26rem] md:h-[30rem] lg:h-[34rem]"
		>
			<div ref={imageRef} className="absolute inset-0 origin-center">
				<Image
					src="/Images/network-banner.png"
					alt="Enterprise server infrastructure"
					fill
					priority
					sizes="100vw"
					className="object-cover object-[62%_center]"
				/>
			</div>

			<div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background/70 via-background/35 to-transparent dark:block" />
			<div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-background/40 via-transparent to-background/5 dark:block" />

			<div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-end px-4 pb-10 sm:px-6 sm:pb-14 lg:px-10 lg:pb-20">
				<p
					ref={eyebrowRef}
					className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand sm:text-sm"
					aria-label="Enterprise IT infrastructure"
				>
					{Array.from("Enterprise IT infrastructure").map((character, index) => (
						<span
							key={`${character}-${index}`}
							className="banner-eyebrow-char inline-block"
							aria-hidden="true"
							style={{ opacity: 0, transform: "translateY(-220px) rotateX(-75deg)" }}
						>
							{character === " " ? "\u00a0" : character}
						</span>
					))}
				</p>
				<h1
					ref={titleRef}
					className="max-w-2xl text-3xl font-bold leading-[1.05] text-white sm:text-5xl md:max-w-3xl md:text-5xl"
					aria-label={title}
				>
					{title.split(" ").map((word, wordIndex) => (
						<span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap" aria-hidden="true">
							{Array.from(word).map((character, characterIndex) => (
								<span
									key={`${character}-${characterIndex}`}
									className="banner-title-char inline-block"
									style={{ opacity: 0, transform: "translateY(32px)", filter: "blur(8px)" }}
								>
									{character}
								</span>
							))}
							{wordIndex < title.split(" ").length - 1 ? "\u00a0" : null}
						</span>
					))}
				</h1>
				<p
					ref={subtitleRef}
					className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base"
					style={{ opacity: 0, transform: "translateY(18px)" }}
				>
					{subtitle}
				</p>
				<div
					ref={actionsRef}
					className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
					style={{ opacity: 0, transform: "translateY(18px)" }}
				>
					<Link
						href="/services"
						className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-brand-hover"
					>
						Explore Services
						<ArrowRight className="size-4" aria-hidden="true" />
					</Link>
					<Link
						href="#products"
						className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background/70 px-5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card"
					>
						Browse Products
						<ArrowRight className="size-4" aria-hidden="true" />
					</Link>
				</div>
			</div>
		</section>
	);
}
