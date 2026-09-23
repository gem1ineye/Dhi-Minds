import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Dhi Minds",
  description:
    "Start a project with Dhi Minds. Tell us what you're building and we'll reply with next steps.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact headingLevel="h1" />
    </div>
  );
}
