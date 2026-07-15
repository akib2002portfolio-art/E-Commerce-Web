export type Money = number;

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentId?: string | null;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  season?: string;
  productIds: string[];
}

export interface ProductVariant {
  size?: string;
  color?: string;
  stock: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // category slug
  collectionIds?: string[];
  price: Money;
  compareAtPrice?: Money;
  sku: string;
  tags: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  variants?: ProductVariant[];
  description: string;
  specifications: { label: string; value: string }[];
  shipping: string;
  gallery: string[]; // placeholder ids
  relatedIds?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readingTime: string;
  body: string;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageLabel: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Announcement {
  id: string;
  message: string;
}

export interface Promotion {
  id: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterCompanyInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "youtube";
}

export interface FooterConfig {
  company: FooterCompanyInfo;
  columns: FooterColumn[];
  social: FooterSocialLink[];
  copyright: string;
}

export interface CartLine {
  productId: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: Money;
  items: CartLine[];
  address: Address;
  tracking?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // category slug
  collectionIds?: string[];
  price: Money;
  compareAtPrice?: Money;
  sku: string;
  tags: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  variants?: ProductVariant[];
  description: string;
  specifications: { label: string; value: string }[];
  shipping: string;
  gallery: string[]; // placeholder ids
  images?: string[]; // real product image URLs (optional until populated; falls back to gallery/PlaceholderImage when absent)
  relatedIds?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
}