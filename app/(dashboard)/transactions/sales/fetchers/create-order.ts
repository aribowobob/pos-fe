import { postData } from '@/lib/api/api-client';
import {
  APIResponse,
  CreateOrderRequest,
  OrderDetailResponse,
} from '@/lib/types';

export const createSalesOrderFn = async (data: CreateOrderRequest) => {
  try {
    const response = await postData<
      APIResponse<OrderDetailResponse>,
      CreateOrderRequest
    >('/api/sales/orders', data);
    return response;
  } catch (error) {
    throw error;
  }
};
