import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit";
}

export function MagneticButton({ children, className, strength = 20, onClick, as = "button", href, type = "button" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span style={{ x: sx, y: sy, display: "inline-flex" }} className="items-center justify-center gap-2">
      {children}
    </motion.span>
  );

  if (as === "a") {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick} className={cn("inline-flex", className)}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type={type} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick} className={cn("inline-flex", className)}>
      {inner}
    </button>
  );
}