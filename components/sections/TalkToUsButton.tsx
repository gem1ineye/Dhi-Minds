"use client";

import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import type { Company } from "@/content/schema";

/** Extracted from FinalCTA so the analytics click handler doesn't force the whole section client-side. */
export function TalkToUsButton({ company, className }: { company: Company; className?: string }) {
  const whatsappHref = company.whatsappNumber
    ? buildWhatsAppLink(company.whatsappNumber, "Hi! I'd like to talk about a project.")
    : undefined;
  const href = whatsappHref ?? (company.phone ? `tel:${company.phone}` : `mailto:${company.email}`);
  const channel: "whatsapp" | "phone" | "email" = whatsappHref ? "whatsapp" : company.phone ? "phone" : "email";

  return (
    <Button
      href={href}
      external={Boolean(whatsappHref)}
      variant="secondary"
      size="lg"
      className={className}
      onClick={() => track({ name: "contact_direct_click", channel })}
    >
      Talk to us
    </Button>
  );
}
