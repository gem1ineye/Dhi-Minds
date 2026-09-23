"use client";

import { WhatsAppIcon } from "./WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/** Persistent site-wide chat entry point. On mobile it sits above the bottom nav dock (z-[90]); z-40 keeps it under the dock and navbar (z-100) if they ever overlap. */
export function WhatsAppBubble({ whatsappNumber }: { whatsappNumber?: string }) {
  if (!whatsappNumber) return null;

  return (
    <a
      href={buildWhatsAppLink(whatsappNumber, "Hi! I'd like to know more.")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track({ name: "contact_direct_click", channel: "whatsapp" })}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
