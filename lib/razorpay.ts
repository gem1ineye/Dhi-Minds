import Razorpay from "razorpay";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Mirrors the getDb() pattern in lib/mongodb.ts — returns null gracefully
 * when keys aren't configured yet, rather than throwing at import time, so
 * the site keeps working (checkout CTAs just don't render) until Razorpay
 * is set up.
 */
export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_SECRET && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
}

let cachedClient: Razorpay | null = null;

export function getRazorpayClient(): Razorpay | null {
  if (!isRazorpayConfigured()) return null;
  if (!cachedClient) {
    cachedClient = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return cachedClient;
}

/**
 * Verifies the `razorpay_signature` returned to the client after a
 * successful checkout, per Razorpay's documented scheme:
 * hmac_sha256(`${order_id}|${payment_id}`, key_secret). The SDK's typed
 * public API only exposes webhook signature validation, not this one, so
 * it's implemented directly rather than relying on an undocumented
 * internal import.
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  try {
    const expected = createHmac("sha256", secret)
      .update(`${params.orderId}|${params.paymentId}`)
      .digest("hex");
    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(params.signature, "hex");
    if (expectedBuf.length !== actualBuf.length) return false;
    return timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}

/** Verifies the `x-razorpay-signature` header on incoming webhook requests — a different secret from RAZORPAY_KEY_SECRET. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  try {
    return Razorpay.validateWebhookSignature(rawBody, signature, secret);
  } catch {
    return false;
  }
}
