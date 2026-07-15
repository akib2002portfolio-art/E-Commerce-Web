import { Link } from "@tanstack/react-router";
import { Parallax } from "@/components/motion/Parallax";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Reveal } from "@/components/motion/Reveal";

export function BrandStory() {
  return (
    <section className="border-y border-hairline bg-bone">
      <div className="container-luxe grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <Parallax offset={40}>
          <PlaceholderImage label="BD Collection Store" aspect="4/5" tone="canvas" />
        </Parallax>
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow">About BD Collection</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              Premium Fashion for Every Generation
            </h2>
            <p className="mt-6 max-w-xl text-taupe md:text-lg">
              BD Collection is a Bangladesh-based fashion brand offering quality clothing for men, women, and kids. We focus on modern designs, comfortable fabrics, and reliable nationwide delivery while making everyday fashion accessible.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-8 text-sm">
              <div>
                <p className="font-display text-3xl">1000+</p>
                <p className="eyebrow mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl">50+</p>
                <p className="eyebrow mt-1">Products</p>
              </div>
              <div>
                <p className="font-display text-3xl">Nationwide</p>
                <p className="eyebrow mt-1">Delivery</p>
              </div>
            </div>
            <Link to="/about" className="mt-10 inline-flex w-fit items-center gap-2 border-b border-ink pb-1 text-[0.72rem] uppercase tracking-[0.22em]">
              Learn More →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}