import { postData } from '@/lib/api/api-client';
import {
  APIResponse,
  PurchasesCartItem,
  AddToPurchasesCartRequest,
} from '@/lib/types';

export const addToPurchasesCartFn = async (
  data: AddToPurchasesCartRequest
): Promise<APIResponse<PurchasesCartItem>> => {
  try {
    const response = await postData<
      APIResponse<PurchasesCartItem>,
      AddToPurchasesCartRequest
    >('/api/purchases/cart', data);
    return response;
  } catch (error) {
    throw error;
  }
};
