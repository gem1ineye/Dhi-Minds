import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** NFR-SEO-08 — allows crawl, disallows /api/ and /thank-you, references the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
