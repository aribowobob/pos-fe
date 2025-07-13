import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import { createSalesOrderFn } from '../fetchers/create-order';

export const useCreateSalesOrder = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const storeId = user?.store?.id;

  return useMutation({
    mutationFn: createSalesOrderFn,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success(
        `Order berhasil dibuat dengan nomor: ${data.data.order.order_number}`
      );
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });
};
