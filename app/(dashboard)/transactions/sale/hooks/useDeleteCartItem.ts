import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import { deleteSalesCartItemFn } from '../fetchers/delete-item';

export const useDeleteCartItem = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const storeId = user?.store?.id;

  return useMutation({
    mutationFn: deleteSalesCartItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success('Item berhasil dihapus dari keranjang');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });
};
