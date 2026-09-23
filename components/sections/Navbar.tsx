"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem, Company } from "@/content/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileDrawer } from "./MobileDrawer";
import { useActiveSection } from "./useActiveSection";

const SECTION_IDS = ["services", "work", "about", "process", "pricing", "faq", "contact"];

/** FR-NAV-01..09 — PRD §8.1. */
export function Navbar({
  navItems,
  cta,
  company,
}: {
  navItems: NavItem[];
  cta: NavItem;
  company: Company;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? SECTION_IDS : []);
  const triggerId = useId();

  // Close the drawer on navigation. Derived during render (React's
  // "adjusting state when a prop changes" pattern) rather than an effect,
  // since pathname is already available synchronously — no extra render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setDrawerOpen(false);
  }

  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 transition-[height,background-color,backdrop-filter,border-color,box-shadow] duration-240 ease-standard",
          // Transparent over the page glow at the very top; once the user
          // scrolls (or on any inner route) it becomes a frosted-glass bar,
          // like a system toolbar — content scrolls visibly blurred beneath it.
          scrolled || !isHome
            ? "glass-flat h-16 border-b border-accent-500/15"
            : "h-20 border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-lg focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const sectionId = item.href.startsWith("/#") ? item.href.slice(2) : null;
                const isActive = Boolean(sectionId && sectionId === active);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-2 text-sm font-medium text-ink-900/70 transition-colors duration-150 hover:text-ink-900",
                        isActive && "text-ink-900",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent-500 transition-transform duration-200",
                          isActive && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button href={cta.href} variant="accent" size="sm" className="hidden md:inline-flex">
              {cta.label}
            </Button>
            <button
              id={triggerId}
              type="button"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              onClick={() => setDrawerOpen((v) => !v)}
              className="relative flex size-10 items-center justify-center rounded-full text-ink-900 md:hidden"
            >
              <Menu
                aria-hidden="true"
                className={cn("absolute size-6 transition-all duration-300", drawerOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100")}
              />
              <X
                aria-hidden="true"
                className={cn("absolute size-6 transition-all duration-300", drawerOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} navItems={navItems} cta={cta} company={company} />
    </>
  );
}
