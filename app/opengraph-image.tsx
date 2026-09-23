import { ImageResponse } from "next/og";
import { loadSanskritFont, ogColors, SANSKRIT_FONT_FAMILY } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** NFR-SEO-03 — sitewide default OG image, generated (not fabricated content, just the brand card). */
// Note: gradients fade to a zero-alpha copy of their own colour, not `transparent` — Satori treats that as transparent black and the fade goes muddy.
export default async function Image() {
  const font = await loadSanskritFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          background: `radial-gradient(circle at 10% 0%, rgba(120,132,228,0.7), rgba(120,132,228,0) 55%), radial-gradient(circle at 100% 100%, rgba(150,118,244,0.6), rgba(150,118,244,0) 55%), linear-gradient(135deg, ${ogColors.mist}, ${ogColors.mistDeep})`,
          color: ogColors.ink,
          fontFamily: "sans-serif",
        }}
      >
        {/* Frosted-glass card */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 64,
            borderRadius: 36,
            background: "rgba(255,255,255,0.55)",
            border: "2px solid rgba(255,255,255,0.85)",
            boxShadow: "0 30px 60px -20px rgba(40,48,130,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 104, lineHeight: 1, fontFamily: SANSKRIT_FONT_FAMILY, fontWeight: 600, color: ogColors.ink }}>
              धी
            </span>
            <div style={{ width: 2, height: 56, background: ogColors.accent500, opacity: 0.5 }} />
            <span style={{ fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: ogColors.accent700 }}>
              Dhi Minds
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 62, fontWeight: 600, maxWidth: 940, lineHeight: 1.1 }}>
            We build digital experiences that move businesses forward.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [font] },
  );
}
