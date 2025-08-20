import { postData } from '@/lib/api/api-client';
import {
  APIResponse,
  CreatePurchasesOrderRequest,
  CreatePurchasesOrderResponse,
} from '@/lib/types';

export const createPurchasesOrderFn = async (
  data: CreatePurchasesOrderRequest
) => {
  try {
    const response = await postData<
      APIResponse<CreatePurchasesOrderResponse>,
      CreatePurchasesOrderRequest
    >('/api/purchases/orders', data);
    return response;
  } catch (error) {
    throw error;
  }
};
