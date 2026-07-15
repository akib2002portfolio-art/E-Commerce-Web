import type { FooterConfig } from "./types";

/**
 * Single source of truth for the footer. Shaped to map 1:1 onto a
 * future Supabase footer_config table/row (company info, nav columns,
 * social links, copyright) so swapping the data source later requires
 * no changes to Footer.tsx.
 */
export const footerConfig: FooterConfig = {
  company: {
    name: "BD Collection",
    description:
      "BD Collection is a fashion retailer based in Bangladesh, offering clothing for men, women, and kids.",
    address: "House #00, Road #00, Dhaka, Bangladesh",
    phone: "+880 000-000000",
    email: "support@bdcollection.com",
  },
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "New Arrival", href: "/new-arrival" },
        { label: "Men's Wear", href: "/shop/mens-wear" },
        { label: "Women's Wear", href: "/shop/women" },
        { label: "Kids", href: "/shop/kids" },
        { label: "Accessories", href: "/shop/accessories" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Shipping", href: "/policies/shipping" },
        { label: "Returns", href: "/policies/returns" },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Privacy Policy", href: "/policies/privacy" },
        { label: "Terms & Conditions", href: "/policies/terms" },
      ],
    },
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com/bdcollections", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com/bdcollections", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com/@bdcollections", icon: "youtube" },
  ],
  copyright: "© 2026 BD Collection. All Rights Reserved.",
};

/**
 * Kept for backward compatibility — src/lib/api/index.ts imports this
 * directly and is outside this task's allowed files.
 */
export const footerColumns = footerConfig.columns;