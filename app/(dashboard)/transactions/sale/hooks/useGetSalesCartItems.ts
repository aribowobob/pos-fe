import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/lib/store/user-store';
import { getSalesCartItemsFn } from '../fetchers/get-items';

export const useGetSalesCartItems = () => {
  const { user } = useUserStore();
  const storeId = user?.store?.id;

  return useQuery({
    queryKey: ['sales-cart', storeId],
    queryFn: () => {
      if (!storeId) throw new Error('Store ID is required');
      return getSalesCartItemsFn(storeId);
    },
    enabled: !!storeId,
  });
};
