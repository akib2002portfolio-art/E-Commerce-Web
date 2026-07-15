import { MOCK_PRODUCTS } from "../constants/mockProducts";
import { ProductRow } from "./ProductRow";

export function ProductsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-bone text-left text-xs uppercase tracking-[0.22em] text-taupe">
          <tr>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">SKU</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {MOCK_PRODUCTS.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}