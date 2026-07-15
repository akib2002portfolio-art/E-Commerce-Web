import { createFileRoute, Link } from "@tanstack/react-router";

const mockOrders = [
  { id: "BD-10241", date: "2026-05-01", status: "Delivered", total: "$1,120" },
  { id: "BD-10188", date: "2026-03-14", status: "Delivered", total: "$540" },
  { id: "BD-10142", date: "2026-01-22", status: "Delivered", total: "$980" },
];

export const Route = createFileRoute("/account/orders")({
  component: () => (
    <div>
      <h2 className="font-display text-3xl">Orders</h2>
      <table className="mt-6 w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-[0.2em] text-taupe">
          <tr className="border-b border-hairline"><th className="py-3">Order</th><th>Date</th><th>Status</th><th className="text-right">Total</th><th></th></tr>
        </thead>
        <tbody>
          {mockOrders.map((o) => (
            <tr key={o.id} className="border-b border-hairline">
              <td className="py-4">{o.id}</td>
              <td>{o.date}</td>
              <td>{o.status}</td>
              <td className="text-right">{o.total}</td>
              <td className="text-right"><Link to="/account/orders/$id" params={{ id: o.id }} className="text-xs uppercase tracking-[0.2em] text-taupe hover:text-ink">View →</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
});
