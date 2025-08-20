import { putData } from '@/lib/api/api-client';
import {
  APIResponse,
  PurchasesCartItem,
  UpdatePurchasesCartItemRequest,
} from '@/lib/types';

export const updatePurchasesCartItemFn = async (
  itemId: number,
  data: UpdatePurchasesCartItemRequest
): Promise<APIResponse<PurchasesCartItem>> => {
  try {
    const response = await putData<
      APIResponse<PurchasesCartItem>,
      UpdatePurchasesCartItemRequest
    >(`/api/purchases/cart/${itemId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
