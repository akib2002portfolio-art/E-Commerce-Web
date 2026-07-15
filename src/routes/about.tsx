import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Parallax } from "@/components/motion/Parallax";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — BD Collections" }, { name: "description", content: "A small international house making considered clothing and objects since 2019." }, { property: "og:title", content: "About — BD Collections" }, { property: "og:description", content: "The story behind the house." }] }),
  component: () => (
    <PageShell eyebrow="The house" title="A small international house." lead="Founded in 2019 across three studios — Porto, Milan, Kyoto — BD Collections makes considered ready-to-wear, leather goods, jewelry and fragrance, in small runs, only when it's worth making." crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}>
      <div className="grid gap-10 lg:grid-cols-2">
        <Parallax offset={40}><PlaceholderImage label="Studio, Porto" aspect="4/5" /></Parallax>
        <div className="space-y-6 text-taupe">
          <p>We believe good clothing outlives its season. Every piece we make is designed to be repaired, re-worn, and passed on. It's the only way we've ever known how to work.</p>
          <p>Our team is small — twenty-three people across three cities — and we work exclusively with family-run ateliers who share our standards. Materials are traceable to the mill.</p>
          <p>We don't chase trend. We publish two collections a year and a handful of essential objects that live in the archive.</p>
        </div>
      </div>
    </PageShell>
  ),
});