import { getData } from '@/lib/api/api-client';
import { APIResponse, SalesCartItem } from '@/lib/types';

export const getSalesCartItemsFn = async (
  storeId: number
): Promise<APIResponse<SalesCartItem[]>> => {
  try {
    const response = await getData<APIResponse<SalesCartItem[]>>(
      '/api/sales/cart',
      {
        params: { store_id: storeId },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
