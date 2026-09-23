import { ImageResponse } from "next/og";
import { GlyphSvg } from "@/components/ui/LogoSvg";
import { GLYPH_HEIGHT, GLYPH_WIDTH } from "@/components/ui/logo-art";
import { ogColors } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon — full-bleed square, since iOS applies its own corner mask. See app/icon.tsx and FR-BRD-08. */
export default function AppleIcon() {
  const glyphWidth = 104;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${ogColors.accent400}, ${ogColors.accent500})`,
        }}
      >
        <GlyphSvg color="#FFFFFF" width={glyphWidth} height={Math.round((glyphWidth * GLYPH_HEIGHT) / GLYPH_WIDTH)} />
      </div>
    ),
    { ...size },
  );
}
