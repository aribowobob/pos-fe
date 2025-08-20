import { deleteData } from '@/lib/api/api-client';
import { APIResponse } from '@/lib/types';

export const clearPurchasesCartFn = async (
  storeId: number
): Promise<APIResponse<string>> => {
  try {
    const response = await deleteData<APIResponse<string>>(
      '/api/purchases/cart/clear',
      {
        params: { store_id: storeId },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
