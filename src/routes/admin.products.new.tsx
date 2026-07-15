import { createFileRoute } from "@tanstack/react-router";

import { RequireAdmin } from "@/features/admin/auth/guards/RequireAdmin";
import { AdminLayout } from "@/features/admin/shared/components/AdminLayout";
import { AdminCard } from "@/features/admin/shared/components/AdminCard";
import { ProductForm } from "@/features/admin/products/components/ProductForm";

export const Route = createFileRoute("/admin/products/new")({
  component: AdminNewProductPage,
});

function AdminNewProductPage() {
  return (
    <RequireAdmin>
      <AdminLayout
        title="Add Product"
        subtitle="Create a new product for your catalog."
      >
        <AdminCard title="Product Information">
          <ProductForm mode="create" />
        </AdminCard>
      </AdminLayout>
    </RequireAdmin>
  );
}