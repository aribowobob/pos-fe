import { postData } from '@/lib/api/api-client';
import { CreateProductRequest, CreateProductResponse } from '@/lib/types';

export const createProductFn = async (
  data: CreateProductRequest
): Promise<CreateProductResponse> => {
  try {
    const response = await postData<
      CreateProductResponse,
      CreateProductRequest
    >('/api/products', data);

    return response;
  } catch (error) {
    throw error;
  }
};
