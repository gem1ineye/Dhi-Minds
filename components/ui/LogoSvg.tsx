import type { SVGProps } from "react";
import { DHI_PATH, GLYPH_HEIGHT, GLYPH_PATH, GLYPH_WIDTH, LOGO_HEIGHT, LOGO_WIDTH, MINDS_PATH } from "./logo-art";

export type LogoColors = { dhi: string; minds: string };

type SvgProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox">;

/**
 * The धी · Minds wordmark as plain SVG — no hooks, no next/image — so the same artwork renders in the
 * page (colours as CSS variables) and inside next/og image routes (colours as hex). Colours go through
 * `style`, which both the browser and Satori apply to SVG.
 */
export function LogoSvg({ colors, ...props }: { colors: LogoColors } & SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${LOGO_WIDTH} ${LOGO_HEIGHT}`}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      {...props}
    >
      <path d={DHI_PATH} style={{ fill: colors.dhi }} />
      <path d={MINDS_PATH} style={{ fill: colors.minds }} />
    </svg>
  );
}

/** धी on its own, in the same lettering as the logo. */
export function GlyphSvg({ color, ...props }: { color: string } & SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${GLYPH_WIDTH} ${GLYPH_HEIGHT}`}
      width={GLYPH_WIDTH}
      height={GLYPH_HEIGHT}
      {...props}
    >
      <path d={GLYPH_PATH} style={{ fill: color }} />
    </svg>
  );
}
