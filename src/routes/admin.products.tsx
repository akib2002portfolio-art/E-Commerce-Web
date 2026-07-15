import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { RequireAdmin } from "@/features/admin/auth/guards/RequireAdmin";
import { AdminLayout } from "@/features/admin/shared/components/AdminLayout";
import { ProductToolbar } from "@/features/admin/products/components/ProductToolbar";
import { ProductsTable } from "@/features/admin/products/components/ProductsTable";
import { ProductModal } from "@/features/admin/products/components/ProductModal";
import { ProductForm } from "@/features/admin/products/components/ProductForm";
import { MOCK_PRODUCTS } from "@/features/admin/products/constants/mockProducts";

export const Route = createFileRoute("/admin/products")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <RequireAdmin>
      <AdminLayout
        title="Products"
        subtitle="Manage your product catalog."
      >
        <ProductToolbar
          productCount={MOCK_PRODUCTS.length}
          onAddProduct={() => setShowCreateModal(true)}
        />

        <ProductsTable />

        <ProductModal
          open={showCreateModal}
          title="Add Product"
          onClose={() => setShowCreateModal(false)}
        >
          <ProductForm mode="create" />
        </ProductModal>
      </AdminLayout>
    </RequireAdmin>
  );
}