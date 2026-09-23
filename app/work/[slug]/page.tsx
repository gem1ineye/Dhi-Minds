import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/content";
import { buildMetadata, creativeWorkJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { DesignGallery } from "@/components/sections/DesignGallery";
import { BackToWork } from "@/components/sections/BackToWork";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/work/${project.slug}`,
    ogImagePath: project.seo.ogImage,
  });
}

/** FR-CS-01..09 — PRD §8.7. Fixed nine-block structure; Results renders only when real, sourced data exists. */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;
  const { prev, next } = getAdjacentProjects(project.slug);
  const jsonLd = creativeWorkJsonLd(project);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Work", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ]);

  return (
    <article>
      <Script id="creativework-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* 1. Hero */}
      <header className="relative pt-32 pb-16">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-8">
            <BackToWork />
          </div>
          <p className="font-mono text-xs uppercase tracking-wide text-accent-700">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[length:var(--text-display-lg)] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900">
            {project.title}
          </h1>
          <p className="mt-3 text-grey-500">{project.client}</p>
        </div>
        <div className="relative mx-auto mt-10 max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="glass-strong rounded-[var(--radius-lg)] p-2.5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(var(--radius-lg)-10px)]">
              <Image
                src={cs.heroImage.src}
                alt={cs.heroImage.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
        {/* 2. Overview */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-accent-500/20 pb-12 sm:grid-cols-4">
          {[
            { label: "Client", value: project.client },
            { label: "Industry", value: cs.overview.industry },
            { label: "Project type", value: cs.overview.projectType },
            { label: "Timeline", value: cs.overview.timeline },
          ].map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-xs uppercase tracking-wide text-grey-500">{item.label}</dt>
              <dd className="mt-1 text-sm text-charcoal">{item.value}</dd>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4">
            <dt className="font-mono text-xs uppercase tracking-wide text-grey-500">Services provided</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {cs.overview.servicesProvided.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </dd>
          </div>
        </dl>

        {/* 3. The Challenge */}
        <section className="py-12">
          <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">The challenge</h2>
          <p className="measure mt-4 leading-relaxed text-grey-500">{cs.challenge}</p>
        </section>

        {/* 4. Our Approach */}
        <section className="py-12">
          <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">Our approach</h2>
          <p className="measure mt-4 leading-relaxed text-grey-500">{cs.approach}</p>
        </section>

        {/* 5. What We Built */}
        <section className="py-12">
          <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">What we built</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {cs.built.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-grey-500">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 6. Design gallery */}
      <section className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-12">
        <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">Design</h2>
        <div className="mt-6">
          <DesignGallery images={cs.designGallery} />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        {/* 7. Results — conditional (FR-CS-02) */}
        {cs.results && cs.results.length > 0 && (
          <section className="border-t border-accent-500/20 py-12">
            <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">Results</h2>
            <dl className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {cs.results.map((r) => (
                <div key={r.label}>
                  <dt className="font-display text-[length:var(--text-display-lg)] font-medium text-ink-900">
                    {r.value}
                  </dt>
                  <dd className="mt-1 text-sm text-grey-500">{r.label}</dd>
                  <dd className="mt-0.5 font-mono text-xs text-grey-500">Source: {r.source}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* 8. Technology */}
        <section className="border-t border-accent-500/20 py-12">
          <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">Technology</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cs.technologies.map((t) => (
              <Tag key={t} variant="accent">
                {t}
              </Tag>
            ))}
          </div>
        </section>
      </div>

      {/* 9. CTA */}
      <section className="border-y border-accent-500/10 bg-white/25 py-16 text-center">
        <h2 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">
          Have a similar challenge?
        </h2>
        <div className="mt-6">
          <Button href="/contact" variant="primary" size="lg" showArrow>
            Let&apos;s talk
          </Button>
        </div>
      </section>

      {/* Prev/next + back to work */}
      <nav aria-label="Other projects" className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        {prev && (
          <Link href={`/work/${prev.slug}`} className="group flex items-center gap-2 text-sm text-grey-500 hover:text-ink-900">
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>
              Previous <span className="font-medium text-ink-900">{prev.title}</span>
            </span>
          </Link>
        )}
        {next && (
          <Link href={`/work/${next.slug}`} className="group flex items-center gap-2 text-sm text-grey-500 hover:text-ink-900 sm:ml-auto">
            <span>
              Next <span className="font-medium text-ink-900">{next.title}</span>
            </span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </nav>
    </article>
  );
}
