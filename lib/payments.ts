import { getDb } from "@/lib/mongodb";

export type PaymentRecord = {
  id: string;
  type: "consultation" | "plan";
  planId?: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  label: string;
  status: "captured";
  createdAt: Date;
};

const COLLECTION = "payments";

/** Idempotency check — used by both /verify and the webhook route, whichever arrives first wins. */
export async function findPaymentByPaymentId(paymentId: string) {
  const db = await getDb();
  if (!db) return undefined;
  return db.collection(COLLECTION).findOne({ razorpayPaymentId: paymentId });
}

/** Throws if MONGODB_URI is unconfigured or the insert fails — unlike inquiries, a captured payment must never disappear silently; callers decide how to alert. */
export async function insertPayment(record: PaymentRecord): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("MONGODB_URI not configured — cannot persist captured payment.");
  await db.collection(COLLECTION).insertOne(record);
}
