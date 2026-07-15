import { createFileRoute } from "@tanstack/react-router";

import { RequireAdmin } from "@/features/admin/auth/guards/RequireAdmin";
import { AdminLayout } from "@/features/admin/shared/components/AdminLayout";
import { AdminCard } from "@/features/admin/shared/components/AdminCard";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  return (
    <RequireAdmin>
      <AdminLayout
        title="Dashboard"
        subtitle="Welcome back to BD Collection CMS."
      >
        <div className="space-y-8">
          {/* Statistics */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <AdminCard
              title="Products"
              value="0"
              description="Products in catalog"
            />

            <AdminCard
              title="Orders"
              value="0"
              description="Pending orders"
            />

            <AdminCard
              title="Customers"
              value="0"
              description="Registered customers"
            />

            <AdminCard
              title="Revenue"
              value="৳0"
              description="Today's revenue"
            />
          </section>

          {/* Dashboard Content */}
          <section className="grid gap-6 lg:grid-cols-2">
            <AdminCard title="Quick Actions">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="border border-hairline px-4 py-2 text-xs uppercase tracking-[0.22em] transition hover:bg-ink hover:text-canvas"
                >
                  Add Product
                </button>

                <button
                  type="button"
                  className="border border-hairline px-4 py-2 text-xs uppercase tracking-[0.22em] transition hover:bg-ink hover:text-canvas"
                >
                  View Orders
                </button>

                <button
                  type="button"
                  className="border border-hairline px-4 py-2 text-xs uppercase tracking-[0.22em] transition hover:bg-ink hover:text-canvas"
                >
                  Homepage CMS
                </button>
              </div>
            </AdminCard>

            <AdminCard
              title="Recent Activity"
              description="No recent activity yet. Your latest product updates, orders, and customer activities will appear here."
            />
          </section>
        </div>
      </AdminLayout>
    </RequireAdmin>
  );
}