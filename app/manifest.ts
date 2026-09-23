import type { MetadataRoute } from "next";

/** NFR-SEO-13. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhi Minds",
    short_name: "Dhi Minds",
    description: "Digital agency for websites, SaaS products, and growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#D5DAF0",
    theme_color: "#D5DAF0",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
