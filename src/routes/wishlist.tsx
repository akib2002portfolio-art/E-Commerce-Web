import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/stores/wishlist";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/shop/ShopHeader";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — BD Collections" }, { name: "description", content: "Pieces you've saved for later." }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));
  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <p className="eyebrow mt-6">Saved</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-24 flex flex-col items-center gap-4 text-center">
          <Heart className="h-8 w-8 text-taupe" />
          <p className="font-display text-2xl">Nothing saved yet</p>
          <Link to="/shop" className="border-b border-ink pb-1 text-[0.72rem] uppercase tracking-[0.22em]">Browse shop →</Link>
        </div>
      ) : (
        <div className="mt-14"><ProductGrid products={items} cols={4} /></div>
      )}
    </div>
  );
}