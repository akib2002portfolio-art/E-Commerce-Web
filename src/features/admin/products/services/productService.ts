import { MOCK_PRODUCTS } from "../constants/mockProducts";
import type { Product } from "../types/product";

class ProductService {
  async getProducts(): Promise<Product[]> {
    return Promise.resolve(MOCK_PRODUCTS);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return Promise.resolve(
      MOCK_PRODUCTS.find((product) => product.id === id),
    );
  }
}
export const productService = new ProductService();