import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/data/types";
import { FilterSidebar, type Filters } from "@/components/shop/FilterSidebar";
import { SortMenu, type SortKey } from "@/components/shop/SortMenu";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { Reveal } from "@/components/motion/Reveal";
import { categories } from "@/data/categories";
import { SlidersHorizontal, X } from "lucide-react";

export function ShopListing({ lockedCategory }: { lockedCategory?: string } = {}) {
  const [filters, setFilters] = useState<Filters>({ colors: [], sizes: [], brands: [], category: lockedCategory });
  const [sort, setSort] = useState<SortKey>("featured");
  const [all, setAll] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const perPage = 12;

  useEffect(() => {
    api.listProducts({ category: lockedCategory }).then(setAll);
  }, [lockedCategory]);

  useEffect(() => setPage(1), [filters, sort]);

  const filtered = useMemo(() => {
    let out = all;
    if (filters.category) out = out.filter((p) => p.category === filters.category);
    if (filters.colors.length) out = out.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    if (filters.sizes.length) out = out.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.brands.length) out = out.filter((p) => filters.brands.includes(p.brand));
    if (filters.priceMax) out = out.filter((p) => p.price <= filters.priceMax!);
    if (filters.onSale) out = out.filter((p) => p.isSale);
    switch (sort) {
      case "price-asc": out = [...out].sort((a, b) => a.price - b.price); break;
      case "price-desc": out = [...out].sort((a, b) => b.price - a.price); break;
      case "new": out = [...out].sort((a) => (a.isNew ? -1 : 1)); break;
    }
    return out;
  }, [all, filters, sort]);

  const paged = filtered.slice(0, page * perPage);
  const cat = lockedCategory ? categories.find((c) => c.slug === lockedCategory) : null;

  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, ...(cat ? [{ label: cat.name }] : [])]} />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-8">
        <Reveal>
          <p className="eyebrow">{cat ? cat.name : "All Products"}</p>
          <h1 className="mt-2 font-display text-5xl md:text-7xl">{cat ? cat.name : "Discover Our Collection"}</h1>
          {cat?.description && <p className="mt-2 text-taupe">{cat.description}</p>}
        </Reveal>
        <div className="flex items-center gap-4">
          <span className="text-xs text-taupe">{filtered.length} products</span>
          <SortMenu value={sort} onChange={setSort} />
          <button onClick={() => setDrawerOpen(true)} className="lg:hidden inline-flex items-center gap-2 border border-hairline px-3 py-2 text-xs uppercase tracking-[0.2em]">
            <SlidersHorizontal className="h-3 w-3" /> Filters
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar value={filters} onChange={setFilters} lockedCategory={lockedCategory} />
        </div>
        <div>
          <ProductGrid products={paged} cols={3} />
          {paged.length < filtered.length && (
            <div className="mt-14 flex justify-center">
              <button onClick={() => setPage((p) => p + 1)} className="border border-ink px-8 py-3 text-[0.72rem] uppercase tracking-[0.22em] hover:bg-ink hover:text-canvas transition-colors">
                Load more ({filtered.length - paged.length} remaining)
              </button>
            </div>
          )}
          {filtered.length === 0 && <p className="text-center text-taupe">No products found matching your filters.</p>}
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-auto bg-canvas p-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <p className="eyebrow">Filters</p>
              <button onClick={() => setDrawerOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4">
              <FilterSidebar value={filters} onChange={setFilters} lockedCategory={lockedCategory} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}