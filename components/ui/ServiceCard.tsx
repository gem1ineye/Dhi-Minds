"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Code2, Layers, TrendingUp, Share2, Palette, Compass, type LucideIcon } from "lucide-react";
import type { Service } from "@/content/schema";
import { cn } from "@/lib/utils";
import { AnimatedHeight } from "./AnimatedHeight";
import { track } from "@/lib/analytics";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  layers: Layers,
  "trending-up": TrendingUp,
  "share-2": Share2,
  palette: Palette,
  compass: Compass,
};

/** FR-SVC-01..06 — PRD §8.4. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = icons[service.icon] ?? Code2;
  const domId = `services-${service.id}`;
  const panelId = `${domId}-panel`;
  const triggerId = `${domId}-trigger`;

  useEffect(() => {
    // location.hash isn't available during SSR — deep-link expansion has to
    // happen post-hydration, so setting it earlier would mismatch the
    // server-rendered (collapsed) markup.
    if (window.location.hash === `#${domId}`) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
      document.getElementById(domId)?.scrollIntoView({ block: "center" });
    }
  }, [domId]);

  return (
    <div
      id={domId}
      className={cn("group glass glass-lift flex flex-col rounded-[var(--radius-md)] p-6")}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs text-grey-500">{String(index + 1).padStart(2, "0")}</span>
        <Icon aria-hidden="true" className="size-6 text-accent-700" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-[length:var(--text-heading-sm)] font-medium text-ink-900">
        {service.title}
      </h3>
      <p className="mt-2 text-grey-500">{service.description}</p>

      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) track({ name: "service_expand", serviceId: service.id });
        }}
        className="mt-5 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2"
      >
        Learn more
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-[var(--duration-base)]", open && "rotate-180")}
        />
      </button>

      <AnimatedHeight open={open} id={panelId}>
        <ul
          role="region"
          aria-labelledby={triggerId}
          className="mt-4 flex flex-col gap-2 border-t border-accent-500/20 pt-4"
        >
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2 text-sm text-charcoal">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" />
              {cap}
            </li>
          ))}
        </ul>
      </AnimatedHeight>
    </div>
  );
}
