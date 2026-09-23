import { companySchema, type Company, type SocialLink } from "./schema";

/**
 * PRD §9 Company + Appendix B. Contact details, socials, and response SLA
 * are business-supplied configuration (Appendix B) — none were provided,
 * so they read from env vars with obviously-placeholder fallbacks. Unset
 * social platforms are omitted entirely rather than linked to "#"
 * (FR-FOOT-04). Real values go in `.env.local`; see `.env.example`.
 */

function socialLinks(): SocialLink[] {
  const candidates: { platform: string; label: string; env: string }[] = [
    { platform: "instagram", label: "Instagram", env: "NEXT_PUBLIC_SOCIAL_INSTAGRAM" },
    { platform: "linkedin", label: "LinkedIn", env: "NEXT_PUBLIC_SOCIAL_LINKEDIN" },
    { platform: "x", label: "X (Twitter)", env: "NEXT_PUBLIC_SOCIAL_X" },
    { platform: "facebook", label: "Facebook", env: "NEXT_PUBLIC_SOCIAL_FACEBOOK" },
    { platform: "youtube", label: "YouTube", env: "NEXT_PUBLIC_SOCIAL_YOUTUBE" },
    { platform: "behance", label: "Behance", env: "NEXT_PUBLIC_SOCIAL_BEHANCE" },
  ];
  return candidates
    .map((c) => ({ platform: c.platform, label: c.label, url: process.env[c.env] ?? "" }))
    .filter((c): c is SocialLink => Boolean(c.url));
}

const raw: Company = {
  name: "Dhi Minds",
  story:
    "Dhi Minds started in social and creative — so we understand distribution, not just deployment. Today we're a full-service digital studio: we design and build the websites, SaaS products, and applications a business runs on, then keep them growing with SEO, content, and strategy under one roof.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || undefined,
  location: process.env.NEXT_PUBLIC_PRIMARY_LOCATION || "[Add city / region before launch]",
  socials: socialLinks(),
  responseSLA: process.env.NEXT_PUBLIC_RESPONSE_SLA || "one business day",
  capabilities: [
    "From first idea to production-ready product, we bring strategy, design, development, and growth under one roof.",
  ],
  capabilitiesMode: "capabilities",
};

export const company: Company = companySchema.parse(raw);
