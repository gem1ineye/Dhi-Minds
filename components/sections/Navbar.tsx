"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileDock } from "./MobileDock";
import { useActiveSection } from "./useActiveSection";

const SECTION_IDS = ["services", "work", "about", "process", "pricing", "faq", "contact"];

/** FR-NAV-01..09 — PRD §8.1. Desktop shows the link bar; below `md` navigation is the glass dock (MobileDock). */
export function Navbar({ navItems, cta }: { navItems: NavItem[]; cta: NavItem }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? SECTION_IDS : []);

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
            className="flex items-center focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
          >
            <Logo className="h-9 lg:h-10" />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-4 lg:gap-8">
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

          <Button href={cta.href} variant="accent" size="sm" className="hidden md:inline-flex">
            {cta.label}
          </Button>
        </div>
      </header>

      <MobileDock navItems={navItems} activeSection={active} />
    </>
  );
}
