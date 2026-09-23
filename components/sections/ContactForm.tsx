"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { inquirySchema, type InquiryInput, type InquiryFieldErrors } from "@/lib/validation";
import { serviceOptions, timelineOptions, budgetBands } from "@/content/inquiry-options";
import type { Company } from "@/content/schema";
import { FieldGroup, describedBy } from "@/components/ui/FieldGroup";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  description: string;
  timeline: string;
  consent: boolean;
};

const EMPTY: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  description: "",
  timeline: "",
  consent: false,
};

const SERVICE_ALIASES: Record<string, (typeof serviceOptions)[number]> = {
  website: "Website",
  saas: "SaaS Product",
  "saas-product": "SaaS Product",
  webapp: "Web Application",
  "web-application": "Web Application",
  seo: "SEO",
  social: "Social Media Marketing",
  "social-media": "Social Media Marketing",
  branding: "Branding",
  creative: "Media/Creative",
  media: "Media/Creative",
  strategy: "Digital Strategy",
  "digital-strategy": "Digital Strategy",
};

/** FR-CON-01..12 — PRD §8.14. */
// This component only ever mounts client-side (its parent wraps it in a
// Suspense boundary because of useSearchParams), so reading the URL for the
// initial value here is not an SSR/hydration concern.
function initialValues(searchParams: URLSearchParams): FormValues {
  const service = searchParams.get("service");
  const mapped = service ? SERVICE_ALIASES[service.toLowerCase()] : undefined;
  return mapped ? { ...EMPTY, service: mapped } : EMPTY;
}

export function ContactForm({ company }: { company: Company }) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<FormValues>(() => initialValues(searchParams));
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // FR-CON-07's spam-timing check needs "when this form became interactive."
  // Date.now() is impure, so it's captured in an effect (allowed to be
  // impure) rather than during render; a few ms of effect-scheduling delay
  // is irrelevant against the 2-second threshold this guards.
  const renderTimeRef = useRef<number | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const honeypotRef = useRef<HTMLInputElement>(null);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    renderTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const source = useMemo(
    () => ({
      plan: searchParams.get("plan") ?? undefined,
      service: searchParams.get("service") ?? undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      utm_source: searchParams.get("utm_source") ?? undefined,
      utm_medium: searchParams.get("utm_medium") ?? undefined,
      utm_campaign: searchParams.get("utm_campaign") ?? undefined,
    }),
    [searchParams],
  );

  // Used for live/inline validation only — deliberately excludes the `_t`
  // render-timestamp (a ref value), which only matters for the server-side
  // spam-timing check performed once, at actual submit time.
  function errorsFrom(vals: FormValues): InquiryFieldErrors {
    const result = inquirySchema.safeParse({
      ...vals,
      company: vals.company || undefined,
      phone: vals.phone || undefined,
      source,
    });
    if (result.success) return {};
    const errors: InquiryFieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof InquiryInput;
      if (!errors[key]) errors[key] = issue.message;
    }
    return errors;
  }

  const allErrors = errorsFrom(values);
  const visibleErrors: InquiryFieldErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([key]) => touched.has(key)),
  );

  function onBlur(field: keyof FormValues) {
    setTouched((prev) => new Set(prev).add(field));
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      track({ name: "form_start" });
    }
  }

  function setField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const allFields = Object.keys(values);
    setTouched(new Set(allFields));
    const errors = errorsFrom(values);

    if (Object.keys(errors).length > 0) {
      const firstInvalid = allFields.find((f) => errors[f as keyof FormValues]);
      if (firstInvalid) {
        fieldRefs.current[firstInvalid]?.focus();
        track({ name: "form_field_error", field: firstInvalid });
      }
      return;
    }

    setStatus("submitting");
    setServerError(null);
    track({ name: "form_submit" });

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: values.company || undefined,
          phone: values.phone || undefined,
          source,
          _hp: honeypotRef.current?.value ?? "",
          _t: renderTimeRef.current ?? Date.now(),
        }),
      });

      const body = await res.json();

      if (res.ok && body.ok) {
        setStatus("success");
        track({ name: "form_success" });
      } else {
        setStatus("error");
        setServerError(
          body.error === "RATE_LIMITED"
            ? "You've reached the submission limit for now. Email us directly instead — we'll still see it."
            : "Something went wrong sending your inquiry. Your details are still here — try again, or email us directly.",
        );
        track({ name: "form_error" });
      }
    } catch {
      setStatus("error");
      setServerError("We couldn't reach the server. Your details are still here — check your connection and try again, or email us directly.");
      track({ name: "form_error" });
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="glass-strong flex flex-col items-center gap-4 rounded-[var(--radius-lg)] p-10 text-center outline-none ring-1 ring-accent-500/40"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-accent-700" strokeWidth={1.5} />
        <h3 className="font-display text-[length:var(--text-heading-md)] font-medium text-ink-900">
          Inquiry sent.
        </h3>
        <p className="measure text-grey-500">
          We&apos;ll reply within {company.responseSLA}. In the meantime, take a look at our work, or
          email us directly if it&apos;s urgent.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <Button href="/work" variant="secondary">
            View our work
          </Button>
          <Button href={`mailto:${company.email}`} variant="ghost">
            {company.email}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass flex flex-col gap-5 rounded-[var(--radius-lg)] p-6 sm:p-8">
      {/* Honeypot — visually and functionally hidden from real users */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          id="company-website"
          name="_hp"
          type="text"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup id="name" label="Name" required error={visibleErrors.name}>
          <Input
            id="name"
            name="name"
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            autoComplete="name"
            required
            invalid={Boolean(visibleErrors.name)}
            aria-describedby={describedBy("name", undefined, visibleErrors.name)}
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => onBlur("name")}
          />
        </FieldGroup>

        <FieldGroup id="email" label="Email" required error={visibleErrors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            autoComplete="email"
            inputMode="email"
            required
            invalid={Boolean(visibleErrors.email)}
            aria-describedby={describedBy("email", undefined, visibleErrors.email)}
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => onBlur("email")}
          />
        </FieldGroup>

        <FieldGroup id="company" label="Company" error={visibleErrors.company}>
          <Input
            id="company"
            name="company"
            ref={(el) => {
              fieldRefs.current.company = el;
            }}
            autoComplete="organization"
            invalid={Boolean(visibleErrors.company)}
            aria-describedby={describedBy("company", undefined, visibleErrors.company)}
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            onBlur={() => onBlur("company")}
          />
        </FieldGroup>

        <FieldGroup id="phone" label="Phone" error={visibleErrors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            autoComplete="tel"
            inputMode="tel"
            invalid={Boolean(visibleErrors.phone)}
            aria-describedby={describedBy("phone", undefined, visibleErrors.phone)}
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
          />
        </FieldGroup>

        <FieldGroup id="service" label="Service required" required error={visibleErrors.service}>
          <Select
            id="service"
            name="service"
            ref={(el) => {
              fieldRefs.current.service = el;
            }}
            required
            invalid={Boolean(visibleErrors.service)}
            aria-describedby={describedBy("service", undefined, visibleErrors.service)}
            value={values.service}
            onChange={(e) => setField("service", e.target.value)}
            onBlur={() => onBlur("service")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup id="budget" label="Budget range" required error={visibleErrors.budget}>
          <Select
            id="budget"
            name="budget"
            ref={(el) => {
              fieldRefs.current.budget = el;
            }}
            required
            invalid={Boolean(visibleErrors.budget)}
            aria-describedby={describedBy("budget", undefined, visibleErrors.budget)}
            value={values.budget}
            onChange={(e) => setField("budget", e.target.value)}
            onBlur={() => onBlur("budget")}
          >
            <option value="" disabled>
              Choose a budget range
            </option>
            {budgetBands.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup id="timeline" label="Timeline" required error={visibleErrors.timeline} className="sm:col-span-2">
          <Select
            id="timeline"
            name="timeline"
            ref={(el) => {
              fieldRefs.current.timeline = el;
            }}
            required
            invalid={Boolean(visibleErrors.timeline)}
            aria-describedby={describedBy("timeline", undefined, visibleErrors.timeline)}
            value={values.timeline}
            onChange={(e) => setField("timeline", e.target.value)}
            onBlur={() => onBlur("timeline")}
          >
            <option value="" disabled>
              Choose a timeline
            </option>
            {timelineOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </FieldGroup>
      </div>

      <FieldGroup
        id="description"
        label="Project description"
        required
        error={visibleErrors.description}
        counter={`${values.description.length}/2000`}
      >
        <Textarea
          id="description"
          name="description"
          ref={(el) => {
            fieldRefs.current.description = el;
          }}
          required
          rows={5}
          maxLength={2000}
          invalid={Boolean(visibleErrors.description)}
          aria-describedby={describedBy("description", undefined, visibleErrors.description)}
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          onBlur={() => onBlur("description")}
        />
      </FieldGroup>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            ref={(el) => {
              fieldRefs.current.consent = el;
            }}
            required
            checked={values.consent}
            aria-describedby={describedBy("consent", undefined, visibleErrors.consent)}
            onChange={(e) => setField("consent", e.target.checked)}
            onBlur={() => onBlur("consent")}
            className="mt-1 size-4 shrink-0 rounded border-grey-300 text-blue-600 focus-visible:outline-2 focus-visible:outline-accent-500"
          />
          <label htmlFor="consent" className="text-sm text-grey-500">
            I agree to the{" "}
            <Link href="/privacy" className="font-medium text-blue-600 underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and consent to being contacted about my inquiry.
          </label>
        </div>
        {visibleErrors.consent && (
          <p id="consent-error" role="alert" className="pl-7 text-xs font-medium text-red-800">
            {visibleErrors.consent}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="rounded-[var(--radius-sm)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" loading={status === "submitting"} className="mt-2">
        Send project inquiry
      </Button>
    </form>
  );
}
