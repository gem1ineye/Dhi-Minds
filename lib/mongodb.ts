import { MongoClient, type Db } from "mongodb";

/**
 * PRD §10.1 — MongoDB Atlas, `inquiries` collection. If MONGODB_URI is not
 * configured (e.g. local dev without a database yet), callers get `null`
 * and the API route logs the inquiry instead of failing the request — the
 * form must keep working end to end in every environment.
 */
let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db | null> {
  const promise = getClientPromise();
  if (!promise) return null;
  try {
    const client = await promise;
    return client.db(process.env.MONGODB_DB || "meridian");
  } catch (err) {
    console.error("[mongodb] connection failed", err instanceof Error ? err.message : err);
    return null;
  }
}

export const isDbConfigured = () => Boolean(process.env.MONGODB_URI);
