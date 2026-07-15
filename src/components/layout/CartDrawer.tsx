import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/stores/cart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function CartDrawer() {
  const { isOpen, close, lines, updateQty, remove } = useCart();
  const items = lines.map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) })).filter((x) => x.product);
  const subtotal = items.reduce((a, { line, product }) => a + (product?.price ?? 0) * line.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas"
          >
            <div className="flex items-center justify-between border-b border-hairline p-6">
              <div>
                <p className="eyebrow">Your bag</p>
                <p className="mt-1 font-display text-xl">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>
              </div>
              <button onClick={close} aria-label="Close cart" className="p-2"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-2xl">Your bag is empty</p>
                  <p className="text-sm text-taupe">A quiet start. Let's find something worth keeping.</p>
                  <Link to="/shop" onClick={close} className="mt-4 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm uppercase tracking-[0.22em]">
                    Browse shop <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map(({ line, product }, i) =>
                    product ? (
                      <li key={i} className="grid grid-cols-[92px_1fr] gap-4">
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
                        <div className="flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm">{product.name}</p>
                              <p className="mt-1 text-xs text-taupe">
                                {[line.size, line.color].filter(Boolean).join(" · ")}
                              </p>
                            </div>
                            <button onClick={() => remove(i)} className="text-xs uppercase tracking-[0.2em] text-taupe hover:text-ink">Remove</button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-hairline">
                              <button onClick={() => updateQty(i, line.quantity - 1)} className="p-2" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                              <span className="w-8 text-center text-sm">{line.quantity}</span>
                              <button onClick={() => updateQty(i, line.quantity + 1)} className="p-2" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                            </div>
                            <p className="text-sm">{formatPrice(product.price * line.quantity)}</p>
                          </div>
                        </div>
                      </li>
                    ) : null,
                  )}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-hairline p-6">
                <div className="mb-2 flex items-center justify-between text-sm text-taupe">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-taupe">Shipping and taxes calculated at checkout.</p>
                <Link to="/checkout" onClick={close} className="flex h-12 w-full items-center justify-center bg-ink text-canvas text-sm uppercase tracking-[0.22em] transition-colors hover:bg-sienna">
                  Checkout · {formatPrice(subtotal)}
                </Link>
                <Link to="/cart" onClick={close} className="mt-3 block text-center text-xs uppercase tracking-[0.22em] text-taupe hover:text-ink">View cart</Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}