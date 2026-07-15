import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/data/types";
import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): BlogPost => {
    const p = blogPosts.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.title} — BD Journal` }, { name: "description", content: loaderData.excerpt }, { property: "og:title", content: loaderData.title }, { property: "og:description", content: loaderData.excerpt }, { property: "og:type", content: "article" }]
      : [{ title: "Article" }, { name: "robots", content: "noindex" }],
  }),
  component: Post,
  notFoundComponent: () => <div className="container-luxe pt-40 pb-24">Article not found.</div>,
});

function Post() {
  const p = Route.useLoaderData() as BlogPost;
  return (
    <article className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/blog" }, { label: p.title }]} />
      <Reveal>
        <p className="eyebrow mt-6">{p.category} · {p.readingTime}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl md:text-6xl">{p.title}</h1>
        <p className="mt-4 text-xs text-taupe">{formatDate(p.date)} · {p.author}</p>
      </Reveal>
      <div className="mt-12"><PlaceholderImage label={p.title} aspect="16/9" /></div>
      <div className="mx-auto mt-12 max-w-2xl space-y-6 text-taupe md:text-lg">
        <p className="font-display text-2xl text-ink md:text-3xl">{p.excerpt}</p>
        <p>{p.body}</p>
        <p>Every piece we make begins in one of our three studios and passes through hands we know by name. That's not romance — it's how quality happens.</p>
      </div>
      <div className="mt-14 text-center"><Link to="/blog" className="text-xs uppercase tracking-[0.22em] border-b border-ink pb-1">← Back to journal</Link></div>
    </article>
  );
}