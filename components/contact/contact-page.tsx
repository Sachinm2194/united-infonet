"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { PageContainer } from "@/components/layout/page-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const contactMethods = [
  {
    label: "Call our team",
    value: "+91 84318 51549",
    detail: "For urgent support and live requirements",
    href: "tel:+918431851549",
    icon: Phone,
  },
  {
    label: "Write to sales",
    value: "sales@unitedinfonet.com",
    detail: "Share your requirement and we will respond",
    href: "mailto:sales@unitedinfonet.com",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: "Start a conversation",
    detail: "A quick way to reach the team",
    href: "https://wa.me/918431851549",
    icon: MessageCircle,
  },
];

const serviceOptions = [
  "Network infrastructure",
  "Hardware sales",
  "Repair and AMC support",
  "Rental and leasing",
  "IT asset recovery",
  "Something else",
];

type ContactPageProps = {
  initialType?: string;
  initialProduct?: string;
};

const quoteTypeLabels: Record<string, string> = {
  buy: "Hardware sales",
  rent: "Rental and leasing",
  amc: "Repair and AMC support",
  repair: "Repair and AMC support",
  sell: "IT asset recovery",
  consult: "Network infrastructure",
};

export function ContactPage({ initialType, initialProduct }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const initialService = quoteTypeLabels[initialType ?? ""] ?? "";
  const [selectedService, setSelectedService] = useState(initialService);
  const initialMessage = initialProduct
    ? `I would like a quote for ${initialProduct}. Please share availability, pricing, and the recommended next steps.`
    : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });

      if (!response.ok) {
        throw new Error("The enquiry could not be sent.");
      }

      setSubmitted(true);
      event.currentTarget.reset();
      toast.success("Mail sent successfully", {
        description: "Our team will get back to you shortly.",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry right now. Please call +91 84318 51549 or email sales@unitedinfonet.com.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border-subtle bg-section">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand)_18%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]" />
        <div className="absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand/10 blur-3xl" />

        <PageContainer className="relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              Contact United Infonet
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Bring us the <span className="text-brand">complicated</span> IT problem.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
              Whether you are planning a network, replacing critical hardware, or need help with equipment already in the field, our team can help you find the practical next step.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border-subtle pt-5 text-sm text-secondary">
            <span className="inline-flex items-center gap-2">
              <Check className="size-4 text-brand" aria-hidden />
              Requirement-first advice
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="size-4 text-brand" aria-hidden />
              Sales, repair and support
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="size-4 text-brand" aria-hidden />
              Clear next steps
            </span>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:py-20">
        <aside>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Start here</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Reach the right conversation quickly.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-secondary">
            Send a few details or use the channel that suits your situation. We work across procurement, infrastructure and after-sales support.
          </p>

          <div className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
            {contactMethods.map(({ label, value, detail, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex gap-4 py-5 transition-colors hover:text-brand"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center bg-brand/10 text-brand">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                    {label}
                  </span>
                  <span className="mt-1 block break-words text-sm font-semibold text-foreground group-hover:text-brand">
                    {value}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-secondary">
                    {detail}
                  </span>
                </span>
                <ArrowRight className="ml-auto mt-1 size-4 shrink-0 text-brand opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </a>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Bengaluru, Karnataka 560056</p>
                <p className="mt-1 text-sm leading-6 text-secondary">
                  No-717, 1st Floor, 19th Main Rd, 2nd Block,<br />
                  Jnanabharathi BDA Layout, Gnanabharathi Layout 2nd Block,<br />
                  Nagadevana Halli, Bengaluru
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="text-sm font-semibold">Mon - Sat</p>
                <p className="mt-1 text-sm leading-6 text-secondary">9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-start gap-3 border-t border-border-subtle pt-6">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
            <p className="text-xs leading-5 text-secondary">
              Your requirement stays with the team handling your conversation. We only ask for details needed to respond usefully.
            </p>
          </div>
        </aside>

        <section className="border border-border-subtle bg-card p-6 shadow-[0_18px_60px_var(--shadow)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 border-b border-border-subtle pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Project brief</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Tell us what you need.</h2>
            </div>
            <p className="text-xs text-secondary">Fields marked * are required</p>
          </div>

          {submitted ? (
            <div className="flex min-h-[26rem] flex-col items-start justify-center">
              <span className="flex size-12 items-center justify-center bg-brand text-on-accent">
                <Send className="size-5" aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-bold">Your enquiry was sent.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-secondary">
                Our team received your request and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-7 cursosr-pointer inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
              >
                Send another enquiry <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Your name *</span>
                  <input name="name" required autoComplete="name" className="mt-2 h-12 w-full border border-input-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-secondary/60 focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="e.g. Raj Sharma" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Company</span>
                  <input name="company" autoComplete="organization" className="mt-2 h-12 w-full border border-input-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-secondary/60 focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Your organization" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Work email *</span>
                  <input type="email" name="email" required autoComplete="email" className="mt-2 h-12 w-full border border-input-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-secondary/60 focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="you@company.com" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" className="mt-2 h-12 w-full border border-input-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-secondary/60 focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="+91" />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold">What can we help with? *</span>
                <input type="hidden" name="service" value={selectedService} required />
                <DropdownMenu>
                  <DropdownMenuTrigger
                    type="button"
                    className="mt-2 flex h-12 w-full items-center justify-between border border-input-border bg-background px-3 text-left text-sm text-foreground outline-none transition-colors hover:border-brand focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                  >
                    <span className={selectedService ? "text-foreground" : "text-secondary/60"}>
                      {selectedService || "Select a requirement"}
                    </span>
                    <ChevronDown className="size-4 text-secondary" aria-hidden />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[var(--anchor-width)] min-w-0">
                    {serviceOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSelectedService(option)}
                        className={selectedService === option ? "bg-brand/10" : undefined}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>

              <label className="block">
                <span className="text-sm font-semibold">A little more detail *</span>
                <textarea name="message" required rows={5} defaultValue={initialMessage} className="mt-2 w-full resize-y border border-input-border bg-background px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-secondary/60 focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Tell us about the equipment, timeline, locations, or support you need..." />
              </label>

              <div className="flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-secondary">
                  Your message is sent securely to our team from this website.
                </p>
                <button type="submit" disabled={isSubmitting} className=" cursor-pointer inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-brand-hover disabled:cursor-wait disabled:opacity-60">
                  {isSubmitting ? "Sending..." : "Send enquiry"} <Send className="size-4" aria-hidden />
                </button>
              </div>
              {submitError ? (
                <p role="alert" className="text-sm font-medium text-red-500">
                  {submitError}
                </p>
              ) : null}
            </form>
          )}
        </section>
      </PageContainer>

      <section className="border-y border-border-subtle bg-section-alt">
        <PageContainer className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Still exploring?</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">See how we support the full IT lifecycle.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="inline-flex min-h-11 items-center gap-2 bg-brand px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-brand-hover">
              Explore services <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/aboutus" className="inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
              About United Infonet <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
