import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function InstagramFeed() {
  return (
    <section className="container-luxe py-24">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">@bd.collections</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Follow the studio.</h2>
          </div>
          <a href="#" className="text-[0.72rem] uppercase tracking-[0.22em] border-b border-ink pb-1">Instagram →</a>
        </div>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StaggerItem key={i}>
            <PlaceholderImage label={`Post ${i + 1}`} aspect="1/1" tone={i % 3 === 0 ? "bone" : "canvas"} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}