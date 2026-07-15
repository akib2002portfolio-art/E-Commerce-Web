import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { RequireAdmin } from "@/features/admin/auth/guards/RequireAdmin";
import { useProducts } from "@/features/admin/products/hooks/useProducts";
import { ProductsTable } from "@/features/admin/products/components/ProductsTable";
import { ProductToolbar } from "@/features/admin/products/components/ProductToolbar";
import { AdminLayout } from "@/features/admin/shared/components/AdminLayout";

export const Route = createFileRoute("/admin/products")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
    deleteProduct,
  } = useProducts();

  return (
    <RequireAdmin>
      <AdminLayout
        title="Products"
        subtitle="Manage your product catalog."
      >
        <ProductToolbar
          productCount={products.length}
          onAddProduct={() =>
            navigate({
              to: "/admin/new-product",
            })
          }
        />

        <ProductsTable
          products={products}
          loading={loading}
          error={error}
          onDelete={deleteProduct}
        />
      </AdminLayout>
    </RequireAdmin>
  );
}