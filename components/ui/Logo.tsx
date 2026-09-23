import { cn } from "@/lib/utils";
import { LogoSvg } from "./LogoSvg";

/**
 * Brand wordmark — धी in the accent, "Minds" in ink. धी (dhī) is Sanskrit for intellect, insight and
 * clear thought; it is lettered, not typeset, so screen readers get "Dhi Minds" instead.
 * Height sets the size, e.g. `className="h-8"`; width follows the artwork.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <LogoSvg
      role="img"
      aria-label="Dhi Minds"
      colors={{ dhi: "var(--accent-700)", minds: "var(--ink-900)" }}
      className={cn("h-8 w-auto", className)}
    />
  );
}
