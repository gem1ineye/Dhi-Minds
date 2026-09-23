import { Suspense } from "react";
import { Mail, Phone, MapPin, Clock, CalendarClock } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";
import { getCompany } from "@/lib/content";

/** FR-CON-10 — direct contact details alongside the form. PRD §8.14. */
export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const company = getCompany();

  return (
    <Section
      id="contact"
      surface="open"
      orb="right"
      eyebrow="Contact"
      heading="Send project inquiry"
      headingLevel={headingLevel}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Suspense fallback={null}>
            <ContactForm company={company} />
          </Suspense>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
          <div className="glass rounded-[var(--radius-md)] p-6">
            <h3 className="font-display text-base font-medium text-ink-900">
              Prefer to reach out directly?
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-charcoal">
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className="size-4 text-accent-700" />
                <a href={`mailto:${company.email}`} className="hover:text-blue-600">
                  {company.email}
                </a>
              </li>
              {company.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone aria-hidden="true" className="size-4 text-accent-700" />
                  <a href={`tel:${company.phone}`} className="hover:text-blue-600">
                    {company.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <MapPin aria-hidden="true" className="size-4 text-accent-700" />
                {company.location}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock aria-hidden="true" className="size-4 text-accent-700" />
                Typical response: {company.responseSLA}
              </li>
              <li className="flex items-center gap-2.5">
                <CalendarClock aria-hidden="true" className="size-4 text-accent-700" />
                <Link href="/consultation" className="hover:text-blue-600">
                  Prefer a paid 1:1 call? Book a consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
