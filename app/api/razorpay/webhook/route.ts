import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { resolvePaymentAmount } from "@/lib/payment-pricing";
import { findPaymentByPaymentId, insertPayment, type PaymentRecord } from "@/lib/payments";
import { sanitize } from "@/lib/security";
import { sendPaymentAlert } from "@/lib/email";

export const runtime = "nodejs";

type RazorpayWebhookEvent = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        currency?: string;
        notes?: Record<string, string>;
      };
    };
  };
};

/**
 * Server-to-server backstop for app/api/razorpay/verify/route.ts: if a
 * customer's browser drops after Razorpay captures a payment but before the
 * client-side verify call completes, this is the only record we'd otherwise
 * have. Register this URL in the Razorpay Dashboard (Settings > Webhooks)
 * with RAZORPAY_WEBHOOK_SECRET set to the secret shown there.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ ok: false, error: "INVALID_SIGNATURE" }, { status: 400 });
  }

  let event: RazorpayWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  // Only payment.captured is handled — everything else is acknowledged and ignored.
  if (event.event !== "payment.captured") {
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
  }

  const payment = event.payload?.payment?.entity;
  if (!payment?.id || !payment?.order_id) {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  const existing = await findPaymentByPaymentId(payment.id).catch(() => undefined);
  if (existing) {
    return NextResponse.json({ ok: true, alreadyProcessed: true }, { status: 200 });
  }

  const notes = payment.notes ?? {};
  const type: PaymentRecord["type"] = notes.type === "consultation" ? "consultation" : "plan";
  const planId = notes.planId || undefined;

  const resolved = resolvePaymentAmount({ type, planId });

  const record: PaymentRecord = {
    id: randomUUID(),
    type,
    planId,
    razorpayOrderId: payment.order_id,
    razorpayPaymentId: payment.id,
    name: sanitize(notes.name || "", 80),
    email: sanitize(notes.email || "", 120),
    phone: sanitize(notes.phone || "", 20),
    amount: resolved?.amount ?? payment.amount ?? 0,
    currency: resolved?.currency ?? payment.currency ?? "INR",
    label: resolved?.label ?? "Payment",
    status: "captured",
    createdAt: new Date(),
  };

  try {
    await insertPayment(record);
  } catch (err) {
    console.error(
      "[api/razorpay/webhook] PAYMENT CAPTURED BUT NOT PERSISTED",
      record,
      err instanceof Error ? err.message : err,
    );
    await sendPaymentAlert(record, "Webhook payment.captured received, but persistence to MongoDB failed.").catch(
      () => undefined,
    );
    // Still 200 — this isn't a webhook delivery failure, so retrying won't help; the alert email is the recovery path.
    return NextResponse.json({ ok: true, id: record.id }, { status: 200 });
  }

  return NextResponse.json({ ok: true, id: record.id }, { status: 200 });
}
