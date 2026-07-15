import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/data/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (line: CartLine) => void;
  remove: (i: number) => void;
  updateQty: (i: number, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (line) =>
        set((s) => {
          const existing = s.lines.findIndex((l) => l.productId === line.productId && l.size === line.size && l.color === line.color);
          if (existing >= 0) {
            const next = [...s.lines];
            next[existing] = { ...next[existing], quantity: next[existing].quantity + line.quantity };
            return { lines: next, isOpen: true };
          }
          return { lines: [...s.lines, line], isOpen: true };
        }),
      remove: (i) => set((s) => ({ lines: s.lines.filter((_, idx) => idx !== i) })),
      updateQty: (i, qty) => set((s) => ({ lines: s.lines.map((l, idx) => (idx === i ? { ...l, quantity: Math.max(1, qty) } : l)) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "bd-cart" },
  ),
);