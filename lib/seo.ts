import type { Metadata } from "next";
import { siteConfig } from "./site";

/** NFR-SEO-02/03/04/06 — one metadata builder so every route stays consistent. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImagePath?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(opts.path, siteConfig.url).toString();
  const ogImage = opts.ogImagePath ? new URL(opts.ogImagePath, siteConfig.url).toString() : undefined;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: opts.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/** NFR-SEO-05 — Organization + WebSite JSON-LD, sitewide. FR-BRD-02/03. */
export function organizationJsonLd(company: {
  name: string;
  legalName?: string;
  email: string;
  phone?: string;
  socials: { url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: siteConfig.url,
    logo: new URL("/icon", siteConfig.url).toString(),
    email: company.email,
    telephone: company.phone,
    sameAs: company.socials.map((s) => s.url),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: siteConfig.name,
  };
}

export function serviceJsonLd(services: { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: siteConfig.name },
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function creativeWorkJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  coverImage: { src: string };
  year: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: new URL(`/work/${project.slug}`, siteConfig.url).toString(),
    image: new URL(project.coverImage.src, siteConfig.url).toString(),
    dateCreated: String(project.year),
    creator: { "@type": "Organization", name: siteConfig.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
