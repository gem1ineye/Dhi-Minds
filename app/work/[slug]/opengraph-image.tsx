import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/content";
import { LogoSvg } from "@/components/ui/LogoSvg";
import { LOGO_HEIGHT, LOGO_WIDTH } from "@/components/ui/logo-art";
import { ogColors, ogLogoColors } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** FR-CS-07 — unique OG image per case study. */
// Note: gradients fade to a zero-alpha copy of their own colour, not `transparent` — Satori treats that as transparent black and the fade goes muddy.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const logoWidth = 150;

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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <LogoSvg colors={ogLogoColors} width={logoWidth} height={Math.round((logoWidth * LOGO_HEIGHT) / LOGO_WIDTH)} />
          {project && (
            <>
              <div style={{ width: 28, height: 2, background: ogColors.accent500 }} />
              <span style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: ogColors.accent700 }}>
                {`${project.category} · ${project.year}`}
              </span>
            </>
          )}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 54, fontWeight: 600, maxWidth: 940, lineHeight: 1.15 }}>
          {project?.title ?? "Dhi Minds"}
        </div>
      </div>
    ),
    { ...size },
  );
}
