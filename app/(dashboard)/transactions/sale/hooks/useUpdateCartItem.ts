import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import { UpdateCartItemRequest } from '@/lib/types';
import { updateSalesCartItemFn } from '../fetchers/update-item';

export const useUpdateCartItem = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const storeId = user?.store?.id;

  return useMutation({
    mutationFn: ({
      itemId,
      update,
    }: {
      itemId: number;
      update: UpdateCartItemRequest;
    }) => updateSalesCartItemFn(itemId, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success('Item berhasil diperbarui');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });
};
