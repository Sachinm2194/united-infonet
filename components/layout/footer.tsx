import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const serviceHighlights = [
  "Network Infrastructure",
  "Repair & Support",
  "IT Asset Recovery",
  "Security Solutions",
  "Rental & AMC",
];

const productHighlights = [
  "Routers & Switches",
  "Firewalls",
  "Wireless Access",
  "IP Phones",
  "Enterprise Modules",
];

const LinkedinIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
  </svg>
);

const WhatsappIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
  </svg>
);

const EmailIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
  </svg>
);

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
    <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" />
  </svg>
);

const socialLinks = [
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    icon: LinkedinIcon,
    colorClass: "text-[#0A66C2]",
  },
  {
    href: "https://wa.me/918431851549",
    label: "WhatsApp",
    icon: WhatsappIcon,
    colorClass: "text-[#25D366]",
  },
  {
    href: "mailto:sales@unitedinfonet.com",
    label: "Email",
    icon: EmailIcon,
    colorClass: "text-[#EA4335]",
  },
  {
    href: "tel:+918431851549",
    label: "Call",
    icon: PhoneIcon,
    colorClass: "text-[#34A853]",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-footer text-foreground">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* CTA / Contact Banner */}
        <div className="border-b border-border py-8">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background/50 p-6 shadow-sm backdrop-blur-xl sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Technology Solutions for Modern Business
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Need reliable IT infrastructure?
                </h2>

                <p className="mt-2 text-sm leading-6 text-secondary sm:text-base">
                  Talk to our team about networking, security, repairs,
                  infrastructure, AMC, rentals and enterprise IT solutions.
                </p>
              </div>

              <Link
                href="/contact?type=consult"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">

          {/* Company */}
          <div>
            <Link href="/" className="inline-flex flex-col items-start">
              <Image
                src="/Images/ui-logo.png"
                alt="United Infonet"
                width={180}
                height={66}
                className="h-12 w-auto max-w-[13rem] object-contain sm:h-14"
              />
              <span className="pl-1 text-[10px] leading-3 text-secondary">
                Performance. Security. Reliability.
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-secondary">
              Enabling resilient IT infrastructure through trusted technology
              sales, repair support, lifecycle management and strategic
              networking solutions for modern enterprises.
            </p>

            {/* Contact Details */}
            <div className="mt-6 space-y-3">

              <a
                href="tel:+918431851549"
                className="group flex items-center gap-3 text-sm text-secondary transition-colors hover:text-foreground"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60">
                  <PhoneIcon className="h-4 w-4 text-primary" />
                </span>

                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-secondary/70">
                    Call Us
                  </span>
                  <span className="font-medium text-foreground">
                    +91 84318 51549
                  </span>
                </span>
              </a>

              <a
                href="mailto:sales@unitedinfonet.com"
                className="group flex items-center gap-3 text-sm text-secondary transition-colors hover:text-foreground"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60">
                  <EmailIcon className="h-4 w-4 text-primary" />
                </span>

                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-secondary/70">
                    Email Us
                  </span>
                  <span className="font-medium text-foreground">
                    sales@unitedinfonet.com
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-3 text-sm text-secondary">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60">
                  <Clock3 className="h-4 w-4 text-primary" />
                </span>

                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-secondary/70">
                    Business Hours
                  </span>
                  <span className="font-medium text-foreground">
                    Mon - Sat · 9:00 AM - 7:00 PM
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3 text-sm text-secondary">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>

                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-secondary/70">
                    Visit Us
                  </span>
                  <span className="font-medium text-foreground">
                    No-717, 1st Floor, 19th Main Rd, 2nd Block,
                    <br />
                    Jnanabharathi BDA Layout, Gnanabharathi Layout 2nd Block,
                    <br />
                    Nagadevana Halli, Bengaluru, Karnataka 560056
                  </span>
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Connect With Us
              </p>

              <div className="flex items-center gap-8">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`transition-transform hover:-translate-y-1 hover:scale-110 ${social.colorClass}`}
                    >
                      <Icon className="h-8 w-8" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-primary opacity-60 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/contact?type=consult"
                  className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-primary opacity-60 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
              Services
            </h3>

            <ul className="mt-5 space-y-3">
              {serviceHighlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-2 text-sm text-secondary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  <span className="transition-colors group-hover:text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
              Products
            </h3>

            <ul className="mt-5 space-y-3">
              {productHighlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-2 text-sm text-secondary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70 transition-all group-hover:scale-125 group-hover:bg-primary" />
                  <span className="transition-colors group-hover:text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mini CTA */}
            <Link
              href="/solutions"
              className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary"
            >
              Explore all solutions
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-5">
          <div className="flex flex-col gap-4 text-xs text-secondary sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026{" "}
              <span className="font-medium text-foreground">
                United Infonet
              </span>
              . All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>

              <Link
                href="/contact"
                className="font-semibold text-primary transition-colors hover:text-foreground"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
