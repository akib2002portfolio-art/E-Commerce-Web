import type { ReactNode } from "react";

interface ProductModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function ProductModal({
  open,
  title,
  onClose,
  children,
}: ProductModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-4xl rounded-xl bg-canvas shadow-2xl">
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <h2 className="font-display text-2xl text-ink">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-taupe transition hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}