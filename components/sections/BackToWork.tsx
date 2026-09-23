"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** FR-CS-06 — preserves the previously active filter by reading the referring /work URL. */
export function BackToWork() {
  const [href, setHref] = useState("/work");

  useEffect(() => {
    // document.referrer doesn't exist during SSR, so this can only be read
    // post-hydration; setting it any earlier would produce a server/client
    // markup mismatch on the very first render.
    if (!document.referrer) return;
    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin === window.location.origin && referrer.pathname === "/work") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHref(`/work${referrer.search}`);
      }
    } catch {
      // ignore malformed referrer
    }
  }, []);

  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500">
      <ArrowLeft aria-hidden="true" className="size-4" />
      Back to work
    </Link>
  );
}
