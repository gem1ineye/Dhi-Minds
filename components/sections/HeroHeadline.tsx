"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const LINES = ["We build digital experiences", "that move businesses forward."];

/** FR-HERO-02/06 — the only H1 on the page, real text, on-load reveal only (never a typewriter). */
export function HeroHeadline() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <h1 className="font-display text-[length:var(--text-display-xl)] font-medium leading-[1.02] tracking-[-0.03em] text-ink-900">
      {LINES.map((line, i) => (
        <span key={line} className="block overflow-hidden py-0.5">
          <motion.span
            className="block"
            initial={reducedMotion ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
