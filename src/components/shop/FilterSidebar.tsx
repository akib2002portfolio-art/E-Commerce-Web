import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

export interface Filters {
  category?: string;
  colors: string[];
  sizes: string[];
  brands: string[];
  priceMax?: number;
  onSale?: boolean;
}

interface Props {
  value: Filters;
  onChange: (f: Filters) => void;
  lockedCategory?: string;
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-hairline py-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-[0.72rem] uppercase tracking-[0.22em]">
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-4 space-y-2 text-sm">{children}</div>}
    </div>
  );
}

export function FilterSidebar({ value, onChange, lockedCategory }: Props) {
  const allColors = useMemo(() => Array.from(new Map(products.flatMap((p) => p.colors).map((c) => [c.hex, c])).values()), []);
  const allSizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes))), []);
  const allBrands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), []);

  const toggle = <T extends string>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <aside className="space-y-2">
      {!lockedCategory && (
        <Section title="Category">
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="cat" checked={value.category === c.slug} onChange={() => onChange({ ...value, category: c.slug })} className="accent-ink" />
              {c.name}
            </label>
          ))}
          {value.category && (
            <button className="text-xs uppercase tracking-[0.2em] text-taupe hover:text-ink" onClick={() => onChange({ ...value, category: undefined })}>Clear</button>
          )}
        </Section>
      )}
      <Section title="Colour">
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => {
            const active = value.colors.includes(c.name);
            return (
              <button
                key={c.hex}
                title={c.name}
                onClick={() => onChange({ ...value, colors: toggle(value.colors, c.name) })}
                className={cn("h-6 w-6 rounded-full border transition-all", active ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas border-transparent" : "border-hairline")}
                style={{ background: c.hex }}
              />
            );
          })}
        </div>
      </Section>
      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => {
            const active = value.sizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => onChange({ ...value, sizes: toggle(value.sizes, s) })}
                className={cn("border px-3 py-1 text-xs", active ? "border-ink bg-ink text-canvas" : "border-hairline hover:border-ink")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>
      <Section title="Brand" defaultOpen={false}>
        {allBrands.map((b) => (
          <label key={b} className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={value.brands.includes(b)} onChange={() => onChange({ ...value, brands: toggle(value.brands, b) })} className="accent-ink" />
            {b}
          </label>
        ))}
      </Section>
      <Section title="Price">
        <input
          type="range"
          min={100}
          max={1200}
          step={20}
          value={value.priceMax ?? 1200}
          onChange={(e) => onChange({ ...value, priceMax: Number(e.target.value) })}
          className="w-full accent-ink"
        />
        <div className="flex justify-between text-xs text-taupe">
          <span>$0</span>
          <span>Up to ${value.priceMax ?? 1200}</span>
        </div>
      </Section>
      <Section title="Offers" defaultOpen={false}>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={!!value.onSale} onChange={(e) => onChange({ ...value, onSale: e.target.checked })} className="accent-ink" />
          On sale only
        </label>
      </Section>
    </aside>
  );
}