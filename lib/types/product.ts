export type GetProductsRequest = {
  search?: string;
  page: string;
  size: string;
};

export type ProductType = {
  id: number;
  sku: string;
  name: string;
  purchase_price: string;
  sale_price: string;
  company_id: number;
  unit_name: string;
  category_id: number;
  category_name?: string;
  stock?: number;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
};
