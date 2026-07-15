import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/stores/cart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Breadcrumbs } from "@/components/shop/ShopHeader";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — BD Collections" }, { name: "description", content: "Your bag." }] }),
  component: CartPage,
});

function CartPage() {
  const { lines, updateQty, remove } = useCart();
  const items = lines.map((l, i) => ({ line: l, product: products.find((p) => p.id === l.productId), i })).filter((x) => x.product);
  const subtotal = items.reduce((a, { line, product }) => a + (product?.price ?? 0) * line.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;
  const FREE_SHIPPING = 200;
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mt-6 font-display text-5xl md:text-6xl">Your bag</h1>
      {items.length === 0 ? (
        <div className="mt-16 border-y border-hairline py-24 text-center">
          <p className="font-display text-2xl">Your bag is empty.</p>
          <Link to="/shop" className="mt-6 inline-block border-b border-ink pb-1 text-xs uppercase tracking-[0.22em]">Shop the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {items.map(({ line, product, i }) => product && (
              <li key={i} className="grid grid-cols-[120px_1fr] gap-6 py-6 md:grid-cols-[140px_1fr_auto] md:items-center">
                {product.images?.length ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-[4/5] h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <PlaceholderImage label={product.name} aspect="4/5" />
                )}
                <div>
                  <p className="text-sm">{product.name}</p>
                  <p className="mt-1 text-xs text-taupe">{[line.size, line.color].filter(Boolean).join(" · ")}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center border border-hairline">
                      <button onClick={() => updateQty(i, line.quantity - 1)} className="p-2"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button onClick={() => updateQty(i, line.quantity + 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => remove(i)} className="text-xs uppercase tracking-[0.2em] text-taupe hover:text-ink">Remove</button>
                  </div>
                </div>
                <p className="text-right text-sm md:text-base">{formatPrice(product.price * line.quantity)}</p>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-hairline p-8">
            <div className="mb-6 border-b border-hairline pb-6">
              {subtotal >= FREE_SHIPPING ? (
                <p className="text-sm">✓ Congratulations! You've qualified for FREE shipping.</p>
              ) : (
                <p className="text-sm text-taupe">
                  Spend <span className="text-ink">{formatPrice(remaining)}</span> more to qualify for FREE shipping.
                </p>
              )}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-bone">
                <div className="h-full rounded-full bg-ink transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <p className="eyebrow">Order summary</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-taupe">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-taupe">Shipping</dt><dd>{shipping ? formatPrice(shipping) : "Free"}</dd></div>
              <div className="flex justify-between border-t border-hairline pt-3 text-base"><dt>Total</dt><dd className="font-display text-lg">{formatPrice(total)}</dd></div>
            </dl>
            <Link to="/checkout" className="mt-6 flex h-12 items-center justify-center bg-ink text-canvas text-xs uppercase tracking-[0.22em] hover:bg-sienna">Proceed to checkout</Link>
            <Link to="/shop" className="mt-3 block text-center text-xs uppercase tracking-[0.22em] text-taupe hover:text-ink">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}