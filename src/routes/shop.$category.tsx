import { createFileRoute } from "@tanstack/react-router";
import { ShopListing } from "@/features/shop/ShopListing";

export const Route = createFileRoute("/shop/$category")({
  component: RouteComp,
});

function RouteComp() {
  const { category } = Route.useParams();
  return <ShopListing lockedCategory={category} />;
}