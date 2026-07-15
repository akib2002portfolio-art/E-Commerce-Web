import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/policies/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — BD Collections" }, { name: "description", content: "How we handle your data." }] }),
  component: () => (
    <PageShell eyebrow="Policies" title="Privacy" crumbs={[{ label: "Home", href: "/" }, { label: "Policies" }, { label: "Privacy" }]}>
      <div className="max-w-3xl space-y-6 text-taupe">
        <p>We collect only the data we need to run our shop and honour your orders. We never sell your data. Read our full policy below.</p>
        <p>Data collected includes contact details, order history, and anonymised browsing data used to improve the shop.</p>
      </div>
    </PageShell>
  ),
});