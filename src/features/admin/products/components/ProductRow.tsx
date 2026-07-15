import { useNavigate } from "@tanstack/react-router";

import type { Product } from "../types/product";
import { ProductStatusBadge } from "./ProductStatusBadge";

interface ProductRowProps {
  product: Product;
  onDelete: (id: string) => Promise<void>;
}

export function ProductRow({
  product,
  onDelete,
}: ProductRowProps) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate({
      to: "/admin/edit-product/$id",
      params: {
        id: product.id,
      },
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${product.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await onDelete(product.id);

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Supabase Error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete product.");
      }
    }
  }

  return (
    <tr className="border-b border-hairline transition hover:bg-bone">
      <td className="px-6 py-4 font-medium text-ink">
        {product.name}
      </td>

      <td className="px-6 py-4">
        {product.category}
      </td>

      <td className="px-6 py-4">
        {product.sku}
      </td>

      <td className="px-6 py-4">
        ৳{product.price}
      </td>

      <td className="px-6 py-4">
        {product.stock}
      </td>

      <td className="px-6 py-4">
        <ProductStatusBadge
          status={product.status}
        />
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm text-ink transition hover:underline"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-sm text-red-600 transition hover:underline"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}