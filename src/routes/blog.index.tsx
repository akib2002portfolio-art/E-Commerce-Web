import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog";
import { PageShell } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/blog/")({
  head: () => ({ meta: [{ title: "Journal — BD Collections" }, { name: "description", content: "Notes from the studio — on materials, craft, and the long view." }, { property: "og:title", content: "Journal — BD Collections" }, { property: "og:description", content: "Notes from the studio." }] }),
  component: () => (
    <PageShell eyebrow="Journal" title="Notes from the studio." crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}>
      <Stagger className="grid gap-10 md:grid-cols-2">
        {blogPosts.map((p) => (
          <StaggerItem key={p.id}>
            <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <PlaceholderImage label={p.title} aspect="4/3" />
              <p className="eyebrow mt-4">{p.category} · {p.readingTime}</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl group-hover:text-sienna transition-colors">{p.title}</h2>
              <p className="mt-2 text-taupe">{p.excerpt}</p>
              <p className="mt-3 text-xs text-taupe">{formatDate(p.date)} · {p.author}</p>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </PageShell>
  ),
});