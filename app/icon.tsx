import { ImageResponse } from "next/og";
import { GlyphSvg } from "@/components/ui/LogoSvg";
import { GLYPH_HEIGHT, GLYPH_WIDTH } from "@/components/ui/logo-art";
import { ogColors } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — the logo's धी in white on the accent gradient; the full mark is too detailed to read at 16–32px (FR-BRD-08). */
export default function Icon() {
  const glyphWidth = 20;
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
          borderRadius: 8,
        }}
      >
        <GlyphSvg color="#FFFFFF" width={glyphWidth} height={Math.round((glyphWidth * GLYPH_HEIGHT) / GLYPH_WIDTH)} />
      </div>
    ),
    { ...size },
  );
}
