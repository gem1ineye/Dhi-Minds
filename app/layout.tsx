import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppBubble } from "@/components/ui/WhatsAppBubble";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { getPrimaryNav, getNavCta, getCompany } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body-sans",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: "Dhi Minds | Digital agency for websites, SaaS & growth",
    description:
      "Dhi Minds designs and builds websites, SaaS products, and digital experiences, backed by SEO, social, and creative — a full-service digital and product studio.",
    path: "/",
  }),
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const company = getCompany();
  const orgJsonLd = organizationJsonLd(company);
  const siteJsonLd = websiteJsonLd();

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <div className="relative h-0">
          <div id="scroll-sentinel" className="absolute top-6 h-px w-px" />
        </div>
        <Navbar navItems={getPrimaryNav()} cta={getNavCta()} />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppBubble whatsappNumber={company.whatsappNumber} />
      </body>
    </html>
  );
}
