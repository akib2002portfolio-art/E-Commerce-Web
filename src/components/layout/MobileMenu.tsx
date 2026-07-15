import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { shopNavigation, infoNavigation, brand } from "@/data/menus";
import { useUI } from "@/stores/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MenuItem } from "@/data/types";

function NavRow({ item, index, onNavigate }: { item: MenuItem; index: number; onNavigate: () => void }) {
  if (item.children?.length) {
    return (
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
        <Accordion type="single" collapsible className="border-b border-hairline">
          <AccordionItem value={item.label} className="border-none">
            <AccordionTrigger className="py-4 font-display text-3xl hover:no-underline [&>svg]:h-5 [&>svg]:w-5">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <div className="flex flex-col">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.href}
                    onClick={onNavigate}
                    className="border-t border-hairline/60 py-3 pl-1 text-sm uppercase tracking-[0.18em] text-taupe transition-colors hover:text-ink"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
      <Link to={item.href} onClick={onNavigate} className="block border-b border-hairline py-4 font-display text-3xl">
        {item.label}
      </Link>
    </motion.div>
  );
}

export function MobileMenu() {
  const open = useUI((s) => s.mobileMenuOpen);
  const setOpen = useUI((s) => s.setMobileMenuOpen);
  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-canvas p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">
                {brand.prefix} <span className="italic">{brand.suffix}</span>
              </span>
              <button onClick={close} aria-label="Close menu" className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10">
              {shopNavigation.map((item, i) => (
                <NavRow key={item.label} item={item} index={i} onNavigate={close} />
              ))}
            </nav>

            <nav className="mt-6 border-t border-hairline pt-2">
              {infoNavigation.map((item, i) => (
                <NavRow key={item.label} item={item} index={shopNavigation.length + i} onNavigate={close} />
              ))}
            </nav>

            <div className="mt-10 space-y-2 text-sm">
              <Link to="/account" onClick={close} className="block text-taupe">Account</Link>
              <Link to="/wishlist" onClick={close} className="block text-taupe">Wishlist</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}