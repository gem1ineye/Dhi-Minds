import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { verifyPaymentSchema } from "@/lib/payment-validation";
import { resolvePaymentAmount } from "@/lib/payment-pricing";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { findPaymentByPaymentId, insertPayment, type PaymentRecord } from "@/lib/payments";
import { sanitize } from "@/lib/security";
import { sendPaymentConfirmation, sendPaymentAlert } from "@/lib/email";

export const runtime = "nodejs";

/**
 * Called by the client after Razorpay's checkout succeeds. Persistence
 * failure here must not degrade silently like app/api/inquiry/route.ts —
 * see sendPaymentAlert in lib/email.ts.
 */
export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 400 });
  }

  const parsed = verifyPaymentSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }
  const data = parsed.data;

  const signatureValid = verifyPaymentSignature({
    orderId: data.razorpay_order_id,
    paymentId: data.razorpay_payment_id,
    signature: data.razorpay_signature,
  });
  if (!signatureValid) {
    console.error("[api/razorpay/verify] signature verification failed", {
      orderId: data.razorpay_order_id,
      paymentId: data.razorpay_payment_id,
    });
    return NextResponse.json({ ok: false, error: "INVALID_SIGNATURE" }, { status: 400 });
  }

  const existing = await findPaymentByPaymentId(data.razorpay_payment_id).catch(() => undefined);
  if (existing) {
    return NextResponse.json({ ok: true, alreadyProcessed: true }, { status: 200 });
  }

  const resolved = resolvePaymentAmount({ type: data.type, planId: data.planId });
  if (!resolved) {
    // Signature is genuinely valid but we can no longer price this order (config changed mid-flow) — still a captured payment, so alert rather than drop it.
    await sendPaymentAlert(
      {
        razorpayOrderId: data.razorpay_order_id,
        razorpayPaymentId: data.razorpay_payment_id,
        type: data.type,
        planId: data.planId,
        name: sanitize(data.name, 80),
        email: sanitize(data.email, 120),
        phone: sanitize(data.phone, 20),
      },
      "Payment verified but the type/planId could no longer be priced (pricing config changed after order creation).",
    ).catch(() => undefined);
    return NextResponse.json({ ok: true, unresolvedPricing: true }, { status: 200 });
  }

  const record: PaymentRecord = {
    id: randomUUID(),
    type: data.type,
    planId: data.planId,
    razorpayOrderId: data.razorpay_order_id,
    razorpayPaymentId: data.razorpay_payment_id,
    name: sanitize(data.name, 80),
    email: sanitize(data.email, 120),
    phone: sanitize(data.phone, 20),
    amount: resolved.amount,
    currency: resolved.currency,
    label: resolved.label,
    status: "captured",
    createdAt: new Date(),
  };

  try {
    await insertPayment(record);
  } catch (err) {
    console.error("[api/razorpay/verify] PAYMENT CAPTURED BUT NOT PERSISTED", record, err instanceof Error ? err.message : err);
    await sendPaymentAlert(record, "Signature verified and payment captured, but persistence to MongoDB failed.").catch(() => undefined);
    // The payment genuinely succeeded — telling the customer otherwise would be worse than a manual reconciliation step.
    void sendPaymentConfirmation(record).catch(() => undefined);
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  }

  void sendPaymentConfirmation(record).catch(() => undefined);
  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}
