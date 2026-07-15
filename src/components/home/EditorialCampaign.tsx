import { Link } from "@tanstack/react-router";
import { Parallax } from "@/components/motion/Parallax";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/motion/Reveal";

export function EditorialCampaign() {
  return (
    <section className="relative bg-ink text-canvas">
      <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
        <div className="relative">
          <Parallax offset={80}>
            <PlaceholderImage label="Campaign 01" aspect="3/4" tone="ink" className="!h-full !aspect-auto" />
          </Parallax>
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
          <Reveal>
            <p className="eyebrow !text-canvas/60">Campaign — AW 26</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              After the noise, before the morning.
            </h2>
            <p className="mt-6 max-w-md text-canvas/70">
              Shot in the empty rooms of an unfinished apartment in Milan. Photographed by Rafaela Costa. Styled by Otis Yeong.
            </p>
            <Link to="/collections/atelier-01" className="mt-10 inline-flex w-fit items-center gap-2 border-b border-canvas pb-1 text-[0.72rem] uppercase tracking-[0.22em]">
              See the story →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}