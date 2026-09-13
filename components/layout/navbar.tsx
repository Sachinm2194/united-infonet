"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { buildSeriesPath, getNavProductMenu } from "@/lib/products";
import {
  buildServicePath,
  serviceMenuCatalog,
} from "@/lib/services";
import { buildSolutionPath, solutionCatalog } from "@/lib/solutions";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type MenuKey = "services" | "products" | "solutions";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "/solutions", label: "Solutions" },
  { href: "#products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

function isLinkActive(pathname: string, href: string, label?: string) {
  if (label === "Products") {
    return /^\/products\/[^/]+\/[^/]+/.test(pathname);
  }
  if (label === "Solutions") {
    return pathname.startsWith("/solutions");
  }
  if (href.startsWith("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

const MENU_HOVER_CLOSE_DELAY = 500;

function ProductsNavMenu({
  menuKey,
  pathname,
  onPointerEnter,
  onPointerLeave,
}: {
  menuKey: MenuKey;
  pathname: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const categories = getNavProductMenu();

  return (
    <>
      {categories.map((category) => (
        <DropdownMenuSub key={category.slug}>
          <DropdownMenuSubTrigger
            openOnHover
            delay={0}
            closeDelay={MENU_HOVER_CLOSE_DELAY}
            className={cn(
              pathname.startsWith(`/products/${category.slug}/`) && "bg-brand/5",
            )}
          >
            <span className="min-w-0 flex-1 whitespace-nowrap">{category.name}</span>
            <ChevronRight className="size-4 shrink-0 text-secondary" aria-hidden />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            data-nav-dropdown={menuKey}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
          >
            {category.children.map((child) => {
              const childHref = buildSeriesPath(category.slug, child.slug);
              const childActive = pathname === childHref || pathname.startsWith(`${childHref}/`);

              return (
                <DropdownMenuItem
                  key={child.slug}
                  className={cn("whitespace-nowrap", childActive && "bg-brand/5")}
                  render={<Link href={childHref} className="whitespace-nowrap" title={child.name} />}
                >
                  {child.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      ))}
    </>
  );
}

function ServiceMenuItems({ pathname }: { pathname: string }) {
  return serviceMenuCatalog.map((service) => {
    const href = buildServicePath(service.slug);
    const active = pathname === href;

    return (
      <DropdownMenuItem
        key={service.slug}
        className={cn(active && "bg-brand/5")}
        render={<Link href={href} className="gap-2" />}
      >
        <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
        {service.title}
      </DropdownMenuItem>
    );
  });
}

function MobileServiceMenuList({
  isMenuOpen,
  parentExpanded,
  onNavigate,
}: {
  isMenuOpen: boolean;
  parentExpanded: boolean;
  onNavigate: () => void;
}) {
  return serviceMenuCatalog.map((service) => (
    <Link
      key={service.slug}
      href={buildServicePath(service.slug)}
      tabIndex={isMenuOpen && parentExpanded ? 0 : -1}
      onClick={onNavigate}
      className="flex min-h-12 items-center gap-2 whitespace-normal rounded-lg px-3 text-xs leading-5 text-secondary hover:bg-card hover:text-foreground"
    >
      <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
      {service.title}
    </Link>
  ));
}

function SolutionMenuItems({ pathname }: { pathname: string }) {
  return solutionCatalog.map((solution) => {
    const href = buildSolutionPath(solution.slug);
    const active = pathname === href;

    return (
      <DropdownMenuItem
        key={solution.slug}
        className={cn(active && "bg-brand/5")}
        render={<Link href={href} className="gap-2" />}
      >
        <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
        {solution.name}
      </DropdownMenuItem>
    );
  });
}

function NavDropdownContent({
  menuKey,
  pathname,
  onPointerEnter,
  onPointerLeave,
}: {
  menuKey: MenuKey;
  pathname: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  return (
    <DropdownMenuContent
      align="end"
      sideOffset={6}
      className="min-w-64"
      data-nav-dropdown={menuKey}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {menuKey === "products" ? (
        <ProductsNavMenu
          menuKey={menuKey}
          pathname={pathname}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        />
      ) : menuKey === "services" ? (
        <ServiceMenuItems pathname={pathname} />
      ) : (
        <SolutionMenuItems pathname={pathname} />
      )}
    </DropdownMenuContent>
  );
}

function NavHoverMenu({
  menuKey,
  label,
  isActive,
  open,
  onMenuOpenChange,
  pathname,
  onIndicatorEnter,
  onIndicatorLeave,
  linkRef,
}: {
  menuKey: MenuKey;
  label: string;
  isActive: boolean;
  open: boolean;
  onMenuOpenChange: (menuKey: MenuKey | null) => void;
  pathname: string;
  onIndicatorEnter: (target: HTMLElement) => void;
  onIndicatorLeave: () => void;
  linkRef: (element: HTMLButtonElement | null) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const isPointerInMenu = useCallback(() => {
    const { x, y } = lastPointerRef.current;
    const target = document.elementFromPoint(x, y);
    if (!target) return false;
    if (triggerRef.current?.contains(target)) return true;
    return Boolean(target.closest(`[data-nav-dropdown="${menuKey}"]`));
  }, [menuKey]);

  const keepOpen = useCallback(() => {
    clearCloseTimer();
    onMenuOpenChange(menuKey);
  }, [clearCloseTimer, menuKey, onMenuOpenChange]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      if (!isPointerInMenu()) {
        onMenuOpenChange(null);
      }
    }, MENU_HOVER_CLOSE_DELAY);
  }, [clearCloseTimer, isPointerInMenu, onMenuOpenChange]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        keepOpen();
        return;
      }
      scheduleClose();
    },
    [keepOpen, scheduleClose],
  );

  const setTriggerRef = useCallback(
    (element: HTMLButtonElement | null) => {
      triggerRef.current = element;
      linkRef(element);
    },
    [linkRef],
  );

  useEffect(() => {
    if (!open) return;

    const trackPointer = (event: PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("pointermove", trackPointer);
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [open]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange} modal={false}>
      <DropdownMenuTrigger
        ref={setTriggerRef}
        openOnHover
        delay={0}
        closeDelay={MENU_HOVER_CLOSE_DELAY}
        onPointerEnter={(event) => {
          keepOpen();
          onIndicatorEnter(event.currentTarget);
        }}
        onPointerLeave={() => {
          scheduleClose();
          onIndicatorLeave();
        }}
        className={cn(
          "text-sm font-medium transition-colors outline-none",
          isActive ? "text-foreground" : "text-secondary hover:text-foreground",
        )}
      >
        {label}
        <ChevronDown className={cn("ml-1 inline size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </DropdownMenuTrigger>
      <NavDropdownContent
        menuKey={menuKey}
        pathname={pathname}
        onPointerEnter={keepOpen}
        onPointerLeave={scheduleClose}
      />
    </DropdownMenu>
  );
}

function MobileProductsNav({
  isMenuOpen,
  parentExpanded,
  onNavigate,
}: {
  isMenuOpen: boolean;
  parentExpanded: boolean;
  onNavigate: () => void;
}) {
  const categories = getNavProductMenu();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return categories.map((category) => {
    const isExpanded = expandedCategory === category.slug;

    return (
      <div key={category.slug} className="space-y-1">
        <button
          type="button"
          aria-expanded={isExpanded}
          className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-xs font-medium text-foreground hover:bg-card"
          onClick={() => setExpandedCategory(isExpanded ? null : category.slug)}
        >
          <span className="min-w-0 flex-1 pr-3 leading-5">{category.name}</span>
          <ChevronDown
            className={cn("size-4 shrink-0 text-secondary transition-transform duration-200", isExpanded && "rotate-180")}
            aria-hidden
          />
        </button>
        <div
          className={cn(
            "grid overflow-hidden pl-3 transition-[grid-template-rows,opacity]",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 space-y-1">
            {category.children.map((child) => (
              <Link
                key={child.slug}
                href={buildSeriesPath(category.slug, child.slug)}
                tabIndex={isMenuOpen && parentExpanded && isExpanded ? 0 : -1}
                onClick={onNavigate}
                className="flex min-h-10 items-center whitespace-normal rounded-lg px-3 text-xs leading-5 text-secondary hover:bg-card hover:text-foreground"
                title={child.name}
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  });
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<MenuKey | null>(null);
  const [openNavMenu, setOpenNavMenu] = useState<MenuKey | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const indicatorGlowRef = useRef<HTMLSpanElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});

  const activeNavLink = navLinks.find((link) => isLinkActive(pathname, link.href, link.label));
  const prefersReducedMotion = useRef(false);

  const moveIndicator = (target: HTMLElement | null) => {
    const indicator = indicatorRef.current;
    const glow = indicatorGlowRef.current;
    const nav = indicator?.parentElement;
    if (!indicator || !glow || !nav) return;
    if (!target) {
      gsap.to(indicator, { autoAlpha: 0, duration: 0.16, ease: "power2.out" });
      gsap.to(glow, { autoAlpha: 0, duration: 0.16, ease: "power2.out" });
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    gsap.to([indicator, glow], {
      autoAlpha: 1,
      x: targetRect.left - navRect.left,
      width: targetRect.width,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    prefersReducedMotion.current = reducedMotion;
    setIsScrolled(window.scrollY > 40);
    if (!reducedMotion) {
      gsap.from(logoRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.7,
        delay: 0.1,
        ease: "power2.out",
      });
    }

    const scrollTrigger = ScrollTrigger.create({
      start: 40,
      end: "max",
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 40);
      },
    });

    const activeTarget = activeNavLink ? linkRefs.current[activeNavLink.href] : null;
    moveIndicator(activeTarget);

    return () => scrollTrigger.kill();
  }, { scope: navbarRef, dependencies: [pathname] });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setIsMenuOpen(false);
      setExpandedMobile(null);
      setOpenNavMenu(null);
    });
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    html.classList.add("menu-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.classList.remove("menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header ref={navbarRef} className={cn("sticky top-0 z-[70] border-b", isScrolled ? "border-border-subtle bg-header/95 backdrop-blur-md" : "border-transparent bg-header/80")}>
        <div ref={headerContentRef} className="relative z-[70] mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/Images/UI-logo.svg"
              alt="United Infonet"
              width={36}
              height={36}
              ref={logoRef}
              className="size-10 shrink-0"
              priority
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold leading-tight text-foreground sm:text-base">
                United Infonet
              </span>
              <span className="hidden text-xs leading-tight text-secondary sm:block">
                Performance. Security. Reliability.
              </span>
            </div>
          </Link>

          <nav className="relative hidden flex-1 justify-end lg:mr-8 lg:flex">
            <ul className="relative flex items-center gap-5 lg:gap-8">
              <span ref={indicatorGlowRef} className="pointer-events-none absolute bottom-[-11px] left-0 h-1 rounded-full bg-brand/40 opacity-0 blur-[5px]" aria-hidden />
              <span ref={indicatorRef} className="pointer-events-none absolute bottom-[-10px] left-0 h-1 rounded-full bg-brand/10 opacity-0" aria-hidden />
              {navLinks.map((link) => {
                const isActive = isLinkActive(pathname, link.href, link.label);
                const menuKey = link.label === "Services" ? "services" : link.label === "Products" ? "products" : link.label === "Solutions" ? "solutions" : null;

                return (
                  <li key={link.href} className="relative">
                    {menuKey ? (
                      <NavHoverMenu
                        menuKey={menuKey}
                        label={link.label}
                        isActive={isActive}
                        open={openNavMenu === menuKey}
                        onMenuOpenChange={setOpenNavMenu}
                        pathname={pathname}
                        onIndicatorEnter={moveIndicator}
                        onIndicatorLeave={() => moveIndicator(activeNavLink ? linkRefs.current[activeNavLink.href] : null)}
                        linkRef={(element) => { linkRefs.current[link.href] = element; }}
                      />
                    ) : (
                      <Link
                        href={link.href}
                        ref={(element: HTMLElement | null) => { linkRefs.current[link.href] = element; }}
                        onMouseEnter={(event) => moveIndicator(event.currentTarget)}
                        onMouseLeave={() => moveIndicator(activeNavLink ? linkRefs.current[activeNavLink.href] : null)}
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-secondary hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#contact"
              className="navbar-quote-shimmer inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-brand px-3 text-xs font-medium text-on-accent transition-colors hover:bg-brand-hover sm:h-10 sm:px-4 sm:text-sm md:px-5"
            >
              Get a Quote
            </Link>

            <Button
              ref={mobileButtonRef}
              variant="outline"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-card lg:hidden",
                isMenuOpen && "pointer-events-none invisible",
              )}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
            </Button>
            <ThemeToggle className="hidden lg:inline-flex" />
          </div>
        </div>
      </header>

      {isMounted
        ? createPortal(
            <div className="lg:hidden">
              <button
                type="button"
                aria-label="Close menu"
                className={cn(
                  "fixed inset-0 z-[100] bg-overlay transition-opacity duration-300 ease-out motion-reduce:transition-none",
                  isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={isMenuOpen ? 0 : -1}
                aria-hidden={!isMenuOpen}
              />

              <nav
                id="mobile-nav"
                aria-label="Mobile navigation"
                aria-hidden={!isMenuOpen}
                inert={!isMenuOpen ? true : undefined}
                className={cn(
                  "fixed top-0 right-0 bottom-0 z-[110] flex h-dvh max-h-dvh w-[min(85vw,20rem)] max-w-full flex-col border-l border-border bg-header shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none",
                  isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
                )}
                style={{ height: "100dvh", maxHeight: "100dvh" }}
              >
                <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4">
                  <span className="text-sm font-semibold text-foreground">Menu</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <ThemeToggle />
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-card"
                      aria-label="Close menu"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  </div>
                </div>

                <ul
                  className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2"
                  data-lenis-prevent
                >
                  {navLinks.map((link) => {
                    const isActive = isLinkActive(pathname, link.href, link.label);
                    const menuKey = link.label === "Services" ? "services" : link.label === "Products" ? "products" : link.label === "Solutions" ? "solutions" : null;

                    return (
                      <li key={link.href} data-mobile-item>
                        {menuKey ? (
                          <button
                            type="button"
                            aria-expanded={expandedMobile === menuKey}
                            className={cn(
                              "flex min-h-14 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm font-medium",
                              isActive ? "bg-card text-foreground" : "text-secondary hover:bg-card hover:text-foreground",
                            )}
                            onClick={() => {
                              setExpandedMobile((current) => (current === menuKey ? null : menuKey));
                            }}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={cn(
                                "size-4 shrink-0 text-secondary transition-transform duration-200",
                                expandedMobile === menuKey && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            tabIndex={isMenuOpen ? 0 : -1}
                            className={cn(
                              "flex min-h-14 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-card text-foreground"
                                : "text-secondary hover:bg-card hover:text-foreground",
                            )}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                        {menuKey && (
                          <div
                            className={cn(
                              "grid overflow-hidden pl-3 transition-[grid-template-rows,opacity] duration-200",
                              expandedMobile === menuKey ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                            )}
                          >
                            <div className="min-h-0">
                              {menuKey === "products" ? (
                                <MobileProductsNav
                                  isMenuOpen={isMenuOpen}
                                  parentExpanded={expandedMobile === menuKey}
                                  onNavigate={() => setIsMenuOpen(false)}
                                />
                              ) : menuKey === "services" ? (
                                <MobileServiceMenuList
                                  isMenuOpen={isMenuOpen}
                                  parentExpanded={expandedMobile === menuKey}
                                  onNavigate={() => setIsMenuOpen(false)}
                                />
                              ) : (
                                <div className="space-y-0.5 pb-1">
                                  {solutionCatalog.map((solution) => (
                                    <Link
                                      key={solution.slug}
                                      href={buildSolutionPath(solution.slug)}
                                      tabIndex={isMenuOpen && expandedMobile === menuKey ? 0 : -1}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="flex min-h-12 items-center gap-2 whitespace-normal rounded-lg px-3 text-xs leading-5 text-secondary hover:bg-card hover:text-foreground"
                                    >
                                      <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden />
                                      {solution.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="shrink-0 border-t border-border bg-header px-3 py-3">
                  <Link
                    href="#contact"
                    tabIndex={isMenuOpen ? 0 : -1}
                    className="navbar-quote-shimmer flex min-h-14 items-center justify-center rounded-lg bg-brand px-4 text-sm font-medium text-on-accent transition-colors hover:bg-brand-hover"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get a Quote
                  </Link>
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
