/**
 * Site-wide config sourced from env (Appendix B). `NEXT_PUBLIC_SITE_URL`
 * must be set to the real canonical domain before launch — it falls back
 * to localhost for development so the build never fails on a missing value.
 */
export const siteConfig = {
  name: "Dhi Minds",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  titleTemplate: "%s | Dhi Minds",
  defaultTitle: "Dhi Minds | Digital agency for websites, SaaS & growth",
  defaultDescription:
    "Dhi Minds designs and builds websites, SaaS products, and digital experiences, backed by SEO, social, and creative — a full-service digital and product studio.",
  themeColor: "#D5DAF0",
  locale: "en_US",
  /** NFR-SEC-07 — Appendix B {{RETENTION_PERIOD}}, default 24 months. */
  retentionPeriod: process.env.NEXT_PUBLIC_RETENTION_PERIOD || "24 months",
  /** Appendix B {{GRIEVANCE_CONTACT}} — falls back to the general contact address until a dedicated one is supplied. */
  grievanceContact: process.env.NEXT_PUBLIC_GRIEVANCE_CONTACT || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
};
