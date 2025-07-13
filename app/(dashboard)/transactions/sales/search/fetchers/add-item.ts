import { postData } from '@/lib/api/api-client';
import { APIResponse, SalesCartItem, AddToCartRequest } from '@/lib/types';

export const addToSalesCartFn = async (
  data: AddToCartRequest
): Promise<APIResponse<SalesCartItem>> => {
  try {
    const response = await postData<
      APIResponse<SalesCartItem>,
      AddToCartRequest
    >('/api/sales/cart', data);
    return response;
  } catch (error) {
    throw error;
  }
};
