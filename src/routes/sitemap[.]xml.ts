import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          "/", "/shop", "/collections", "/blog", "/about", "/contact", "/faq",
          "/policies/privacy", "/policies/terms", "/policies/shipping", "/policies/returns",
          ...categories.map((c) => `/shop/${c.slug}`),
          ...collections.map((c) => `/collections/${c.slug}`),
          ...products.map((p) => `/product/${p.slug}`),
          ...blogPosts.map((b) => `/blog/${b.slug}`),
        ];
        const urls = entries.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});