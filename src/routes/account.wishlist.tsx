import { createFileRoute } from "@tanstack/react-router";
import { useWishlist } from "@/stores/wishlist";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export const Route = createFileRoute("/account/wishlist")({
  component: WL,
});

function WL() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));
  return (
    <div>
      <h2 className="font-display text-3xl">Wishlist</h2>
      {items.length === 0 ? <p className="mt-6 text-taupe">No saved pieces yet.</p> : <div className="mt-6"><ProductGrid products={items} cols={3} /></div>}
    </div>
  );
}
