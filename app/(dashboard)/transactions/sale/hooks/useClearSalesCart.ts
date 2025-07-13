import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import { clearSalesCartFn } from '../fetchers/clear-sales-cart';

export const useClearSalesCart = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const storeId = user?.store?.id;

  return useMutation({
    mutationFn: () => {
      if (!storeId) throw new Error('Store ID is required');
      return clearSalesCartFn(storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success('Keranjang berhasil dikosongkan');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });
};
