import { deleteData } from '@/lib/api/api-client';
import { APIResponse } from '@/lib/types';

export const deleteSalesCartItemFn = async (
  itemId: number
): Promise<APIResponse<string>> => {
  try {
    const response = await deleteData<APIResponse<string>>(
      `/api/sales/cart/${itemId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
