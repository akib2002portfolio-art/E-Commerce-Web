import type { MenuItem } from "./types";

/**
 * Central brand wordmark config.
 * Header.tsx and MobileMenu.tsx both read from here instead of
 * hardcoding the brand string twice, so future rebrand/CMS wiring
 * only touches one place.
 */
export const brand = {
  prefix: "BD",
  suffix: "Collection",
};

/**
 * Primary shopping navigation. Always rendered first.
 * Hrefs are clean, SEO-friendly placeholders for routes that will be
 * implemented in a later milestone — no query-string filtering.
 */
export const shopNavigation: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "New Arrival", href: "/shop" },
  {
    label: "Men's Wear",
    href: "/shop/mens-wear",
    children: [
      { label: "T-Shirts", href: "/shop/mens-wear/t-shirts" },
      { label: "Polo", href: "/shop/mens-wear/polo" },
      { label: "Shirts", href: "/shop/mens-wear/shirts" },
      { label: "Panjabi", href: "/shop/mens-wear/panjabi" },
      { label: "Pants", href: "/shop/mens-wear/pants" },
    ],
  },
  { label: "Women's Wear", href: "/shop/women" },
  { label: "Kids", href: "/shop/kids" },
  { label: "Accessories", href: "/shop/accessories" },
];

/**
 * Informational navigation. Rendered after the shopping group,
 * visually separated from it in both desktop and mobile nav.
 */
export const infoNavigation: MenuItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Combined menu, kept for any consumer that just needs the full
 * flat list (e.g. sitemap generation later). Desktop/mobile nav
 * render shopNavigation and infoNavigation separately for grouping.
 */
export const mainMenu: MenuItem[] = [...shopNavigation, ...infoNavigation];