import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StaggerText } from "@/components/motion/StaggerText";

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);
  const slide = heroSlides[i];
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-canvas">
      <AnimatePresence>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <PlaceholderImage label={slide.imageLabel} aspect="auto" tone="ink" className="!h-full !w-full !aspect-auto" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-32">
        <div className="container-luxe">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow !text-canvas/70">{slide.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[7.5rem]">
                <StaggerText text={slide.title} />
              </h1>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-6 max-w-xl text-sm text-canvas/80 md:text-base">
                {slide.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-10 flex items-center gap-6">
                <Link to={slide.ctaHref} className="group inline-flex items-center gap-3 border border-canvas/40 bg-canvas/5 px-6 py-3 text-[0.72rem] uppercase tracking-[0.22em] backdrop-blur transition-colors hover:bg-canvas hover:text-ink">
                  {slide.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container-luxe mt-14 flex items-center justify-between text-xs text-canvas/60">
          <div className="flex items-center gap-3">
            {heroSlides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className="group flex items-center gap-2">
                <span className={`h-px transition-all duration-500 ${idx === i ? "w-14 bg-canvas" : "w-6 bg-canvas/30"}`} />
                <span className={idx === i ? "text-canvas" : ""}>{String(idx + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <p className="hidden md:block">Scroll to explore ↓</p>
        </div>
      </div>
    </section>
  );
}