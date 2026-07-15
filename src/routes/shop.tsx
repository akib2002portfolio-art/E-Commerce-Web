import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — BD Collections" },
      { name: "description", content: "Browse the full BD Collections shop: outerwear, tailoring, bags, shoes, jewelry, fragrance." },
      { property: "og:title", content: "Shop — BD Collections" },
      { property: "og:description", content: "The full BD Collections range." },
    ],
  }),
  component: () => <Outlet />,
});