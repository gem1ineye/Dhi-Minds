"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { NavItem, Company } from "@/content/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/** FR-NAV-05/06 — full-height drawer, staggered reveal, focus trap, Esc/backdrop/link close, scroll lock. */
export function MobileDrawer({
  open,
  onClose,
  navItems,
  cta,
  company,
}: {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  cta: NavItem;
  company: Company;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Primary navigation"
      className={cn(
        "fixed inset-0 z-[90] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-ink-900/25 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        className={cn(
          "glass-flat absolute inset-y-0 right-0 flex w-[min(90vw,380px)] flex-col border-l border-accent-500/20 px-6 pb-8 pt-24 transition-transform duration-300 ease-[var(--ease-standard)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className="transition-[opacity,transform] duration-300 ease-out"
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-[var(--radius-sm)] py-3 font-display text-xl font-medium text-ink-900 focus-visible:outline-2 focus-visible:outline-accent-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-accent-500/25 pt-6">
          <Button href={cta.href} variant="accent" onClick={onClose} className="w-full">
            {cta.label}
          </Button>
          <div className="flex flex-col gap-1 font-mono text-xs text-grey-500">
            <a href={`mailto:${company.email}`} className="hover:text-accent-700">
              {company.email}
            </a>
            {company.phone && (
              <a href={`tel:${company.phone}`} className="hover:text-accent-700">
                {company.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
