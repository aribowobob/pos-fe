import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProductParams } from '@/lib/types';
import { updateProductFn } from '../fetchers/update-product';

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateProductParams) => {
      const { id, ...data } = params;

      return updateProductFn(id, data);
    },
    onSuccess: () => {
      // Invalidate products queries to refresh the product list
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'get-products',
      });

      // Invalidate product detail queries to refresh the product details
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'get-detail-product',
      });
    },
  });
};

export default useUpdateProduct;
