import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { useWishlist } from "@/stores/wishlist";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  index?: number;
  aspect?: string;
  className?: string;
}

export function ProductCard({ product, aspect = "4/5", className }: Props) {
  const [hover, setHover] = useState(false);
  const wish = useWishlist();
  const isWished = wish.ids.includes(product.id);
  return (
    <div className={cn("group relative", className)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative overflow-hidden">
          <motion.div animate={{ scale: hover ? 1.03 : 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {product.images?.length ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            ) : (
              <PlaceholderImage label={product.name} aspect={aspect} tone={hover ? "canvas" : "bone"} />
            )}
          </motion.div>
          {product.isSale && (
            <span className="absolute left-3 top-3 bg-sienna px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-canvas">Sale</span>
          )}
          {product.isNew && !product.isSale && (
            <span className="absolute left-3 top-3 bg-ink px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-canvas">New</span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              wish.toggle(product.id);
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-canvas/85 text-ink backdrop-blur"
          >
            <Heart className={cn("h-4 w-4", isWished && "fill-sienna text-sienna")} />
          </button>
          <motion.div
            initial={false}
            animate={{ y: hover ? 0 : 16, opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 bottom-3 flex h-10 items-center justify-center bg-ink text-canvas text-[0.68rem] uppercase tracking-[0.22em]"
          >
            Quick view
          </motion.div>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow !text-taupe/80">{product.brand}</p>
            <p className="mt-1 truncate text-sm">{product.name}</p>
          </div>
          <div className="shrink-0 text-right text-sm">
            {product.compareAtPrice && <span className="mr-1 text-taupe line-through">{formatPrice(product.compareAtPrice)}</span>}
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span key={c.hex} title={c.name} className="h-3 w-3 rounded-full border border-hairline" style={{ background: c.hex }} />
          ))}
        </div>
      </Link>
    </div>
  );
}