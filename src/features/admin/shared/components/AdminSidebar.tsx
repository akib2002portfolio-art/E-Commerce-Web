import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
    href: "/admin/dashboard",
  },
  {
    label: "Products",
    icon: Package,
    active: false,
    href: "/admin/products",
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    active: false,
    href: "/admin/orders",
  },
  {
    label: "Customers",
    icon: Users,
    active: false,
    href: "/admin/customers",
  },
  {
    label: "Homepage",
    icon: Home,
    active: false,
    href: "/admin/homepage",
  },
  {
    label: "Settings",
    icon: Settings,
    active: false,
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-hairline bg-canvas">
      {/* Logo */}
      <div className="border-b border-hairline px-7 py-7">
        <h1 className="font-display text-2xl text-ink">
          BD <span className="italic">Collection</span>
        </h1>

        <p className="mt-1 text-sm text-taupe">
          Content Management System
        </p>

        <p className="eyebrow mt-3 !text-taupe">
          Administrator
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-7">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-xs uppercase tracking-[0.22em] transition-all duration-200",
              active
                ? "bg-ink text-canvas shadow-sm"
                : "text-taupe hover:bg-bone hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />

            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-hairline px-7 py-6">
        <p className="font-medium text-ink">
          Administrator
        </p>

        <p className="mt-1 text-sm text-taupe">
          Owner
        </p>

        <button
          type="button"
          className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-taupe transition-colors hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />

          Logout
        </button>
      </div>
    </aside>
  );
}