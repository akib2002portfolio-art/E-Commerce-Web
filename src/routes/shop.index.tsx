import { createFileRoute } from "@tanstack/react-router";
import { ShopListing } from "@/features/shop/ShopListing";

export const Route = createFileRoute("/shop/")({
  component: () => <ShopListing />,
});