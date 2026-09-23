import Script from "next/script";
import { Section } from "@/components/ui/Section";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { getFaqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";

/** FR-FAQ-01..06 — PRD §8.12. Structured data generated from the same source that renders the UI. */
export function FAQ() {
  const faqs = getFaqs();
  const jsonLd = faqJsonLd(faqs);

  return (
    <Section id="faq" surface="band" orb="left" eyebrow="FAQ" heading="Questions, answered">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Accordion
        mode="single"
        className="glass mx-auto max-w-3xl rounded-[var(--radius-lg)] px-6 sm:px-8 [&>div:last-child]:border-b-0"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.order} id={`faq-${faq.order}`} trigger={faq.question}>
            <p>{faq.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
