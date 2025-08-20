import { getData } from '@/lib/api/api-client';
import { APIResponse, PurchasesOrderDetailResponse } from '@/lib/types';

export const getPurchasesOrderDetailFn = async (orderId: number) => {
  try {
    const response = await getData<APIResponse<PurchasesOrderDetailResponse>>(
      `/api/purchases/orders/${orderId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
