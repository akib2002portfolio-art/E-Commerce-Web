import type { Promotion, Announcement } from "./types";

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    headline: "Mid-season edit — up to 30% off select pieces",
    subline: "A brief window on selected outerwear and knitwear.",
    ctaLabel: "Shop the edit",
    ctaHref: "/shop",
  },
];

/**
 * Announcement bar rotation.
 * Future-ready for Supabase CMS.
 */
export const announcements: Announcement[] = [
  {
    id: "announce-1",
    message: "New Arrivals Available",
  },
  {
    id: "announce-2",
    message: "Nationwide Delivery Across Bangladesh",
  },
  {
    id: "announce-3",
    message: "Premium Quality Fashion",
  },
  {
    id: "announce-4",
    message: "Follow BD Collection for Latest Updates",
  },
];