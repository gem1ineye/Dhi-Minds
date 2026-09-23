import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/content";
import { loadSanskritFont, ogColors, SANSKRIT_FONT_FAMILY } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** FR-CS-07 — unique OG image per case study. */
// Note: gradients fade to a zero-alpha copy of their own colour, not `transparent` — Satori treats that as transparent black and the fade goes muddy.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const font = await loadSanskritFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: `radial-gradient(circle at 10% 0%, rgba(120,132,228,0.7), rgba(120,132,228,0) 55%), radial-gradient(circle at 100% 100%, rgba(150,118,244,0.5), rgba(150,118,244,0) 55%), linear-gradient(135deg, ${ogColors.mist}, ${ogColors.mistDeep})`,
          color: ogColors.ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 44, lineHeight: 1, fontFamily: SANSKRIT_FONT_FAMILY, fontWeight: 600, color: ogColors.ink }}>धी</span>
          <div style={{ width: 28, height: 2, background: ogColors.accent500 }} />
          <span style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: ogColors.accent700 }}>
            {project ? `${project.category} · ${project.year}` : "Dhi Minds"}
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 54, fontWeight: 600, maxWidth: 940, lineHeight: 1.15 }}>
          {project?.title ?? "Dhi Minds"}
        </div>
      </div>
    ),
    { ...size, fonts: [font] },
  );
}
