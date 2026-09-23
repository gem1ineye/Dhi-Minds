"use client";

import { createContext, useContext, useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedHeight } from "./AnimatedHeight";

type AccordionMode = "single" | "multi";

const AccordionContext = createContext<{
  openIds: Set<string>;
  toggle: (id: string) => void;
} | null>(null);

/** FR-FAQ-01/02/03 — native buttons, aria-expanded/controls, keyboard-operable. */
export function Accordion({
  mode = "single",
  children,
  className,
}: {
  mode?: AccordionMode;
  children: ReactNode;
  className?: string;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (mode === "single") next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openIds, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  id,
  trigger,
  children,
  className,
}: {
  id: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  const open = ctx.openIds.has(id);
  const reactId = useId();
  const panelId = `panel-${reactId}`;
  const triggerId = `trigger-${reactId}`;

  return (
    <div className={cn("border-b border-accent-500/20", className)}>
      <h3 className="m-0">
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => ctx.toggle(id)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-[length:var(--text-heading-sm)] font-medium focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2"
        >
          <span>{trigger}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-accent-700 transition-transform duration-[var(--duration-base)]",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>
      <AnimatedHeight open={open} id={panelId}>
        <div role="region" aria-labelledby={triggerId} className="measure pb-6 text-grey-500">
          {children}
        </div>
      </AnimatedHeight>
    </div>
  );
}
