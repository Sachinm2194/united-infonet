import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "#solutions", label: "Solutions" },
  { href: "#products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:flex-row md:items-end md:justify-between lg:px-10">
        <div className="min-w-0">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/Images/UI-logo.svg" alt="United Infonet" width={40} height={40} />
            <span className="text-sm font-semibold">United Infonet</span>
          </Link>
          <p className="mt-3 text-sm text-secondary">Performance. Security. Reliability.</p>
        </div>
        <nav className="min-w-0" aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-secondary transition-colors hover:text-foreground">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
