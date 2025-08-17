import { getData } from '@/lib/api/api-client';
import { APIResponse, ProductType } from '@/lib/types';

export const getDetailProductFn = async (id: number) => {
  try {
    const response = await getData<APIResponse<ProductType>>(
      `/api/products/${id}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};
