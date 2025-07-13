import { putData } from '@/lib/api/api-client';
import { APIResponse, SalesCartItem, UpdateCartItemRequest } from '@/lib/types';

export const updateSalesCartItemFn = async (
  itemId: number,
  data: UpdateCartItemRequest
): Promise<APIResponse<SalesCartItem>> => {
  try {
    const response = await putData<
      APIResponse<SalesCartItem>,
      UpdateCartItemRequest
    >(`/api/sales/cart/${itemId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
