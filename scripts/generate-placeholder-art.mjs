// One-off generator for abstract geometric placeholder imagery.
// PRD FR-DS-06 explicitly permits "abstract geometric compositions built
// from the blue/gold system" as imagery — used here only until real project
// screenshots are supplied (§3.3, CR-01: never fabricate real work).
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images", "placeholders");
mkdirSync(OUT, { recursive: true });

const INK900 = "#060F1F";
const INK800 = "#0A1A33";
const BLUE600 = "#1D4ED8";
const BLUE500 = "#2563EB";
const GOLD500 = "#C9A227";
const GOLD300 = "#E4C05C";

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function art({ width, height, seed, label }) {
  const rnd = seeded(seed * 97 + 13);
  const cx = width * (0.25 + rnd() * 0.5);
  const cy = height * (0.2 + rnd() * 0.4);
  const r = Math.min(width, height) * (0.35 + rnd() * 0.25);

  const lines = Array.from({ length: 5 }, (_, i) => {
    const y = (height / 6) * (i + 1);
    const x2 = width * (0.55 + rnd() * 0.4);
    return `<line x1="0" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${(y - height * 0.08).toFixed(1)}" stroke="${GOLD500}" stroke-opacity="${(0.06 + rnd() * 0.08).toFixed(2)}" stroke-width="1"/>`;
  }).join("");

  const dots = Array.from({ length: 8 }, () => {
    const x = rnd() * width;
    const y = rnd() * height;
    const r2 = 1 + rnd() * 2;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r2.toFixed(1)}" fill="${GOLD300}" fill-opacity="${(0.2 + rnd() * 0.3).toFixed(2)}"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="g${seed}" cx="${((cx / width) * 100).toFixed(0)}%" cy="${((cy / height) * 100).toFixed(0)}%" r="75%">
      <stop offset="0%" stop-color="${BLUE500}" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="${BLUE600}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${INK900}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="base${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${INK800}"/>
      <stop offset="100%" stop-color="${INK900}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#base${seed})"/>
  <rect width="${width}" height="${height}" fill="url(#g${seed})"/>
  ${lines}
  ${dots}
  <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${GOLD500}" stroke-opacity="0.25" stroke-width="1"/>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="${GOLD500}" stroke-opacity="0.24" stroke-width="1"/>
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="middle" font-family="ui-monospace, monospace" font-size="${Math.round(width * 0.018)}" letter-spacing="2" fill="${GOLD300}" fill-opacity="0.55">${label}</text>
</svg>`;
}

const jobs = [
  { name: "cover-01", width: 1600, height: 1000, seed: 1, label: "PLACEHOLDER — REPLACE BEFORE LAUNCH" },
  { name: "cover-02", width: 1600, height: 1000, seed: 2, label: "PLACEHOLDER — REPLACE BEFORE LAUNCH" },
  { name: "cover-03", width: 1600, height: 1000, seed: 3, label: "PLACEHOLDER — REPLACE BEFORE LAUNCH" },
  { name: "hero-01", width: 1600, height: 900, seed: 4, label: "PLACEHOLDER — REPLACE BEFORE LAUNCH" },
  { name: "hero-02", width: 1600, height: 900, seed: 5, label: "PLACEHOLDER — REPLACE BEFORE LAUNCH" },
  { name: "hero-03", width: 1600, height: 900, seed: 6, label: "PLACEHOLDER — REPLACE BEFORE LAUNCH" },
  { name: "gallery-01", width: 1600, height: 1000, seed: 7, label: "PLACEHOLDER — DESIGN GALLERY" },
  { name: "gallery-02", width: 1600, height: 1000, seed: 8, label: "PLACEHOLDER — DESIGN GALLERY" },
  { name: "gallery-03", width: 1600, height: 1000, seed: 9, label: "PLACEHOLDER — DESIGN GALLERY" },
  { name: "gallery-04", width: 1600, height: 1000, seed: 10, label: "PLACEHOLDER — DESIGN GALLERY" },
  { name: "gallery-05", width: 1600, height: 1000, seed: 11, label: "PLACEHOLDER — DESIGN GALLERY" },
  { name: "gallery-06", width: 1600, height: 1000, seed: 12, label: "PLACEHOLDER — DESIGN GALLERY" },
  { name: "hero-card-01", width: 960, height: 640, seed: 13, label: "PROJECT PREVIEW" },
  { name: "hero-card-02", width: 960, height: 640, seed: 14, label: "PROJECT PREVIEW" },
  { name: "hero-card-03", width: 960, height: 640, seed: 15, label: "PROJECT PREVIEW" },
];

for (const job of jobs) {
  const svg = art(job);
  writeFileSync(path.join(OUT, `${job.name}.svg`), svg, "utf8");
  console.log("wrote", job.name + ".svg");
}
