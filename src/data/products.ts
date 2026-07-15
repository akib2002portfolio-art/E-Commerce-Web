import type { Product } from "./types";

const swatches = {
  ink: { name: "Ink", hex: "#1a1a1a" },
  bone: { name: "Bone", hex: "#efe7d8" },
  sienna: { name: "Sienna", hex: "#a45a3b" },
  sage: { name: "Sage", hex: "#8a9a7c" },
  stone: { name: "Stone", hex: "#a89f92" },
  navy: { name: "Navy", hex: "#1b2a3a" },
};

const commonSizes = ["XS", "S", "M", "L", "XL"];
const shoeSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];

function base(p: Partial<Product> & Pick<Product, "id" | "slug" | "name" | "price" | "category" | "brand">): Product {
  return {
    sku: `BD-${p.id.toUpperCase()}`,
    tags: [],
    sizes: commonSizes,
    colors: [swatches.ink, swatches.bone],
    stock: 24,
    description:
      "A considered piece from the BD Collections archive. Cut and finished by hand in small runs, designed to age with intention.",
    specifications: [
      { label: "Composition", value: "100% natural fibre" },
      { label: "Made in", value: "Portugal" },
      { label: "Care", value: "Professional dry clean" },
      { label: "Fit", value: "True to size" },
    ],
    shipping:
      "Complimentary express delivery on orders over $200. Signature required on receipt. Returns within 30 days.",
    gallery: ["front", "back", "detail", "campaign"],
    ...p,
  } as Product;
}

export const products: Product[] = [
  base({ id: "p1", slug: "sculpted-wool-coat", name: "Sculpted Wool Coat", brand: "BD Atelier", category: "women", price: 890, compareAtPrice: 1120, colors: [swatches.ink, swatches.stone, swatches.bone], tags: ["outerwear", "wool"], isNew: true, isFeatured: true, isSale: true }),
  base({ id: "p2", slug: "poplin-oversized-shirt", name: "Poplin Oversized Shirt", brand: "BD Studio", category: "women", price: 240, colors: [swatches.bone, swatches.ink], tags: ["shirts", "cotton"], isBestseller: true }),
  base({ id: "p3", slug: "raw-hem-denim", name: "Raw Hem Denim", brand: "BD Studio", category: "women", price: 320, colors: [swatches.navy, swatches.stone], tags: ["denim"], isTrending: true }),
  base({ id: "p4", slug: "silk-slip-dress", name: "Bias Silk Slip Dress", brand: "BD Atelier", category: "women", price: 620, colors: [swatches.ink, swatches.sienna], tags: ["evening", "silk"], isNew: true, isFeatured: true }),
  base({ id: "p5", slug: "tailored-wool-trouser", name: "Tailored Wool Trouser", brand: "BD Men", category: "men", price: 380, colors: [swatches.ink, swatches.stone], tags: ["tailoring"], isBestseller: true }),
  base({ id: "p6", slug: "double-breasted-blazer", name: "Double-Breasted Blazer", brand: "BD Men", category: "men", price: 720, colors: [swatches.ink, swatches.navy], tags: ["tailoring", "wool"], isFeatured: true }),
  base({ id: "p7", slug: "linen-camp-shirt", name: "Linen Camp Shirt", brand: "BD Studio", category: "men", price: 210, compareAtPrice: 260, colors: [swatches.bone, swatches.sage, swatches.sienna], tags: ["linen", "resort"], isSale: true, isTrending: true }),
  base({ id: "p8", slug: "leather-tote", name: "Structured Leather Tote", brand: "BD Atelier", category: "bags", price: 980, sizes: ["One size"], colors: [swatches.ink, swatches.sienna, swatches.stone], tags: ["leather"], isBestseller: true, isFeatured: true }),
  base({ id: "p9", slug: "woven-market-bag", name: "Woven Market Bag", brand: "BD Studio", category: "bags", price: 320, sizes: ["One size"], colors: [swatches.bone, swatches.sienna], tags: ["summer"], isNew: true }),
  base({ id: "p10", slug: "leather-mule", name: "Sculpted Leather Mule", brand: "BD Atelier", category: "shoes", price: 540, sizes: shoeSizes, colors: [swatches.ink, swatches.bone], tags: ["leather"], isTrending: true }),
  base({ id: "p11", slug: "square-toe-loafer", name: "Square Toe Loafer", brand: "BD Men", category: "shoes", price: 480, sizes: shoeSizes, colors: [swatches.ink, swatches.sienna], tags: ["leather"], isBestseller: true }),
  base({ id: "p12", slug: "gold-signet-ring", name: "Gold Signet Ring", brand: "BD Fine", category: "jewelry", price: 690, sizes: ["48", "50", "52", "54", "56"], colors: [{ name: "Gold", hex: "#c9a54c" }], tags: ["fine"], isNew: true, isFeatured: true }),
  base({ id: "p13", slug: "cashmere-scarf", name: "Cashmere Fringe Scarf", brand: "BD Studio", category: "accessories", price: 280, sizes: ["One size"], colors: [swatches.bone, swatches.ink, swatches.stone], tags: ["knit"] }),
  base({ id: "p14", slug: "signature-fragrance", name: "Signature No. 01", brand: "BD Parfums", category: "fragrance", price: 180, sizes: ["50ml", "100ml"], colors: [{ name: "Amber", hex: "#c68f4a" }], tags: ["scent"], isNew: true }),
  base({ id: "p15", slug: "pearl-drop-earrings", name: "Pearl Drop Earrings", brand: "BD Fine", category: "jewelry", price: 340, sizes: ["One size"], colors: [{ name: "Pearl", hex: "#f2ecdd" }], tags: ["fine"] }),
  base({ id: "p16", slug: "trench-coat", name: "Belted Trench Coat", brand: "BD Atelier", category: "women", price: 940, colors: [swatches.stone, swatches.ink], tags: ["outerwear"], isFeatured: true }),
];

products.forEach((p) => {
  p.relatedIds = products.filter((o) => o.id !== p.id && o.category === p.category).slice(0, 4).map((o) => o.id);
});