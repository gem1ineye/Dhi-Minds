import { createHash } from "node:crypto";

/** FR-API-03 — never persist a raw IP. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "meridian-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") || "unknown";
}

/**
 * FR-CON-08 — 5 submissions per hashed IP per hour. In-memory store, which
 * is correct for a single-instance deployment; a multi-instance deployment
 * should swap this for a shared store (e.g. Upstash Redis) behind the same
 * function signature.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(hashedIp: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(hashedIp) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_PER_WINDOW) {
    hits.set(hashedIp, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(hashedIp, timestamps);
  return false;
}

/** FR-CON-07 — honeypot + timing check. A fast (<2s) or filled-honeypot submission is treated as spam. */
export function looksLikeSpam(input: { _hp?: string; _t?: number }): boolean {
  if (input._hp && input._hp.length > 0) return true;
  if (typeof input._t === "number") {
    const elapsed = Date.now() - input._t;
    if (elapsed >= 0 && elapsed < 2000) return true;
  }
  return false;
}

const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

/** NFR-SEC-04 — length-cap and strip control characters before storage or email templating. */
export function sanitize(value: string, maxLength: number): string {
  return value.replace(CONTROL_CHARS, "").trim().slice(0, maxLength);
}
