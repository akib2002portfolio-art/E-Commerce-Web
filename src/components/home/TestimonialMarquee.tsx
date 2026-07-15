import { testimonials } from "@/data/testimonials";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Star } from "lucide-react";

export function TestimonialMarquee() {
  return (
    <section className="border-y border-hairline bg-canvas py-24">
      <div className="container-luxe mb-10">
        <Reveal>
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">From the people who wear us.</h2>
        </Reveal>
      </div>
      <Marquee className="text-ink">
        {testimonials.map((t) => (
          <figure key={t.id} className="flex w-[420px] shrink-0 flex-col gap-4 border border-hairline p-8">
            <div className="flex gap-1 text-sienna">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-sienna" />
              ))}
            </div>
            <blockquote className="font-display text-xl leading-snug">"{t.quote}"</blockquote>
            <figcaption className="mt-auto text-sm text-taupe">— {t.author}, {t.role}</figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}