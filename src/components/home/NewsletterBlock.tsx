import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterBlock() {
  return (
    <section className="border-t border-hairline bg-bone">
      <div className="container-luxe grid gap-10 py-24 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">The letter</p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Occasional dispatches. Never spam.
          </h2>
        </Reveal>
        <div className="flex flex-col justify-end">
          <p className="max-w-md text-taupe">Once a month at most. Studio notes, private previews, and early access to drops. Members receive 10% off first order.</p>
          <div className="mt-6 max-w-md text-ink [&_input]:placeholder:text-taupe/60 [&_button]:text-ink [&_form]:border-ink/40">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}