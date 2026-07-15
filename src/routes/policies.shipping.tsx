import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/policies/shipping")({
  head: () => ({ meta: [{ title: "Shipping — BD Collections" }, { name: "description", content: "Rates, times, and destinations." }] }),
  component: () => (
    <PageShell eyebrow="Care" title="Shipping" crumbs={[{ label: "Home", href: "/" }, { label: "Policies" }, { label: "Shipping" }]}>
      <div className="max-w-3xl space-y-6 text-taupe">
        <p>Complimentary express shipping worldwide on orders over $200. Standard delivery is $15. Express deliveries typically arrive in 2–4 business days.</p>
        <p>All orders require signature on receipt. Tracking is provided by email.</p>
      </div>
    </PageShell>
  ),
});