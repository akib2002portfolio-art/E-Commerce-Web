import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Minus, Plus, Heart, Truck, RotateCcw, Shield, Star } from "lucide-react";
import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useRecentlyViewed } from "@/stores/recently-viewed";
import { api } from "@/lib/api";
import { reviews as allReviews } from "@/data/reviews";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): Product => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — BD Collections` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
  notFoundComponent: () => <div className="container-luxe pt-40 pb-24">Product not found.</div>,
});

function ProductPage() {
  const p = Route.useLoaderData() as Product;
  const [size, setSize] = useState<string | undefined>(p.sizes[0]);
  const [color, setColor] = useState<string | undefined>(p.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const [related, setRelated] = useState(products.slice(0, 4));
  const [reviews, setReviews] = useState(allReviews.filter((r) => r.productId === p.id));
  const nav = useNavigate();
  const cart = useCart();
  const wish = useWishlist();
  const rv = useRecentlyViewed();
  const isWished = wish.ids.includes(p.id);

  useEffect(() => {
    rv.push(p.id);
    api.relatedProducts(p.id).then((r) => setRelated(r.length ? r : products.slice(0, 4)));
    api.listReviews(p.id).then(setReviews);
  }, [p.id]);

  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 5;

  return (
    <div className="pt-24">
      <div className="container-luxe">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: p.name }]} />
      </div>
      <section className="container-luxe mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <ProductGallery label={p.name} gallery={p.gallery} />
        <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <p className="eyebrow">{p.brand}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{p.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex gap-0.5 text-sienna">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(avgRating) && "fill-sienna")} />
                ))}
              </div>
              <span className="text-xs text-taupe">{reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              {p.compareAtPrice && <span className="text-taupe line-through">{formatPrice(p.compareAtPrice)}</span>}
              <span className="font-display text-2xl">{formatPrice(p.price)}</span>
            </div>
            <p className="mt-6 text-taupe">{p.description}</p>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em]">
                <span>Colour · <span className="text-taupe normal-case tracking-normal">{color}</span></span>
              </div>
              <div className="flex gap-2">
                {p.colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={cn("h-8 w-8 rounded-full border transition-all", color === c.name ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas border-transparent" : "border-hairline")}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em]">
                <span>Size</span>
                <button className="text-taupe hover:text-ink">Size guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn("min-w-11 border px-3 py-2 text-sm", size === s ? "border-ink bg-ink text-canvas" : "border-hairline hover:border-ink")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-hairline">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                onClick={() => cart.add({ productId: p.id, size, color, quantity: qty })}
                className="flex-1 bg-ink text-canvas text-[0.72rem] uppercase tracking-[0.22em] transition-colors hover:bg-sienna"
              >
                Add to Cart — {formatPrice(p.price * qty)}
              </button>
              <button onClick={() => wish.toggle(p.id)} aria-label="Wishlist" className={cn("grid w-12 place-items-center border", isWished ? "border-sienna text-sienna" : "border-hairline")}>
                <Heart className={cn("h-4 w-4", isWished && "fill-sienna")} />
              </button>
            </div>

            <button
              onClick={() => {
                cart.add({ productId: p.id, size, color, quantity: qty });
                nav({ to: "/checkout" });
              }}
              className="mt-3 h-12 border border-ink text-[0.72rem] uppercase tracking-[0.22em] hover:bg-bone"
            >
              Buy now
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-hairline pt-8 text-xs text-taupe">
              <div className="flex flex-col items-center text-center"><Truck className="mb-2 h-5 w-5" />Nationwide Delivery</div>
              <div className="flex flex-col items-center text-center"><RotateCcw className="mb-2 h-5 w-5" />Easy Exchange</div>
              <div className="flex flex-col items-center text-center"><Shield className="mb-2 h-5 w-5" />Secure Shopping</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-luxe mt-20">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start rounded-none border-b border-hairline bg-transparent p-0">
            <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent px-0 mr-8 pb-3 text-xs uppercase tracking-[0.22em] data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:shadow-none">Description</TabsTrigger>
            <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent px-0 mr-8 pb-3 text-xs uppercase tracking-[0.22em] data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:shadow-none">Product Details</TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent px-0 mr-8 pb-3 text-xs uppercase tracking-[0.22em] data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:shadow-none">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent px-0 pb-3 text-xs uppercase tracking-[0.22em] data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:shadow-none">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="max-w-3xl py-8 text-taupe">{p.description}</TabsContent>
          <TabsContent value="specs" className="py-8">
            <dl className="max-w-2xl divide-y divide-hairline">
              {p.specifications.map((s) => (
                <div key={s.label} className="grid grid-cols-2 py-3 text-sm">
                  <dt className="text-taupe">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-2 py-3 text-sm"><dt className="text-taupe">SKU</dt><dd>{p.sku}</dd></div>
            </dl>
          </TabsContent>
          <TabsContent value="shipping" className="max-w-3xl py-8 text-taupe">{p.shipping}</TabsContent>
          <TabsContent value="reviews" className="py-8">
            {reviews.length === 0 ? (
              <p className="text-taupe">No customer reviews yet. Be the first to review this product.</p>
            ) : (
              <ul className="space-y-8">
                {reviews.map((r) => (
                  <li key={r.id} className="border-b border-hairline pb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5 text-sienna">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating && "fill-sienna")} />)}
                      </div>
                      <span className="text-sm">{r.title}</span>
                    </div>
                    <p className="mt-2 text-taupe">{r.body}</p>
                    <p className="mt-2 text-xs text-taupe">— {r.author}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </section>

      <section className="container-luxe mt-24 pb-24 border-t border-hairline pt-16">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">You May Also Like</h2>
        </div>
        <ProductGrid products={related} cols={4} />
      </section>
    </div>
  );
}