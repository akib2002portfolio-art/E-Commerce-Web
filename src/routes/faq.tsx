import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { faqs } from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — BD Collections" }, { name: "description", content: "Answers to the questions we hear most." }, { property: "og:title", content: "FAQ — BD Collections" }, { property: "og:description", content: "Common questions answered." }] }),
  component: () => (
    <PageShell eyebrow="Help" title="Questions, answered." crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}>
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`i-${i}`} className="border-b border-hairline">
            <AccordionTrigger className="py-6 text-left font-display text-lg md:text-xl">{f.question}</AccordionTrigger>
            <AccordionContent className="pb-6 text-taupe">{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageShell>
  ),
});