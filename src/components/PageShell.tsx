import { Breadcrumbs } from "@/components/shop/ShopHeader";
import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, lead, crumbs, children }: { eyebrow?: string; title: string; lead?: string; crumbs: { label: string; href?: string }[]; children?: ReactNode }) {
  return (
    <div className="container-luxe pt-32 pb-24">
      <Breadcrumbs items={crumbs} />
      <Reveal>
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-5xl md:text-7xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-taupe md:text-lg">{lead}</p>}
      </Reveal>
      <div className="mt-14">{children}</div>
    </div>
  );
}