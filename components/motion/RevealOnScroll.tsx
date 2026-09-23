"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * NFR-MOT-04 — IntersectionObserver-driven reveal, fires once. Only
 * transform + opacity are animated (NFR-MOT-03). Under reduced motion the
 * content renders in its final state immediately (NFR-MOT-01).
 */
export function RevealOnScroll({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reducedMotion = useReducedMotionSafe();

  if (reducedMotion) {
    if (as === "li") {
      return (
        <li ref={ref} className={className}>
          {children}
        </li>
      );
    }
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const motionProps = {
    initial: { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.4, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  };

  if (as === "li") {
    return (
      <motion.li ref={ref} className={className} {...motionProps}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div ref={ref} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
