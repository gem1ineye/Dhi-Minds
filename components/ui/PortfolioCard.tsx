import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/schema";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

/**
 * FR-PORT-04..06 — PRD §8.6. The cover box takes the image's own aspect ratio so it is never
 * cropped. A project with no case study renders as a plain, non-linked card.
 */
export function PortfolioCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const linked = Boolean(project.caseStudy);
  const className = cn(
    "flex flex-col",
    linked && "group focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4",
    featured && "md:col-span-2",
  );

  const body = (
    <>
      <div className="glass rounded-[var(--radius-lg)] p-2 transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:-translate-y-0.5 group-hover:shadow-[var(--glass-shadow-lift)]">
       <div
        className="relative overflow-hidden rounded-[calc(var(--radius-lg)-8px)]"
        style={{ aspectRatio: `${project.coverImage.width} / ${project.coverImage.height}` }}
       >
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
       </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-2">
        <div className="flex flex-col gap-1.5 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink-900">{project.client}</span>
            <span
              className="font-mono text-xs uppercase tracking-wide text-grey-500 transition-colors duration-300 group-hover:text-accent-700"
            >
              {project.category}
            </span>
          </div>
          <p className="line-clamp-2 text-sm text-grey-500">{project.summary}</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.services.slice(0, 3).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
            <span className="font-mono text-xs text-grey-500">{project.year}</span>
          </div>
        </div>
        {linked && (
          <span
            aria-hidden="true"
            className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full glass-soft text-grey-500 transition-[transform,color,border-color] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45 group-hover:border-accent-500 group-hover:text-accent-700"
          >
            <ArrowUpRight className="size-4" />
          </span>
        )}
      </div>
      {linked && <span className="sr-only">View case study</span>}
    </>
  );

  return linked ? (
    <Link href={`/work/${project.slug}`} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
