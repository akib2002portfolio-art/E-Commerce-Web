import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  aspect?: string; // e.g. "4/5", "3/4", "1/1", "16/9"
  className?: string;
  tone?: "canvas" | "bone" | "ink" | "sienna";
  eyebrow?: string;
  rounded?: boolean;
}

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  canvas: "bg-[oklch(0.94_0.012_75)] text-taupe",
  bone: "bg-[oklch(0.9_0.014_75)] text-taupe",
  ink: "bg-ink text-canvas",
  sienna: "bg-sienna text-canvas",
};

export function PlaceholderImage({ label = "Image", aspect = "4/5", className, tone = "bone", eyebrow, rounded = false }: Props) {
  return (
    <div
      data-placeholder
      data-label={label}
      style={{ aspectRatio: aspect }}
      className={cn(
        "relative w-full overflow-hidden isolate",
        rounded ? "rounded-sm" : "",
        toneMap[tone],
        className,
      )}
    >
      {/* soft radial highlight */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 15%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%), radial-gradient(80% 100% at 80% 100%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[0.65rem] uppercase tracking-[0.24em]">
        <span>{eyebrow ?? "BD Collections"}</span>
        <span className="opacity-70">{label}</span>
      </div>
    </div>
  );
}