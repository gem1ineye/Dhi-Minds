"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/utils";

/**
 * FR-CAP-01/CR-02 — renders only when the caller has a real, sourced value.
 * FR-CAP-04 — count-up for real metrics only, skipped under reduced motion;
 * the final value is always present in the DOM (no-JS and AT safe).
 */
export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/^[0-9.,]+/, "");
  const canCountUp = Number.isFinite(numeric) && numeric > 0 && /^[0-9.,]+/.test(value);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reducedMotion = useReducedMotionSafe();
  const [display, setDisplay] = useState(canCountUp && !reducedMotion ? "0" : value);

  useEffect(() => {
    if (!canCountUp || reducedMotion || !inView) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(numeric * eased)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [canCountUp, reducedMotion, inView, numeric, suffix]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      <span className="font-display text-[length:var(--text-display-lg)] font-medium text-ink-900">
        {display}
      </span>
      <span className="text-sm text-grey-500">{label}</span>
    </div>
  );
}
