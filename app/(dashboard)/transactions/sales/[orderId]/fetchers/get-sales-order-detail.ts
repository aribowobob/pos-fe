import { getData } from '@/lib/api/api-client';
import { APIResponse, OrderDetailResponse } from '@/lib/types';

export const getSalesOrderDetailFn = async (orderId: number) => {
  try {
    const response = await getData<APIResponse<OrderDetailResponse>>(
      `/api/sales/orders/${orderId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
