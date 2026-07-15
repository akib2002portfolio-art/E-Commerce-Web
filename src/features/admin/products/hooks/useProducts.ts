import { useCallback, useEffect, useState } from "react";

import { productService } from "../services/productService";
import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "../types/product";

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;

  createProduct: (
    product: CreateProductInput,
  ) => Promise<Product>;

  updateProduct: (
    product: UpdateProductInput,
  ) => Promise<Product>;

  deleteProduct: (
    id: string,
  ) => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (
      product: CreateProductInput,
    ): Promise<Product> => {
      const created = await productService.createProduct(product);

      setProducts((previous) => [
        created,
        ...previous,
      ]);

      return created;
    },
    [],
  );

  const updateProduct = useCallback(
    async (
      product: UpdateProductInput,
    ): Promise<Product> => {
      const updated = await productService.updateProduct(product);

      setProducts((previous) =>
        previous.map((item) =>
          item.id === updated.id ? updated : item,
        ),
      );

      return updated;
    },
    [],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      await productService.deleteProduct(id);

      setProducts((previous) =>
        previous.filter(
          (product) => product.id !== id,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    products,
    loading,
    error,
    refresh,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}