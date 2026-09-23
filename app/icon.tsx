import { ImageResponse } from "next/og";
import { loadSanskritFont, ogColors, SANSKRIT_FONT_FAMILY } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — a white Sanskrit "धी" on the indigo accent gradient, so it stays visible on light browser tabs. Replace with the approved mark when FR-BRD-08 is decided. */
export default async function Icon() {
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
          fontSize: 21,
          fontFamily: SANSKRIT_FONT_FAMILY,
          fontWeight: 600,
          borderRadius: 9,
          paddingBottom: 2,
        }}
      >
        धी
      </div>
    ),
    { ...size, fonts: [font] },
  );
}
