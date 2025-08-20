import { useQuery } from '@tanstack/react-query';
import { getPurchasesOrderDetailFn } from '../fetchers';

export const usePurchasesOrderDetail = (orderId: string) => {
  // Query to purchases order details by order ID
  const { data, isLoading, error } = useQuery({
    queryKey: ['purchases-order-detail', orderId],
    queryFn: () => {
      if (!orderId) throw new Error('Order ID is required');
      return getPurchasesOrderDetailFn(Number(orderId));
    },
    enabled: !!orderId,
  });

  return {
    orderDetail: data?.data,
    isLoading,
    error,
  };
};
