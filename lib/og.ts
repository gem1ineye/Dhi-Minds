import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

export const SANSKRIT_FONT_FAMILY = "Hind";

/**
 * Hind SemiBold, subset to just the glyphs of "धी" (≈5 KB) — Satori's
 * default fonts have no Devanagari, so without this the wordmark would
 * render as empty boxes. Add glyphs to the subset (pyftsubset) before using
 * this font for any other Sanskrit text.
 */
export async function loadSanskritFont() {
  const data = await readFile(join(process.cwd(), "assets/fonts/Hind-SemiBold-dhi.ttf"));
  return { name: SANSKRIT_FONT_FAMILY, data, style: "normal" as const, weight: 600 as const };
}
