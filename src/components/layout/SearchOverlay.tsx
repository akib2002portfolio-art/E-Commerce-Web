import { AnimatePresence, motion } from "framer-motion";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useUI } from "@/stores/ui";
import { api } from "@/lib/api";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    let alive = true;
    api.listProducts({ search: q, limit: 6 }).then((r) => alive && setResults(r));
    return () => {
      alive = false;
    };
  }, [q]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-canvas" onClick={() => setOpen(false)}>
          <div className="container-luxe flex h-full flex-col pt-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-hairline pb-6">
              <span className="eyebrow">Search</span>
              <button onClick={() => setOpen(false)} className="p-2" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 border-b border-hairline py-8">
              <SearchIcon className="h-6 w-6 text-taupe" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full bg-transparent font-display text-3xl md:text-5xl outline-none placeholder:text-taupe/60"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-[220px_1fr]">
              <div className="space-y-2 text-sm">
                <p className="eyebrow">Popular</p>
                {["Men's Wear", "Women's Wear", "Kids", "Accessories", "New Arrival", "Sale"].map((s) => (
                  <button key={s} onClick={() => setQ(s.toLowerCase())} className="block text-taupe hover:text-ink">
                    {s}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {results.map((p) => (
                  <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} onClick={() => setOpen(false)} className="group block">
                    {p.images?.length ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="aspect-[4/5] h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <PlaceholderImage label={p.name} aspect="4/5" />
                    )}
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>{p.name}</span>
                      <span className="text-taupe">{formatPrice(p.price)}</span>
                    </div>
                  </Link>
                ))}
                {results.length === 0 && q && <p className="col-span-full text-sm text-taupe">No products found. Try another keyword or browse all products.</p>}
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-hairline py-6 text-sm text-taupe">
              <span>Press Esc to close</span>
              <Link to="/shop" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 text-ink">
                Browse everything <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}