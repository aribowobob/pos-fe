import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProductRequest } from '@/lib/types';
import { createProductFn } from '../fetchers/create-product';

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProductFn(data),
    onSuccess: () => {
      // Invalidate products queries to refresh the product list
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'get-products',
      });
    },
  });
};

export default useCreateProduct;
