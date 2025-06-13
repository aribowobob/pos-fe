import { BaseResponseType } from './common.types';

export type ProductType = {
  id: number;
  sku: string;
  name: string;
  purchase_price?: number;
  sale_price: number;
  unit_name: string;
  stock?: number;
};
export interface SearchProductResponseType
  extends BaseResponseType<ProductType[]> {}

export interface SearchProductResponseByIdType
  extends BaseResponseType<ProductType> {}
/* export interface IProductProps {
  id: number;
  kode_sku: string;
  nama_produk: string;
  harga_beli: string;
  harga_jual: string;
  nama_satuan: string;
}

export interface IProductProps2 {
  kode_sku: string;
  nama_produk: string;
  harga_beli: string;
  harga_jual: string;
  nama_satuan: string;
}

export const productData: IProductProps = {
  id: 0,
  kode_sku: '',
  nama_produk: '',
  harga_beli: '',
  harga_jual: '',
  nama_satuan: '',
}; */

export interface IAddProductProps {
  title?: string;
  isProductFormDisplayed: boolean;
  setIsProductFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}
