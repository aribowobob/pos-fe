import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import { addToSalesCartFn } from '../fetchers/add-item';

export const useAddToCart = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const storeId = user?.store?.id;

  return useMutation({
    mutationFn: addToSalesCartFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success('Item berhasil ditambahkan ke keranjang');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });
};
