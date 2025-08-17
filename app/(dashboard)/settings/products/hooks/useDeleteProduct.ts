import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductFn } from '../fetchers/delete-product';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => deleteProductFn(productId),
    onSuccess: () => {
      // Invalidate products queries to refresh the product list
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'get-products',
      });
    },
  });
};

export default useDeleteProduct;
