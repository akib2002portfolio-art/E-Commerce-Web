export type ProductStatus =
  | "draft"
  | "published"
  | "out_of_stock";

export interface Product {
  id: string;

  name: string;
  sku: string;
  category: string;

  price: number;
  stock: number;

  description: string;

  status: ProductStatus;

  image_url: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  category: string;

  price: number;
  stock: number;

  description: string;

  status: ProductStatus;

  image_url?: string | null;
}

export interface UpdateProductInput
  extends Partial<CreateProductInput> {
  id: string;
}