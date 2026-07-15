import { createFileRoute, notFound } from "@tanstack/react-router";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const c = collections.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — BD Collections` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — BD Collections` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Collection — BD Collections" }, { name: "robots", content: "noindex" }],
  }),
  component: CollectionPage,
  notFoundComponent: () => <div className="container-luxe pt-40 pb-24">Collection not found.</div>,
});

function CollectionPage() {
  const c = Route.useLoaderData();
  const items = products.filter((p) => c.productIds.includes(p.id));
  return (
    <div>
      <section className="relative min-h-[70vh] bg-ink text-canvas">
        <Parallax offset={40} className="absolute inset-0">
          <PlaceholderImage label={c.name} aspect="auto" tone="ink" className="!h-full !aspect-auto" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative container-luxe flex min-h-[70vh] flex-col justify-end pb-16 pt-32">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }, { label: c.name }]} />
          <Reveal>
            <p className="eyebrow !text-canvas/70 mt-6">{c.season} · {c.tagline}</p>
            <h1 className="mt-3 font-display text-6xl md:text-8xl">{c.name}</h1>
            <p className="mt-6 max-w-2xl text-canvas/80 md:text-lg">{c.description}</p>
          </Reveal>
        </div>
      </section>
      <section className="container-luxe py-24">
        <ProductGrid products={items} cols={3} />
      </section>
    </div>
  );
}