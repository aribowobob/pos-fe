import { useState } from 'react';
import Axios from 'axios';
import { IProductProps } from '@types';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

const API_URL = '/api/products'; // Ganti dengan URL API Anda

const useProducts = () => {
  const [data, setData] = useState<IProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all products
  type FetchDataParams = {
    id?: number;
    nama_produk?: string;
  };

  // Fetch data function
  const fetchData = async (params?: FetchDataParams) => {
    setLoading(true);
    try {
      // Build query string from params
      const query = params
        ? new URLSearchParams(params as Record<string, string>).toString()
        : '';

      const response = await Axios.get<ApiResponse<IProductProps[]>>(
        `${API_URL}${query ? `?${query}` : ''}`
      );
      const { code, message, data } = response.data;

      if (code === 200) {
        setData(data);
        setError(null);
        return data;
      } else {
        setError(message || 'Failed to fetch products');
        return [];
      }
    } catch (err) {
      setError('An error occurred while fetching products');
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (newProduct: IProductProps) => {
    setLoading(true);
    try {
      const response = await Axios.post<ApiResponse<IProductProps>>(
        API_URL,
        newProduct
      );
      const { code, message, data } = response.data;

      if (code === 200) {
        setData(prevData => [...prevData, data]);
        setError(null);
      } else {
        setError(message || 'Failed to add product');
      }
    } catch (err) {
      setError('An error occurred while adding product');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing product
  const updateProduct = async (updatedProduct: IProductProps) => {
    setLoading(true);
    try {
      const response = await Axios.put<ApiResponse<IProductProps>>(
        `${API_URL}?id=${updatedProduct.id}`,
        updatedProduct
      );
      const { code, message, data } = response.data;

      if (code === 200) {
        setData(prevData =>
          prevData.map(product => (product.id === data.id ? data : product))
        );
        setError(null);
      } else {
        setError(message || 'Failed to update product');
      }
    } catch (err) {
      setError('An error occurred while updating product');
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      const response = await Axios.delete<ApiResponse<null>>(
        `${API_URL}?id=${id}`
      );
      const { code, message } = response.data;

      if (code === 200) {
        setData(prevData => prevData.filter(product => product.id !== id));
        setError(null);
      } else {
        setError(message || 'Failed to delete product');
      }
    } catch (err) {
      setError('An error occurred while deleting product');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    fetchData,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
