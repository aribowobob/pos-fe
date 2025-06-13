import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchData, postData, putData, deleteData } from './api-client';
import type { Product, ProductFormInput } from '../types/product';

// Product List
export const useProducts = (params?: { categoryId?: number, search?: string }) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchData<Product[]>('/products', { params }),
  });
};

// Single Product
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchData<Product>(`/products/${id}`),
    enabled: !!id,
  });
};

// Create Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ProductFormInput) => postData<Product>('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Update Product
export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ProductFormInput) => putData<Product>(`/products/${id}`, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
};

// Delete Product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteData(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
