import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — BD Collections" }, { name: "description", content: "Manage your account." }] }),
  component: AccountLayout,
});

const items = [
  { to: "/account", label: "Overview" },
  { to: "/account/orders", label: "Orders" },
  { to: "/account/addresses", label: "Addresses" },
  { to: "/account/profile", label: "Profile" },
  { to: "/account/wishlist", label: "Wishlist" },
] as const;

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <h1 className="mt-6 font-display text-5xl md:text-6xl">Account</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-2 text-sm">
          {items.map((i) => (
            <Link key={i.to} to={i.to} className={cn("block border-l-2 py-1 pl-3 transition-colors", pathname === i.to ? "border-ink text-ink" : "border-transparent text-taupe hover:text-ink")}>
              {i.label}
            </Link>
          ))}
          <button className="mt-6 block text-xs uppercase tracking-[0.22em] text-taupe hover:text-ink">Sign out</button>
        </nav>
        <div><Outlet /></div>
      </div>
    </div>
  );
}