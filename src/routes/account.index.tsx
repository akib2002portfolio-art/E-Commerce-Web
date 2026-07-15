import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account/")({
  component: () => (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Welcome</p>
        <h2 className="mt-2 font-display text-3xl">Good to see you.</h2>
        <p className="mt-2 text-taupe">Manage orders, addresses, and preferences from here.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[{ t: "Orders", d: "Track and review your orders", to: "/account/orders" }, { t: "Addresses", d: "Delivery destinations", to: "/account/addresses" }, { t: "Wishlist", d: "Pieces you're considering", to: "/account/wishlist" }].map((c) => (
          <Link key={c.t} to={c.to} className="block border border-hairline p-6 hover:border-ink">
            <p className="font-display text-xl">{c.t}</p>
            <p className="mt-2 text-sm text-taupe">{c.d}</p>
          </Link>
        ))}
      </div>
    </div>
  ),
});
