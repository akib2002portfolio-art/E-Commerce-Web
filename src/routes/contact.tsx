import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — BD Collections" }, { name: "description", content: "Our concierge team is available Monday–Friday." }, { property: "og:title", content: "Contact — BD Collections" }, { property: "og:description", content: "Get in touch." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell eyebrow="Care" title="Talk to the studio." lead="Our concierge team responds within one business day, Monday to Friday." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-8 text-sm">
          <div><p className="eyebrow">Email</p><p className="mt-2">care@bd-collections.com</p></div>
          <div><p className="eyebrow">Phone</p><p className="mt-2">+1 (415) 555-0119</p></div>
          <div><p className="eyebrow">Studios</p><p className="mt-2">Porto · Milan · Kyoto</p></div>
          <div><p className="eyebrow">Hours</p><p className="mt-2">Mon–Fri, 09:00–18:00 CET</p></div>
        </div>
        {sent ? (
          <div className="border border-hairline p-10"><p className="font-display text-2xl">Thank you.</p><p className="mt-2 text-taupe">We'll be in touch shortly.</p></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
            {[{ n: "name", l: "Name" }, { n: "email", l: "Email", t: "email" }, { n: "subject", l: "Subject" }].map((f) => (
              <div key={f.n}>
                <label className="eyebrow">{f.l}</label>
                <input required type={f.t ?? "text"} name={f.n} className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" />
              </div>
            ))}
            <div>
              <label className="eyebrow">Message</label>
              <textarea required rows={5} className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" />
            </div>
            <button className="h-12 w-full bg-ink text-canvas text-xs uppercase tracking-[0.22em] hover:bg-sienna md:w-auto md:px-10">Send message</button>
          </form>
        )}
      </div>
    </PageShell>
  );
}