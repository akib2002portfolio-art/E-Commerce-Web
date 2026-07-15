import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { shopNavigation, infoNavigation, brand } from "@/data/menus";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useUI } from "@/stores/ui";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const cartCount = useCart((s) => s.lines.reduce((a, l) => a + l.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const openCart = useCart((s) => s.open);
  const setSearchOpen = useUI((s) => s.setSearchOpen);
  const setMobileOpen = useUI((s) => s.setMobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !hoveredMenu;
  const activeMenuItem = [...shopNavigation, ...infoNavigation].find((m) => m.label === hoveredMenu);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        transparent ? "bg-transparent text-canvas": "bg-canvas/85 text-ink backdrop-blur-md",
      )}
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className="container-luxe grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 md:h-20">
        <button
          type="button"
          className="lg:hidden -ml-2 p-2"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="font-display text-xl md:text-2xl leading-none tracking-tight justify-self-start lg:justify-self-start">
          {brand.prefix} <span className="italic">{brand.suffix}</span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-8 text-[0.72rem] uppercase tracking-[0.22em]">
          {shopNavigation.map((item) => (
            <div key={item.label} onMouseEnter={() => setHoveredMenu(item.label)} className="py-6">
              <Link
                to={item.href}
                className="relative py-1 transition-opacity hover:opacity-70"
                activeProps={{ className: "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-current" }}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <span aria-hidden className="h-3 w-px bg-current opacity-20" />
          {infoNavigation.map((item) => (
            <div key={item.label} onMouseEnter={() => setHoveredMenu(item.label)} className="py-6">
              <Link
                to={item.href}
                className="relative py-1 transition-opacity hover:opacity-70"
                activeProps={{ className: "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-current" }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1 justify-self-end">
          <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 transition-opacity hover:opacity-70">
            <Search className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 transition-opacity hover:opacity-70">
            <Heart style={{ width: 18, height: 18 }} />
            {wishCount > 0 && <span className="absolute -right-0 -top-0 rounded-full bg-sienna px-1 text-[0.55rem] text-canvas">{wishCount}</span>}
          </Link>
          <Link to="/account" aria-label="Account" className="hidden md:inline-flex p-2 transition-opacity hover:opacity-70">
            <User style={{ width: 18, height: 18 }} />
          </Link>
          <button type="button" aria-label="Cart" onClick={openCart} className="relative p-2 transition-opacity hover:opacity-70">
            <ShoppingBag style={{ width: 18, height: 18 }} />
            {cartCount > 0 && <span className="absolute -right-0 -top-0 rounded-full bg-sienna px-1 text-[0.55rem] text-canvas">{cartCount}</span>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {hoveredMenu && activeMenuItem?.children && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full hidden lg:block border-t border-hairline bg-canvas/95 text-ink backdrop-blur-md"
          >
            <div className="container-luxe grid grid-cols-4 gap-10 py-10">
              <div>
                <p className="eyebrow">{hoveredMenu}</p>
                <p className="mt-3 font-display text-2xl">{activeMenuItem.label}</p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-2">
                {activeMenuItem.children?.map((c) => (
                  <Link key={c.label} to={c.href} className="group flex items-baseline justify-between border-b border-hairline py-2 text-sm transition-colors hover:text-sienna">
                    <span>{c.label}</span>
                    <span className="text-taupe transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                ))}
              </div>
              <div className="hidden md:block border-l border-hairline pl-10">
                <p className="eyebrow">{brand.prefix} {brand.suffix}</p>
                <ul className="mt-4 space-y-2 text-sm text-taupe">
                  <li>New Arrival</li>
                  <li>Premium Quality</li>
                  <li>Coming Soon</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}