import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function CategoryTiles() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <Reveal>
        <p className="eyebrow">Shop by Category</p>
        <h2 className="mt-2 font-display text-4xl md:text-6xl">Explore Our Categories</h2>
      </Reveal>
      <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((c) => (
          <StaggerItem key={c.id}>
            <Link to="/shop/$category" params={{ category: c.slug }} className="group block">
              <div className="relative overflow-hidden">
                <PlaceholderImage
                  label={c.name}
                  aspect="4/5"
                  tone="bone"
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-display text-lg md:text-xl">{c.name}</p>
              {c.description && <p className="mt-1 text-sm text-taupe">{c.description}</p>}
              <span className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-ink/80 transition-colors group-hover:text-ink">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}