import { Resend } from "resend";
import type { InquiryInput } from "./validation";
import type { PaymentRecord } from "./payments";
import { sanitize } from "./security";
import { formatPrice } from "./utils";

/**
 * PRD §10.1 / FR-API-04–06 — team notification + visitor auto-reply via
 * Resend. If RESEND_API_KEY is absent, sending is skipped and logged; the
 * inquiry is already persisted (or logged) before this runs, so a missing
 * email provider never fails the request (FR-API-06).
 */
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px;color:#5B6472;font:13px monospace;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 12px;color:#1A1D21;font:14px sans-serif;">${escapeHtml(value)}</td></tr>`;
}

export async function sendTeamNotification(inquiry: InquiryInput & { id: string }) {
  const resend = getResend();
  const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL;
  if (!resend || !teamEmail) {
    console.warn("[email] RESEND_API_KEY or TEAM_NOTIFICATION_EMAIL not configured — skipping team notification.", {
      inquiryId: inquiry.id,
    });
    return { skipped: true };
  }

  const html = `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:sans-serif;">
    ${fieldRow("Name", sanitize(inquiry.name, 80))}
    ${fieldRow("Email", sanitize(inquiry.email, 120))}
    ${fieldRow("Company", sanitize(inquiry.company || "—", 120))}
    ${fieldRow("Phone", sanitize(inquiry.phone || "—", 20))}
    ${fieldRow("Service", inquiry.service)}
    ${fieldRow("Budget", inquiry.budget)}
    ${fieldRow("Timeline", inquiry.timeline)}
    ${fieldRow("Description", sanitize(inquiry.description, 2000))}
    ${fieldRow("Source", JSON.stringify(inquiry.source || {}))}
  </table>`;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Dhi Minds <inquiries@example.com>",
      to: teamEmail,
      replyTo: inquiry.email,
      subject: `New project inquiry — ${sanitize(inquiry.name, 80)} (${inquiry.service})`,
      html,
    });
    return { skipped: false };
  } catch (err) {
    console.error("[email] team notification failed", err instanceof Error ? err.message : err);
    return { skipped: true, error: true };
  }
}

export async function sendVisitorAutoReply(inquiry: InquiryInput, responseSLA: string) {
  const resend = getResend();
  if (!resend) return { skipped: true };

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Dhi Minds <inquiries@example.com>",
      to: inquiry.email,
      subject: "Inquiry received — Dhi Minds",
      html: `<p>Hi ${escapeHtml(sanitize(inquiry.name, 80))},</p><p>Thanks for reaching out. We've received your project inquiry and will reply within ${escapeHtml(responseSLA)}.</p><p>— Dhi Minds</p>`,
    });
    return { skipped: false };
  } catch (err) {
    console.error("[email] auto-reply failed", err instanceof Error ? err.message : err);
    return { skipped: true, error: true };
  }
}

/** Best-effort receipt to the customer after a captured, verified payment. */
export async function sendPaymentConfirmation(record: PaymentRecord) {
  const resend = getResend();
  if (!resend) return { skipped: true };

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Dhi Minds <inquiries@example.com>",
      to: record.email,
      subject: `Payment received — ${sanitize(record.label, 80)}`,
      html: `<p>Hi ${escapeHtml(sanitize(record.name, 80))},</p><p>We've received your payment of ${escapeHtml(formatPrice(record.amount, record.currency))} for ${escapeHtml(sanitize(record.label, 80))}. We'll be in touch shortly with next steps.</p><p>— Dhi Minds</p>`,
    });
    return { skipped: false };
  } catch (err) {
    console.error("[email] payment confirmation failed", err instanceof Error ? err.message : err);
    return { skipped: true, error: true };
  }
}

/**
 * Fires only when a payment was verified as captured but could not be
 * persisted — a real charge with no record is a financial loss, not a
 * re-solicitable lead, so this must never fail silently the way the
 * inquiry flow's best-effort emails do. If sending itself fails, the
 * console.error is the last line of defence — check the Razorpay Dashboard.
 */
export async function sendPaymentAlert(
  record: Partial<PaymentRecord> & { razorpayOrderId: string; razorpayPaymentId: string },
  reason: string,
) {
  const resend = getResend();
  const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL;
  if (!resend || !teamEmail) {
    console.error(
      "[email] PAYMENT ALERT UNSENT — RESEND_API_KEY or TEAM_NOTIFICATION_EMAIL not configured. Reconcile manually against the Razorpay Dashboard.",
      record,
    );
    return { skipped: true };
  }

  const html = `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:sans-serif;">
    ${fieldRow("Reason", reason)}
    ${fieldRow("Razorpay order ID", record.razorpayOrderId)}
    ${fieldRow("Razorpay payment ID", record.razorpayPaymentId)}
    ${fieldRow("Type", record.type ?? "—")}
    ${fieldRow("Plan", record.planId ?? "—")}
    ${fieldRow("Name", record.name ?? "—")}
    ${fieldRow("Email", record.email ?? "—")}
    ${fieldRow("Phone", record.phone ?? "—")}
    ${fieldRow("Amount", record.amount != null && record.currency ? formatPrice(record.amount, record.currency) : "—")}
  </table>`;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Dhi Minds <inquiries@example.com>",
      to: teamEmail,
      subject: "⚠️ Payment captured but NOT recorded — manual reconciliation needed",
      html,
    });
    return { skipped: false };
  } catch (err) {
    console.error(
      "[email] PAYMENT ALERT FAILED TO SEND — reconcile manually against the Razorpay Dashboard.",
      record,
      err instanceof Error ? err.message : err,
    );
    return { skipped: true, error: true };
  }
}
