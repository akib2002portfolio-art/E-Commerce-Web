import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({ meta: [{ title: "Order confirmed — BD Collections" }, { name: "description", content: "Thank you." }] }),
  component: () => (
    <div className="container-luxe pt-40 pb-24 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-ink"><Check className="h-6 w-6" /></div>
      <p className="eyebrow mt-6">Confirmed</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Thank you.</h1>
      <p className="mx-auto mt-4 max-w-lg text-taupe">Your order is being prepared with care. You'll receive a confirmation email shortly with tracking information.</p>
      <Link to="/shop" className="mt-10 inline-block border-b border-ink pb-1 text-xs uppercase tracking-[0.22em]">Continue shopping</Link>
    </div>
  ),
});