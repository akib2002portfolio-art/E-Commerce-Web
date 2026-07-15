import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { promotions } from "@/data/promotions";

export function SaleBanner() {
  const p = promotions[0];
  return (
    <section className="container-luxe py-16">
      <Reveal>
        <div className="grid gap-6 border border-hairline bg-bone p-10 md:grid-cols-[1fr_auto] md:items-center md:p-16">
          <div>
            <p className="eyebrow">Sale</p>
            <h3 className="mt-3 font-display text-3xl md:text-5xl">{p.headline}</h3>
            <p className="mt-2 max-w-lg text-taupe">{p.subline}</p>
          </div>
          <Link to={p.ctaHref} className="inline-flex h-12 w-fit items-center px-8 bg-ink text-canvas text-[0.72rem] uppercase tracking-[0.22em] hover:bg-sienna">
            {p.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}