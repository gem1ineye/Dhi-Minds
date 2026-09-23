import type { LogoColors } from "@/components/ui/LogoSvg";

/**
 * Brand colours for generated images (favicon, app icon, social cards).
 * Satori cannot read CSS variables, so these mirror styles/tokens.css —
 * keep the two in sync.
 */
export const ogColors = {
  mist: "#E4E8F6",
  mistDeep: "#C4CCEC",
  ink: "#101223",
  grey: "#363C66",
  accent300: "#A3A1F6",
  accent400: "#6660F0",
  accent500: "#463ED2",
  accent700: "#322AA8",
} as const;

/** The logo's colours as the page uses them (components/ui/Logo.tsx), in hex. */
export const ogLogoColors: LogoColors = { dhi: ogColors.accent700, minds: ogColors.ink };
