import { useQuery } from '@tanstack/react-query';
import { getSalesOrderDetailFn } from '../fetchers';

export const useSalesOrderDetail = (orderId: string) => {
  // Query to sales order details by order ID
  const { data, isLoading, error } = useQuery({
    queryKey: ['sales-order-detail', orderId],
    queryFn: () => {
      if (!orderId) throw new Error('Order ID is required');
      return getSalesOrderDetailFn(Number(orderId));
    },
    enabled: !!orderId,
  });

  return {
    orderDetail: data?.data,
    isLoading,
    error,
  };
};
