"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Circle, LayoutGrid, Mail, Route, Tag, Users, type LucideIcon } from "lucide-react";
import type { NavItem } from "@/content/schema";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "/#services": LayoutGrid,
  "/#work": Briefcase,
  "/#process": Route,
  "/#pricing": Tag,
  "/#about": Users,
  "/contact": Mail,
};

/** "/#work" and "/contact" both name a section: `work` / `contact` is a home-page section and may also be a page of its own. */
const sectionOf = (href: string) => href.replace(/^\/#?/, "");

/** Longest a tap-to-scroll may hold the indicator on its target before handing back to the scroll position. */
const PENDING_MAX_MS = 2000;

/**
 * Mobile navigation (below `md`) — a frosted-glass tab bar at the bottom of the screen, in place of a
 * hamburger menu. Every tab shows its icon and its name. One accent pill marks where you are: it follows
 * the section being read on the home page and the page itself elsewhere (Work on /work, Contact on
 * /contact), and glides to a tab the moment it is tapped rather than flickering through every section
 * the page scrolls past. While a form field has focus the bar slides away so it never covers the keyboard.
 */
export function MobileDock({ navItems, activeSection }: { navItems: NavItem[]; activeSection: string | null }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pending, setPending] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  // A tapped tab owns the indicator until the scroll it started comes to rest.
  useEffect(() => {
    if (!pending) return;
    const release = () => setPending(null);
    const timer = window.setTimeout(release, PENDING_MAX_MS);
    window.addEventListener("scrollend", release, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scrollend", release);
    };
  }, [pending]);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      (el.isContentEditable ||
        el instanceof HTMLTextAreaElement ||
        el instanceof HTMLSelectElement ||
        (el instanceof HTMLInputElement && !["checkbox", "radio", "button", "submit", "reset", "range", "color", "file"].includes(el.type)));
    const onFocusIn = (e: FocusEvent) => setTyping(isField(e.target));
    const onFocusOut = (e: FocusEvent) => setTyping(isField(e.relatedTarget));
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const current = pending ?? (isHome ? activeSection : null);
  const activeIndex = navItems.findIndex((item) => {
    const section = sectionOf(item.href);
    return current === section || pathname === `/${section}` || pathname.startsWith(`/${section}/`);
  });
  const count = navItems.length;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[90] flex justify-center px-2 transition-[transform,opacity] duration-300 ease-standard min-[360px]:px-3 md:hidden",
        typing && "pointer-events-none translate-y-[calc(100%+1.5rem)] opacity-0",
      )}
    >
      <nav aria-label="Primary" className="glass-dock w-full max-w-[26rem] animate-dock-in rounded-[1.375rem] p-1.5">
        <ul className="relative grid" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
          {/* The indicator is one pill that slides between tabs — every tab is the same width, so its position is just the index. */}
          <li
            aria-hidden="true"
            className={cn(
              "glass-lens pointer-events-none absolute inset-y-0 left-0 rounded-2xl transition-[transform,opacity] duration-300 ease-standard",
              activeIndex === -1 && "opacity-0",
            )}
            style={{ width: `${100 / count}%`, transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
          />
          {navItems.map((item, i) => {
            const Icon = ICONS[item.href] ?? Circle;
            const active = i === activeIndex;
            const section = sectionOf(item.href);
            const isPage = pathname === `/${section}` || pathname.startsWith(`/${section}/`);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={active ? (isPage ? "page" : "location") : undefined}
                  onClick={() => {
                    if (item.href.startsWith("/#")) setPending(section);
                  }}
                  className={cn(
                    "flex touch-manipulation flex-col items-center gap-1 rounded-2xl pt-2 pb-1.5transition-[color,transform] duration-200 ease-standard [-webkit-tap-highlight-color:transparent] active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent-500",
                    active ? "text-accent-700" : "text-grey-500",
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={active ? 2.25 : 1.75} />
                  <span
                    className={cn(
                      // A faint light halo keeps the label crisp against whatever blurs past behind the glass.
                      "max-w-full truncate text-[0.625rem] leading-none [text-shadow:0_1px_0_rgb(255_255_255/0.6)] min-[360px]:text-[0.6875rem]",
                      active ? "font-semibold" : "font-medium",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
