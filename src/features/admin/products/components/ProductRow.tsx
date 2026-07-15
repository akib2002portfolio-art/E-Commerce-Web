import type { Product } from "../types/product";
import { ProductStatusBadge } from "./ProductStatusBadge";

interface ProductRowProps {
  product: Product;
}

export function ProductRow({
  product,
}: ProductRowProps) {
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

      <td className="px-6 py-4 text-right">
        <button className="text-sm text-ink hover:underline">
          Edit
        </button>
      </td>
    </tr>
  );
}