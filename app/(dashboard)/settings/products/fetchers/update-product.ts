import { putData } from '@/lib/api/api-client';
import { APIResponse, UpsertProductRequest } from '@/lib/types';

export const updateProductFn = async (
  productId: number,
  data: UpsertProductRequest
) => {
  try {
    const response = await putData<APIResponse<boolean>>(
      `/api/products/${productId}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
