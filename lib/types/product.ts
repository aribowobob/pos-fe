export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  description?: string;
  categoryId?: number;
  category?: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description?: string;
}

export interface ProductFormInput {
  name: string;
  sku: string;
  price: number;
  stock: number;
  description?: string;
  categoryId?: number;
}
