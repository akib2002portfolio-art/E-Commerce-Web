import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { RequireAdmin } from "@/features/admin/auth/guards/RequireAdmin";
import { ProductForm } from "@/features/admin/products/components/ProductForm";
import { useProducts } from "@/features/admin/products/hooks/useProducts";
import type { CreateProductInput } from "@/features/admin/products/types/product";
import { AdminLayout } from "@/features/admin/shared/components/AdminLayout";
import { AdminCard } from "@/features/admin/shared/components/AdminCard";

export const Route = createFileRoute("/admin/new-product")({
  component: AdminNewProductPage,
});

function AdminNewProductPage() {
  const navigate = useNavigate();

  const { createProduct } = useProducts();

  async function handleCreateProduct(
    product: CreateProductInput,
  ) {
    try {
      await createProduct(product);

      alert("Product created successfully!");

      navigate({
        to: "/admin/products",
      });
    } catch (error) {
      console.error("Supabase Error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(JSON.stringify(error));
      }
    }
  }

  return (
    <RequireAdmin>
      <AdminLayout
        title="Add Product"
        subtitle="Create a new product for your catalog."
      >
        <AdminCard title="Product Information">
          <ProductForm
            mode="create"
            onSubmit={handleCreateProduct}
          />
        </AdminCard>
      </AdminLayout>
    </RequireAdmin>
  );
}