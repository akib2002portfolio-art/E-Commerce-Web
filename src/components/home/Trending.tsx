import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/data/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@tanstack/react-router";

export function Trending() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    api.listProducts({ isTrending: true, limit: 3 }).then(setItems);
  }, []);
  return (
    <section className="container-luxe py-24 md:py-32 border-t border-hairline">
      <div className="mb-14 flex items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">Trending now</p>
          <h2 className="mt-2 font-display text-4xl md:text-6xl">What the studio is wearing.</h2>
        </Reveal>
        <Link to="/shop" className="hidden md:inline-flex text-[0.72rem] uppercase tracking-[0.22em] border-b border-ink pb-1">Shop all</Link>
      </div>
      <ProductGrid products={items} cols={3} />
    </section>
  );
}