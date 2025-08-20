import { deleteData } from '@/lib/api/api-client';
import { APIResponse } from '@/lib/types';

export const deletePurchasesCartItemFn = async (
  itemId: number
): Promise<APIResponse<string>> => {
  try {
    const response = await deleteData<APIResponse<string>>(
      `/api/purchases/cart/${itemId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
