import { ImageResponse } from "next/og";
import { loadSanskritFont, ogColors, SANSKRIT_FONT_FAMILY } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon — see app/icon.tsx and FR-BRD-08. */
export default async function AppleIcon() {
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
          background: `linear-gradient(135deg, ${ogColors.accent400}, ${ogColors.accent500})`,
          color: "#FFFFFF",
          fontSize: 112,
          fontFamily: SANSKRIT_FONT_FAMILY,
          fontWeight: 600,
          paddingBottom: 10,
        }}
      >
        धी
      </div>
    ),
    { ...size, fonts: [font] },
  );
}
