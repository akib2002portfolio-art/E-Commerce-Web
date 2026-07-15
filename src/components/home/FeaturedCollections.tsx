import { Link } from "@tanstack/react-router";
import { collections } from "@/data/collections";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function FeaturedCollections() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="mb-14 flex items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">Collections</p>
          <h2 className="mt-2 font-display text-4xl leading-tight md:text-6xl">A house made of chapters.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/collections" className="hidden md:inline-flex text-[0.72rem] uppercase tracking-[0.22em] border-b border-ink pb-1">All collections</Link>
        </Reveal>
      </div>
      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {collections.map((c) => (
          <StaggerItem key={c.id}>
            <Link to="/collections/$slug" params={{ slug: c.slug }} className="group block">
              <div className="relative overflow-hidden">
                <PlaceholderImage label={c.name} aspect="4/5" tone="bone" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-ink/40 to-transparent text-canvas">
                  <div>
                    <p className="eyebrow !text-canvas/80">{c.season}</p>
                    <p className="mt-1 font-display text-3xl">{c.name}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-taupe">{c.tagline} — {c.description}</p>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}