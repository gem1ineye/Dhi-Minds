import type { Metadata } from "next";
import { Consultation } from "@/components/sections/Consultation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a consultation | Dhi Minds",
  description: "Book a paid 1:1 strategy consultation with Dhi Minds.",
  path: "/consultation",
});

export default function ConsultationPage() {
  return (
    <div className="pt-16">
      <Consultation headingLevel="h1" />
    </div>
  );
}
