import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({ children, className, pauseOnHover = true }: { children: ReactNode; className?: string; pauseOnHover?: boolean }) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className={cn("flex shrink-0 animate-marquee gap-16 pr-16", pauseOnHover && "group-hover:[animation-play-state:paused]")}>{children}</div>
      <div aria-hidden className={cn("flex shrink-0 animate-marquee gap-16 pr-16", pauseOnHover && "group-hover:[animation-play-state:paused]")}>{children}</div>
    </div>
  );
}