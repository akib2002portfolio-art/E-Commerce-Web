import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/PageShell";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — BD Collections" }, { name: "description", content: "Search the shop." }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return products;
    const l = q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(l) || p.brand.toLowerCase().includes(l) || p.tags.some((t) => t.includes(l)));
  }, [q]);
  return (
    <PageShell eyebrow="Search" title="Find a piece." crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}>
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-full border-b border-hairline bg-transparent pb-4 font-display text-3xl outline-none placeholder:text-taupe/50 md:text-5xl" />
      <p className="mt-4 text-xs text-taupe">{results.length} results</p>
      <div className="mt-14"><ProductGrid products={results} cols={4} /></div>
    </PageShell>
  );
}
