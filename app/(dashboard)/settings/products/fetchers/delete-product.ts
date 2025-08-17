import { deleteData } from '@/lib/api/api-client';
import { APIResponse } from '@/lib/types';

export const deleteProductFn = async (productId: number) => {
  try {
    const response = await deleteData<APIResponse<boolean>>(
      `/api/products/${productId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
