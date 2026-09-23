"use client";

import type { ReactNode } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * Shared low-level disclosure mechanic used by `AccordionItem` (FAQ) and
 * `ServiceCard` ("Learn more"). NFR-MOT-03 carves out an explicit exception
 * for accordions: a grid-rows technique, not `height`, with the transition
 * skipped entirely under reduced motion.
 */
export function AnimatedHeight({
  open,
  children,
  durationMs = 240,
  id,
}: {
  open: boolean;
  children: ReactNode;
  durationMs?: number;
  id?: string;
}) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <div
      id={id}
      style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: reducedMotion ? "none" : `grid-template-rows ${durationMs}ms ease-out`,
      }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
