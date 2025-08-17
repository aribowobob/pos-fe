import { postData } from '@/lib/api/api-client';
import { UpsertProductRequest, CreateProductResponse } from '@/lib/types';

export const createProductFn = async (
  data: UpsertProductRequest
): Promise<CreateProductResponse> => {
  try {
    const response = await postData<
      CreateProductResponse,
      UpsertProductRequest
    >('/api/products', data);

    return response;
  } catch (error) {
    throw error;
  }
};
