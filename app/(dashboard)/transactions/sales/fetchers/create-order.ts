import { postData } from '@/lib/api/api-client';
import {
  APIResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from '@/lib/types';

export const createSalesOrderFn = async (
  data: CreateOrderRequest
): Promise<APIResponse<CreateOrderResponse>> => {
  try {
    const response = await postData<
      APIResponse<CreateOrderResponse>,
      CreateOrderRequest
    >('/api/sales/orders', data);
    return response;
  } catch (error) {
    throw error;
  }
};
