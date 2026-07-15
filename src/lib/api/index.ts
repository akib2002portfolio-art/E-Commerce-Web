import { products as _products } from "@/data/products";
import { collections as _collections } from "@/data/collections";
import { categories as _categories } from "@/data/categories";
import { blogPosts as _blog } from "@/data/blog";
import { testimonials as _testimonials } from "@/data/testimonials";
import { reviews as _reviews } from "@/data/reviews";
import { faqs as _faqs } from "@/data/faqs";
import { heroSlides as _hero } from "@/data/hero";
import { footerColumns as _footer } from "@/data/footer";
import { mainMenu as _menu } from "@/data/menus";
import { promotions as _promotions, announcements as _announcements } from "@/data/promotions";

const wait = <T>(v: T) => Promise.resolve(v);

export const api = {
  listProducts: (opts?: { category?: string; tag?: string; onSale?: boolean; isNew?: boolean; isBestseller?: boolean; isTrending?: boolean; isFeatured?: boolean; search?: string; limit?: number }) => {
    let out = _products;
    if (opts?.category) out = out.filter((p) => p.category === opts.category);
    if (opts?.tag) out = out.filter((p) => p.tags.includes(opts.tag!));
    if (opts?.onSale) out = out.filter((p) => p.isSale);
    if (opts?.isNew) out = out.filter((p) => p.isNew);
    if (opts?.isBestseller) out = out.filter((p) => p.isBestseller);
    if (opts?.isTrending) out = out.filter((p) => p.isTrending);
    if (opts?.isFeatured) out = out.filter((p) => p.isFeatured);
    if (opts?.search) {
      const q = opts.search.toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (opts?.limit) out = out.slice(0, opts.limit);
    return wait(out);
  },
  getProduct: (slug: string) => wait(_products.find((p) => p.slug === slug) ?? null),
  listCollections: () => wait(_collections),
  getCollection: (slug: string) => wait(_collections.find((c) => c.slug === slug) ?? null),
  listCategories: () => wait(_categories),
  getCategory: (slug: string) => wait(_categories.find((c) => c.slug === slug) ?? null),
  listBlog: () => wait(_blog),
  getPost: (slug: string) => wait(_blog.find((p) => p.slug === slug) ?? null),
  listTestimonials: () => wait(_testimonials),
  listReviews: (productId: string) => wait(_reviews.filter((r) => r.productId === productId)),
  listFaqs: () => wait(_faqs),
  hero: () => wait(_hero),
  footer: () => wait(_footer),
  menu: () => wait(_menu),
  promotions: () => wait(_promotions),
  announcements: () => wait(_announcements),
  relatedProducts: (id: string) => {
    const p = _products.find((x) => x.id === id);
    if (!p?.relatedIds) return wait([]);
    return wait(_products.filter((x) => p.relatedIds!.includes(x.id)));
  },
  productsByIds: (ids: string[]) => wait(_products.filter((p) => ids.includes(p.id))),
};

export type Api = typeof api;