import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import type { Product } from "@/data/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

export function BestSellers() {
  const [items, setItems] = useState<Product[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  useEffect(() => {
    api.listProducts({ isBestseller: true, limit: 8 }).then(setItems);
  }, []);
  return (
    <section className="container-luxe py-24 md:py-32 border-t border-hairline">
      <div className="mb-10 flex items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">Best sellers</p>
          <h2 className="mt-2 font-display text-4xl md:text-6xl">Kept coming back for.</h2>
        </Reveal>
        <div className="flex items-center gap-2">
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous" className="grid h-11 w-11 place-items-center border border-hairline hover:bg-bone"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Next" className="grid h-11 w-11 place-items-center border border-hairline hover:bg-bone"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {items.map((p) => (
            <div key={p.id} className="min-w-0 shrink-0 basis-[70%] sm:basis-[45%] lg:basis-[28%] xl:basis-[22%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}