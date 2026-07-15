import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { RequireAdmin } from "@/features/admin/auth/guards/RequireAdmin";
import { ProductForm } from "@/features/admin/products/components/ProductForm";
import { useProducts } from "@/features/admin/products/hooks/useProducts";
import { productService } from "@/features/admin/products/services/productService";
import type {
  CreateProductInput,
  Product,
} from "@/features/admin/products/types/product";
import { AdminLayout } from "@/features/admin/shared/components/AdminLayout";
import { AdminCard } from "@/features/admin/shared/components/AdminCard";

export const Route = createFileRoute("/admin/edit-product/$id")({
  component: AdminEditProductPage,
});

function AdminEditProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { updateProduct } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setLoading(true);
      setLoadError(null);

      try {
        const data = await productService.getProductById(id);

        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Supabase Error:", error);

        if (isMounted) {
          setLoadError("Failed to load product.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleUpdateProduct(
    updates: CreateProductInput,
  ) {
    try {
      await updateProduct({
        id,
        ...updates,
      });

      alert("Product updated successfully!");

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
        title="Edit Product"
        subtitle="Update the details for this product."
      >
        <AdminCard title="Product Information">
          {loading && (
            <p className="text-sm text-ink/70">
              Loading product...
            </p>
          )}

          {!loading && loadError && (
            <p className="text-sm text-red-600">
              {loadError}
            </p>
          )}

          {!loading && !loadError && product && (
            <ProductForm
              mode="edit"
              initialData={product}
              onSubmit={handleUpdateProduct}
            />
          )}
        </AdminCard>
      </AdminLayout>
    </RequireAdmin>
  );
}