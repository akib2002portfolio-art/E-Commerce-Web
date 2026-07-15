export type SortKey = "featured" | "price-asc" | "price-desc" | "new";

export function SortMenu({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-taupe">
      Sort
      <select value={value} onChange={(e) => onChange(e.target.value as SortKey)} className="border-b border-hairline bg-transparent py-1 text-ink outline-none">
        <option value="featured">Featured</option>
        <option value="new">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </label>
  );
}