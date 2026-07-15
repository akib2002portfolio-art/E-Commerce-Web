import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

export function ProductGallery({ label, gallery, images }: { label: string; gallery: string[]; images?: string[] }) {
  const [i, setI] = useState(0);
  const hasImages = images?.length;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[100px_1fr]">
      <div className="order-2 flex gap-2 md:order-1 md:flex-col">
        {gallery.map((g, idx) => (
          <button
            key={g}
            onClick={() => setI(idx)}
            className={cn("relative aspect-[4/5] w-16 md:w-full overflow-hidden border transition-colors", i === idx ? "border-ink" : "border-hairline hover:border-taupe")}
          >
            {hasImages ? (
              <img
                src={images[idx]}
                alt={`${label} ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <PlaceholderImage label={g} aspect="4/5" tone={idx % 2 === 0 ? "bone" : "canvas"} />
            )}
          </button>
        ))}
      </div>
      <div className="order-1 relative md:order-2">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {hasImages ? (
              <img
                src={images[i]}
                alt={label}
                className="aspect-[4/5] h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <PlaceholderImage label={`${label} — ${gallery[i]}`} aspect="4/5" tone="bone" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}