import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/policies/terms")({
  head: () => ({ meta: [{ title: "Terms — BD Collections" }, { name: "description", content: "The terms governing use of our shop." }] }),
  component: () => (
    <PageShell eyebrow="Policies" title="Terms of Service" crumbs={[{ label: "Home", href: "/" }, { label: "Policies" }, { label: "Terms" }]}>
      <div className="max-w-3xl space-y-6 text-taupe">
        <p>By using bd-collections.com you agree to our terms. All content is copyright BD Collections.</p>
      </div>
    </PageShell>
  ),
});