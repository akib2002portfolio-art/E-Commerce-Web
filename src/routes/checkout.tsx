import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/stores/cart";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — BD Collections" }, { name: "description", content: "Complete your order." }] }),
  component: Checkout,
});

const steps = ["Contact", "Shipping", "Payment", "Review"] as const;

function Checkout() {
  const [step, setStep] = useState(0);
  const { lines, clear } = useCart();
  const items = lines.map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) })).filter((x) => x.product);
  const subtotal = items.reduce((a, { line, product }) => a + (product?.price ?? 0) * line.quantity, 0);
  const FREE_SHIPPING = 200;
  const shipping = subtotal >= FREE_SHIPPING ? 0 : 15;
  const total = subtotal + shipping;
  const nav = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-luxe pt-40 pb-24 text-center">
        <p className="font-display text-3xl">Your bag is empty.</p>
        <Link to="/shop" className="mt-6 inline-block border-b border-ink pb-1 text-xs uppercase tracking-[0.22em]">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <Reveal><h1 className="mt-6 font-display text-4xl md:text-6xl">Checkout</h1></Reveal>
      <ol className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em]">
        {steps.map((s, i) => (
          <li key={s} className={cn("flex items-center gap-2", i === step ? "text-ink" : "text-taupe")}>
            <span className={cn("grid h-6 w-6 place-items-center rounded-full border", i < step ? "border-ink bg-ink text-canvas" : i === step ? "border-ink" : "border-hairline")}>
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <div className="mt-10 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < steps.length - 1) setStep(step + 1);
            else {
              clear();
              nav({ to: "/checkout/success" });
            }
          }}
        >
          {step === 0 && (
            <div className="space-y-4">
              <Field label="Email Address" type="email" />
              <Field label="Phone Number (Optional)" required={false} />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="First Name" />
                <Field label="Last Name" />
              </div>
              <Field label="Country / Region" defaultValue="Bangladesh" />
              <Field label="Street Address" />
              <Field label="Apartment / Suite (Optional)" required={false} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="City" />
                <Field label="State / Province" />
              </div>
              <Field label="ZIP / Postal Code" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="eyebrow">Accepted Cards</span>
                <div className="mt-2 flex gap-2 text-xs uppercase tracking-[0.15em] text-taupe">
                  <span className="border border-hairline px-3 py-1.5">Visa</span>
                  <span className="border border-hairline px-3 py-1.5">Mastercard</span>
                  <span className="border border-hairline px-3 py-1.5">Amex</span>
                </div>
              </div>
              <div className="space-y-4">
                <Field label="Card Number" placeholder="•••• •••• •••• ••••" />
                <Field label="Name on Card" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Expiry Date" placeholder="MM / YY" />
                  <Field label="CVV" placeholder="•••" />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="border border-hairline p-6 text-sm text-taupe">
              <p className="eyebrow text-ink">Order Review</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-ink"><Check className="h-4 w-4" /> Contact Information</li>
                <li className="flex items-center gap-2 text-ink"><Check className="h-4 w-4" /> Shipping Address</li>
                <li className="flex items-center gap-2 text-ink"><Check className="h-4 w-4" /> Payment Method</li>
              </ul>
              <p className="mt-4">Please verify your information before placing your order.</p>
            </div>
          )}
          <div className="flex items-center gap-4 pt-4">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="text-xs uppercase tracking-[0.22em] text-taupe hover:text-ink">← Back</button>}
            <button className="ml-auto h-12 bg-ink px-10 text-canvas text-xs uppercase tracking-[0.22em] hover:bg-sienna">
              {step === steps.length - 1 ? `Place order — ${formatPrice(total)}` : "Continue"}
            </button>
          </div>
        </form>
        <aside className="h-fit border border-hairline p-6">
          <p className="eyebrow">Order</p>
          <ul className="mt-6 space-y-4">
            {items.map(({ line, product }, i) => product && (
              <li key={i} className="grid grid-cols-[64px_1fr_auto] items-center gap-4">
                {product.images?.length ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-[4/5] h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <PlaceholderImage label={product.name} aspect="4/5" />
                )}
                <div className="text-sm">
                  <p>{product.name}</p>
                  <p className="text-xs text-taupe">{[line.size, line.color].filter(Boolean).join(" · ")} · × {line.quantity}</p>
                </div>
                <p className="text-sm">{formatPrice(product.price * line.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-hairline pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-taupe">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-taupe">Shipping</dt><dd>{shipping ? formatPrice(shipping) : "Free"}</dd></div>
            <div className="flex justify-between border-t border-hairline pt-2 font-display text-lg"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input required {...rest} className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" />
    </label>
  );
}