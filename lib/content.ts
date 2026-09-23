/**
 * Single content accessor (FR-CMS-01). Components import from here, never
 * directly from /content — this is the seam a headless CMS replaces in v2
 * without touching a single component (FR-CMS-05).
 */
import { services as servicesData } from "@/content/services";
import { projects as projectsData } from "@/content/projects";
import { pricingTiers as pricingTiersData, pricingCustomBand as pricingCustomBandData } from "@/content/pricing";
import { consultation as consultationData } from "@/content/consultation";
import { testimonials as testimonialsData } from "@/content/testimonials";
import { clients as clientsData } from "@/content/clients";
import { faqs as faqsData } from "@/content/faq";
import { processSteps as processStepsData } from "@/content/process";
import { company as companyData } from "@/content/company";
import { primaryNav as primaryNavData, navCta as navCtaData, footerColumns as footerColumnsData } from "@/content/nav";
import { portfolioFilters as portfolioFiltersData } from "@/content/portfolio-filters";
import type { Project, FilterGroup } from "@/content/schema";

export function getServices() {
  return servicesData;
}

export function getService(id: string) {
  return servicesData.find((s) => s.id === id);
}

export function getProjects() {
  return projectsData;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projectsData.find((p) => p.featured) ?? projectsData[0];
}

export function getHomeProjects(limit = 6): Project[] {
  const featured = getFeaturedProject();
  const rest = projectsData.filter((p) => p.slug !== featured?.slug);
  const ordered = featured ? [featured, ...rest] : rest;
  return ordered.slice(0, limit);
}

export function getProjectsByFilter(filter: FilterGroup): Project[] {
  if (filter === "All") return projectsData;
  return projectsData.filter((p) => p.filterGroups.includes(filter));
}

export function getAdjacentProjects(slug: string) {
  const idx = projectsData.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = projectsData[(idx - 1 + projectsData.length) % projectsData.length];
  const next = projectsData[(idx + 1) % projectsData.length];
  return { prev, next };
}

export function getPortfolioFilters() {
  return portfolioFiltersData;
}

export function getPricingTiers() {
  return pricingTiersData;
}

export function getPricingCustomBand() {
  return pricingCustomBandData;
}

export function getConsultation() {
  return consultationData;
}

export function getTestimonials() {
  return testimonialsData;
}

export function getClients() {
  return clientsData;
}

export function getFaqs() {
  return faqsData;
}

export function getProcessSteps() {
  return processStepsData;
}

export function getCompany() {
  return companyData;
}

export function getPrimaryNav() {
  return primaryNavData;
}

export function getNavCta() {
  return navCtaData;
}

export function getFooterColumns() {
  return footerColumnsData;
}
