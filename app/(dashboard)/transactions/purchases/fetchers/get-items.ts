import { getData } from '@/lib/api/api-client';
import { APIResponse, PurchasesCartItem } from '@/lib/types';

export const getPurchasesCartItemsFn = async (
  storeId: number
): Promise<APIResponse<PurchasesCartItem[]>> => {
  try {
    const response = await getData<APIResponse<PurchasesCartItem[]>>(
      '/api/purchases/cart',
      {
        params: { store_id: storeId },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
