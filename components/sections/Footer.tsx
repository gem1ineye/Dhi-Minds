import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getFooterColumns, getCompany } from "@/lib/content";
import { Wordmark } from "@/components/ui/Wordmark";

/** FR-FOOT-01..06 — PRD §8.15. */
export function Footer() {
  const columns = getFooterColumns();
  const company = getCompany();
  const year = new Date().getFullYear();

  return (
    <footer className="glass-flat relative border-t border-accent-500/25 bg-white/30 text-grey-500">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="text-xl">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-grey-500">
              A digital and product studio — websites, SaaS, and applications, backed by SEO,
              creative, and strategy.
            </p>
            <p className="mt-3 max-w-xs text-xs text-grey-500">
              <span lang="sa" className="font-sanskrit text-base text-ink-900">
                धी
              </span>{" "}
              (dhī) — Sanskrit for intellect, insight, and clear thought.
            </p>
            {company.socials.length > 0 && (
              <ul className="mt-6 flex items-center gap-3">
                {company.socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-9 items-center justify-center rounded-full glass-soft font-mono text-xs text-ink-900 transition-colors hover:text-accent-700"
                    >
                      <span aria-hidden="true">{s.label[0]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="font-mono text-xs uppercase tracking-wide text-accent-700">{col.heading}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-grey-500 hover:text-ink-900">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Spans two columns so a full email address fits on one line instead of breaking mid-word. */}
            <div className="col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-wide text-accent-700">Contact</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-grey-500">
                <li className="flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-3.5 shrink-0 text-accent-500" />
                  <a href={`mailto:${company.email}`} className="min-w-0 [overflow-wrap:anywhere] hover:text-ink-900">
                    {company.email}
                  </a>
                </li>
                {company.phone && (
                  <li className="flex items-center gap-2">
                    <Phone aria-hidden="true" className="size-3.5 shrink-0 text-accent-500" />
                    <a href={`tel:${company.phone}`} className="hover:text-ink-900">
                      {company.phone}
                    </a>
                  </li>
                )}
                <li>{company.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-accent-500/20 pt-8 text-xs text-grey-500 sm:flex-row sm:justify-between">
          <p>© {year} Dhi Minds. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
