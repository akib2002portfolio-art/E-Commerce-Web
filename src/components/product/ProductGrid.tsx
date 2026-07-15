import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function ProductGrid({ products, cols = 4, className }: { products: Product[]; cols?: 2 | 3 | 4; className?: string }) {
  const gridCols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" };
  return (
    <Stagger className={cn("grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6", gridCols[cols], className)}>
      {products.map((p) => (
        <StaggerItem key={p.id}>
          <ProductCard product={p} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}