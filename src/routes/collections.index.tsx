import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/data/collections";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/shop/ShopHeader";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — BD Collections" },
      { name: "description", content: "Explore every BD Collections chapter — from Atelier 01 to Linen Society." },
      { property: "og:title", content: "Collections — BD Collections" },
      { property: "og:description", content: "Every chapter of the house." },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <Reveal>
        <p className="eyebrow mt-6">Chapters</p>
        <h1 className="mt-2 font-display text-5xl md:text-7xl">All collections.</h1>
      </Reveal>
      <Stagger className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
        {collections.map((c, i) => (
          <StaggerItem key={c.id}>
            <Link to="/collections/$slug" params={{ slug: c.slug }} className="group block">
              <div className="relative overflow-hidden">
                <PlaceholderImage label={c.name} aspect={i % 2 === 0 ? "4/5" : "16/10"} tone="bone" />
                <div className="absolute inset-0 flex items-end p-8 text-canvas bg-gradient-to-t from-ink/50 to-transparent">
                  <div>
                    <p className="eyebrow !text-canvas/70">{c.season}</p>
                    <p className="mt-1 font-display text-4xl">{c.name}</p>
                    <p className="mt-1 text-sm text-canvas/80">{c.tagline}</p>
                  </div>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}