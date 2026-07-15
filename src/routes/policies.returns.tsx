import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/policies/returns")({
  head: () => ({ meta: [{ title: "Returns — BD Collections" }, { name: "description", content: "How to return a piece." }] }),
  component: () => (
    <PageShell eyebrow="Care" title="Returns" crumbs={[{ label: "Home", href: "/" }, { label: "Policies" }, { label: "Returns" }]}>
      <div className="max-w-3xl space-y-6 text-taupe">
        <p>30-day returns on unworn pieces with tags attached. Complimentary within EU, UK, US.</p>
        <p>Contact care@bd-collections.com to initiate a return. A prepaid label will be issued within 24 hours.</p>
      </div>
    </PageShell>
  ),
});