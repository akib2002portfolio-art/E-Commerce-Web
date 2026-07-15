import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { api } from "@/lib/api";
import type { Product } from "@/data/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";

export function NewArrivals() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    api.listProducts({ isNew: true, limit: 4 }).then(setItems);
  }, []);
  return (
    <section className="container-luxe py-24 md:py-32 border-t border-hairline">
      <div className="mb-14 flex items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">New Arrival</p>
          <h2 className="mt-2 font-display text-4xl md:text-6xl">New Arrival</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/shop" className="text-[0.72rem] uppercase tracking-[0.22em] border-b border-ink pb-1">View all</Link>
        </Reveal>
      </div>
      <ProductGrid products={items} cols={4} />
    </section>
  );
}