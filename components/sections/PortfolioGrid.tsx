"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, FilterGroup } from "@/content/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { track } from "@/lib/analytics";

/** FR-PORT-01..10 — PRD §8.6. Shared by the home preview and the /work archive. */
export function PortfolioGrid({
  projects,
  filters,
  showFilters = false,
}: {
  projects: Project[];
  filters?: FilterGroup[];
  showFilters?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotionSafe();

  const initialFilter = (searchParams.get("category") as FilterGroup | null) ?? "All";
  const [filter, setFilter] = useState<FilterGroup>(
    filters?.includes(initialFilter) ? initialFilter : "All",
  );

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.filterGroups.includes(filter))),
    [projects, filter],
  );

  function onFilterChange(next: FilterGroup) {
    setFilter(next);
    track({ name: "portfolio_filter", filter: next });
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  }

  return (
    <div>
      {showFilters && filters && (
        <div role="group" aria-label="Filter portfolio by category" className="mb-10 flex flex-wrap gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => onFilterChange(f)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
                filter === f
                  ? "border-ink-900 bg-ink-900 text-mist-50"
                  : "glass-soft text-grey-500 hover:text-ink-900",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"} shown
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 glass-soft rounded-[var(--radius-md)] py-20 text-center">
          <p className="text-grey-500">No projects match this filter yet.</p>
          <Button variant="secondary" onClick={() => onFilterChange("All")}>
            Reset filter
          </Button>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout={!reducedMotion}
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className={i === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
              >
                <PortfolioCard project={project} featured={i === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
