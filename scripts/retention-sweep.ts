/**
 * NFR-SEC-07 — deletes/anonymises inquiry records older than the configured
 * retention period. Intended to run on a schedule (cron / scheduled
 * function), not on every request. Run with: npm run retention:sweep
 */
import { MongoClient } from "mongodb";

function parseRetentionToMs(retention: string): number {
  const match = retention.match(/(\d+)\s*(day|month|year)/i);
  if (!match) return 24 * 30 * 24 * 60 * 60 * 1000; // default: 24 months
  const [, amountStr, unit] = match;
  const amount = Number(amountStr);
  const dayMs = 24 * 60 * 60 * 1000;
  const unitMs = { day: dayMs, month: 30 * dayMs, year: 365 * dayMs }[unit!.toLowerCase() as "day" | "month" | "year"];
  return amount * unitMs;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("[retention-sweep] MONGODB_URI not configured — nothing to do.");
    return;
  }

  const retention = process.env.NEXT_PUBLIC_RETENTION_PERIOD || "24 months";
  const cutoff = new Date(Date.now() - parseRetentionToMs(retention));

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || "meridian");
    const result = await db.collection("inquiries").deleteMany({ createdAt: { $lt: cutoff } });
    console.log(`[retention-sweep] Deleted ${result.deletedCount} inquiry record(s) older than ${retention} (cutoff: ${cutoff.toISOString()}).`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("[retention-sweep] failed", err);
  process.exitCode = 1;
});
