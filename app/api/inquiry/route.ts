import { NextResponse, type NextRequest } from "next/server";
import { resolveMx } from "node:dns/promises";
import { randomUUID } from "node:crypto";
import { inquirySchema, type InquiryFieldErrors } from "@/lib/validation";
import { getClientIp, hashIp, isRateLimited, looksLikeSpam, sanitize } from "@/lib/security";
import { getDb } from "@/lib/mongodb";
import { sendTeamNotification, sendVisitorAutoReply } from "@/lib/email";
import { getCompany } from "@/lib/content";

export const runtime = "nodejs";

/** Best-effort MX check — never blocks a legitimate submission if DNS is unavailable. */
async function hasMx(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const records = await resolveMx(domain);
    return records.length > 0;
  } catch {
    return true; // fail open — DNS unavailability must never reject a real inquiry
  }
}

/** FR-API-01..09 — PRD §11. */
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

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: InquiryFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !fieldErrors[key as keyof InquiryFieldErrors]) {
        fieldErrors[key as keyof InquiryFieldErrors] = issue.message;
      }
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  // FR-CON-07 — honeypot + timing spam check.
  if (looksLikeSpam({ _hp: data._hp, _t: data._t })) {
    // Respond as if accepted so a bot gets no signal, without persisting anything.
    return NextResponse.json({ ok: true, id: randomUUID() }, { status: 201 });
  }

  if (!(await hasMx(data.email))) {
    return NextResponse.json(
      { ok: false, fieldErrors: { email: "Enter a work email so we can reply." } },
      { status: 400 },
    );
  }

  const id = randomUUID();
  const record = {
    id,
    name: sanitize(data.name, 80),
    email: sanitize(data.email, 120),
    company: data.company ? sanitize(data.company, 120) : undefined,
    phone: data.phone ? sanitize(data.phone, 20) : undefined,
    service: data.service,
    budget: data.budget,
    description: sanitize(data.description, 2000),
    timeline: data.timeline,
    consent: data.consent,
    consentTimestamp: new Date().toISOString(),
    source: data.source ?? {},
    hashedIp,
    status: "new" as const,
    createdAt: new Date(),
  };

  try {
    const db = await getDb();
    if (db) {
      await db.collection("inquiries").insertOne(record);
    } else {
      // FR-API-06 — persistence failure (or no DB configured) never fails the request path itself;
      // this logs so local/dev environments still exercise the full flow.
      console.warn("[api/inquiry] MONGODB_URI not configured — logging inquiry instead of persisting.", {
        id,
        service: record.service,
      });
    }
  } catch (err) {
    console.error("[api/inquiry] persistence failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }

  // FR-API-04/05/06 — email is best-effort and never fails an already-persisted request.
  const company = getCompany();
  void sendTeamNotification({ ...data, id }).catch(() => undefined);
  void sendVisitorAutoReply(data, company.responseSLA).catch(() => undefined);

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
