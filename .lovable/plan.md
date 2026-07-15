# BD Collections — Premium Redesign Plan

Rebuild the storefront frontend inspired by Strevora's modern-luxury aesthetic while preserving every BD Collections e-commerce capability. All content stays as mock JSON so a backend can plug in later.

## Design system

- Palette: warm off-white background, deep charcoal ink, muted taupe accents, single editorial accent (burnt sienna). Defined as oklch tokens in `src/styles.css`.
- Typography: serif display (Instrument Serif via `<link>` in `__root.tsx`) for headlines, geometric sans (Inter Tight) for UI/body. Large tracking-tight display sizes, wide letter-spacing eyebrows.
- Motion: Framer Motion for reveals/hover/page transitions; GSAP + ScrollTrigger for parallax and pinned sections; Lenis for smooth scroll. Reusable `<Reveal>`, `<Parallax>`, `<Marquee>`, `<MagneticButton>`, `<StaggerText>` primitives.
- Layout: generous whitespace, editorial grids, oversized imagery slots (placeholder component with aspect ratio + soft skeleton), thin hairline dividers.

## Data layer (mock JSON, swap-ready)

`src/data/` holds typed JSON + TS types:
`products.ts`, `collections.ts`, `categories.ts`, `menus.ts`, `hero.ts`, `testimonials.ts`, `blog.ts`, `footer.ts`, `promotions.ts`, `banners.ts`, `reviews.ts`, `faqs.ts`, `pages.ts`.

Access through `src/lib/api/*.ts` functions returning promises (so later they map 1:1 to Supabase/REST). TanStack Query wraps every read so swapping the source touches only the api layer.

Client state: Zustand stores for `cart`, `wishlist`, `recentlyViewed`, `search`, persisted to `localStorage` (guarded for SSR).

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx                  shell, nav, cart drawer, search overlay, footer
  index.tsx                   homepage
  shop.tsx                    shop layout (filters sidebar + outlet)
    shop.index.tsx            all products
    shop.$category.tsx        category listing
  collections.index.tsx
  collections.$slug.tsx
  product.$slug.tsx           PDP
  search.tsx
  wishlist.tsx
  cart.tsx
  checkout.tsx                multi-step (address → shipping → payment → review)
  checkout.success.tsx
  account.tsx                 account layout
    account.index.tsx         dashboard
    account.orders.tsx
    account.orders.$id.tsx
    account.addresses.tsx
    account.profile.tsx
    account.wishlist.tsx
  auth.login.tsx
  auth.register.tsx
  auth.forgot.tsx
  about.tsx
  contact.tsx
  blog.index.tsx
  blog.$slug.tsx
  faq.tsx
  policies.privacy.tsx
  policies.terms.tsx
  policies.shipping.tsx
  policies.returns.tsx
  sitemap[.]xml.ts
```

Each route defines its own `head()` metadata.

## Components (`src/components/`)

- `layout/`: `Header` (sticky, transparent-over-hero), `MegaMenu`, `MobileMenu` (animated drawer), `Footer`, `AnnouncementBar`, `SearchOverlay`, `CartDrawer`, `WishlistButton`, `AccountMenu`, `Breadcrumbs`, `PageTransition`, `LoadingScreen`.
- `product/`: `ProductCard`, `ProductGrid`, `ProductGallery` (thumbs + zoom), `ProductInfo`, `VariantPicker` (size/color), `QuantityStepper`, `AddToCartBar`, `ProductTabs` (description/specs/shipping/reviews), `ReviewList`, `ReviewForm`, `RelatedProducts`, `RecentlyViewed`, `StockBadge`, `PriceTag`.
- `shop/`: `FilterSidebar` (category/price/color/size/brand/tags), `SortMenu`, `ActiveFilters`, `Pagination`, `InfiniteLoader`, `ViewToggle`.
- `home/`: `HeroLuxury`, `FeaturedCollections`, `NewArrivals`, `TrendingCarousel`, `CategoryTiles`, `BrandStory`, `EditorialCampaign`, `BestSellers`, `SaleBanner`, `TestimonialMarquee`, `InstagramFeed`, `NewsletterBlock`.
- `ui/`: keep shadcn primitives; add `MagneticButton`, `Marquee`, `Reveal`, `Parallax`, `StaggerText`, `Accordion`, `Tabs`, `Carousel` (Embla), `Modal`, `Drawer`, `PlaceholderImage` (aspect-ratio slot with `data-slot` for future upload).
- `forms/`: `LoginForm`, `RegisterForm`, `AddressForm`, `CheckoutForm`, `ContactForm`, `NewsletterForm` — all React Hook Form + Zod.

## Animation system

- Root: Lenis smooth scroll + `<PageTransition>` wrapping outlet.
- Utility hooks: `useReveal`, `useParallax`, `useMagnetic`, `useStagger`.
- Section reveals via `IntersectionObserver` + Framer variants.
- Luxury loading screen on first mount (logo mask + fade).
- Respect `prefers-reduced-motion` everywhere.

## Placeholder images

`<PlaceholderImage aspect="4/5" label="Product" />` renders a neutral tonal block with a subtle noise texture and centered label. Used everywhere real imagery would go; ready to swap for `<img>` once URLs exist.

## Delivery order

1. Tokens + fonts + base layout (header/footer/shell, smooth scroll, page transition).
2. Motion primitives + `PlaceholderImage`.
3. Mock data + api layer + Zustand stores.
4. Homepage sections.
5. Shop + PDP + filters.
6. Cart, wishlist, checkout, account, auth.
7. Content pages (about/contact/blog/faq/policies).
8. Polish pass: SEO heads, sitemap, accessibility, reduced-motion.

## Technical notes

- Stack stays TanStack Start + React 19 + Tailwind v4 + shadcn (per template). React Router DOM is not used — TanStack Router covers routing.
- Framer Motion, GSAP, Lenis, Embla, Zustand, RHF, Zod added via `bun add`.
- No hardcoded colors in components — everything via semantic tokens.
- Auth/checkout are UI-only flows against mock stores; wired so a real backend slots in behind the api layer without component changes.

Given the size, I'll build in the order above across multiple turns, keeping the app runnable at each step. Confirm and I'll start with the design system + shell.