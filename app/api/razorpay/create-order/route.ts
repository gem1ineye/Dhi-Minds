import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { createOrderSchema } from "@/lib/payment-validation";
import { resolvePaymentAmount } from "@/lib/payment-pricing";
import { getClientIp, hashIp, isRateLimited, sanitize } from "@/lib/security";
import { getRazorpayClient } from "@/lib/razorpay";

export const runtime = "nodejs";

/** Creates a Razorpay order for either the consultation fee or a pricing plan. Amount is always resolved server-side — never trust a client-sent amount. */
export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 400 });
  }

  const ip = getClientIp(request.headers);
  const hashedIp = hashIp(ip);

  if (isRateLimited(hashedIp)) {
    return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
  }

  const parsed = createOrderSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }
  const data = parsed.data;

  if (data.type === "plan" && !data.planId) {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  const resolved = resolvePaymentAmount({ type: data.type, planId: data.planId });
  if (!resolved) {
    return NextResponse.json({ ok: false, error: "NOT_AVAILABLE" }, { status: 400 });
  }

  const razorpay = getRazorpayClient();
  if (!razorpay) {
    return NextResponse.json({ ok: false, error: "PAYMENTS_UNAVAILABLE" }, { status: 503 });
  }

  try {
    const order = await razorpay.orders.create({
      amount: resolved.amount,
      currency: resolved.currency,
      receipt: randomUUID(),
      notes: {
        type: data.type,
        planId: data.planId ?? "",
        name: sanitize(data.name, 80),
        email: sanitize(data.email, 120),
        phone: sanitize(data.phone, 20),
      },
    });

    return NextResponse.json(
      {
        ok: true,
        orderId: order.id,
        amount: resolved.amount,
        currency: resolved.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        label: resolved.label,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[api/razorpay/create-order] order creation failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
