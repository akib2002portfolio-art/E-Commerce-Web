import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account/orders/$id")({
  component: OrderDetail,
});

function OrderDetail() {
  const { id } = Route.useParams();
  return (
    <div>
      <Link to="/account/orders" className="text-xs uppercase tracking-[0.2em] text-taupe hover:text-ink">← All orders</Link>
      <h2 className="mt-3 font-display text-3xl">Order {id}</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="border border-hairline p-6"><p className="eyebrow">Status</p><p className="mt-2">Delivered · Signed for by recipient</p></div>
        <div className="border border-hairline p-6"><p className="eyebrow">Tracking</p><p className="mt-2">TRK-8842-XA · DHL Express</p></div>
      </div>
      <div className="mt-8 border border-hairline p-6"><p className="eyebrow">Items</p><p className="mt-2 text-taupe">Order details will appear once connected to your backend.</p></div>
    </div>
  );
}
