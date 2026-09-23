"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * FR-DS-01 — the Gold Rule. A single 1px gold hairline runs as a continuous
 * vertical spine down the left edge of the content column from the point it
 * wraps (Hero) to the point it terminates (Final CTA), drawing downward on
 * scroll. Collapses to per-eyebrow tick marks below 768px (handled by
 * `Eyebrow`, not here) — this component renders desktop-only.
 */
export function GoldRuleProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.2", "end 0.8"],
  });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-4 hidden w-px md:block lg:left-6"
      >
        <div className="absolute inset-0 bg-grey-300" style={{ opacity: 0.5 }} />
        <motion.div
          className="absolute inset-x-0 top-0 bottom-0 origin-top bg-accent-500"
          style={reducedMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
        />
      </div>
      {children}
    </div>
  );
}
