"use client";

import { useReducedMotion } from "framer-motion";

/**
 * NFR-MOT-02 — reduced-motion handling implemented once, consumed
 * everywhere else. Defaults to `false` during SSR/first paint so server and
 * client markup match; framer-motion updates it after mount.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
