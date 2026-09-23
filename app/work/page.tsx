import { Suspense } from "react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { getProjects, getPortfolioFilters } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our work | Dhi Minds",
  description:
    "Browse the full portfolio of websites, SaaS products, e-commerce, and brand work from Dhi Minds, filterable by category.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getProjects();
  const filters = getPortfolioFilters();

  return (
    <Section
      surface="band"
      eyebrow="Portfolio"
      heading="Selected work"
      lede="A selection of websites, digital products, campaigns, and experiences we've built for ambitious businesses."
      headingLevel="h1"
      className="pt-32"
    >
      <Suspense fallback={<div className="h-96" />}>
        <PortfolioGrid projects={projects} filters={filters} showFilters />
      </Suspense>
    </Section>
  );
}
