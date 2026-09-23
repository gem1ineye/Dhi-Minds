import { z } from "zod";
import { serviceOptions, timelineOptions, budgetValues } from "@/content/inquiry-options";

/**
 * FR-API-01 — the exact schema used by the client (on blur / on submit) and
 * the server (authoritative). One definition of validity, per PRD §10.1.
 */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name so we know who we're talking to.")
    .max(80, "Keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter a work email so we can reply.")
    .email("Enter a valid email address so we can reply."),
  company: z.string().trim().max(120, "Keep the company name under 120 characters.").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^\+?[0-9\s()-]{7,20}$/.test(v),
      "Enter a valid phone number (7–15 digits).",
    )
    .refine((v) => {
      if (!v) return true;
      const digits = v.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter a valid phone number (7–15 digits)."),
  service: z.enum(serviceOptions, {
    message: "Choose the service you're interested in.",
  }),
  budget: z.enum(budgetValues, {
    message: "Choose a budget range so we can scope this properly.",
  }),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a bit more — at least 20 characters helps us reply usefully.")
    .max(2000, "Keep the description under 2000 characters."),
  timeline: z.enum(timelineOptions, {
    message: "Choose the timeline that fits best.",
  }),
  consent: z
    .boolean()
    .refine((v) => v === true, "Agree to the Privacy Policy to send your inquiry."),
  // Anti-spam + attribution (not user-facing form fields)
  _hp: z.string().max(0, "Spam check failed.").optional().or(z.literal("")),
  _t: z.number().optional(),
  source: z
    .object({
      plan: z.string().optional(),
      service: z.string().optional(),
      referrer: z.string().optional(),
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
    })
    .optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryFieldErrors = Partial<Record<keyof InquiryInput, string>>;
