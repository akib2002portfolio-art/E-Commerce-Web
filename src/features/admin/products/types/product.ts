export type ProductStatus = "draft" | "published" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}