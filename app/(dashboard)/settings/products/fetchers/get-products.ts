import { getData } from '@/lib/api/api-client';
import {
  GetProductsRequest,
  PaginatedResponse,
  ProductType,
} from '@/lib/types';

export const getProductsFn = async (params: GetProductsRequest) => {
  try {
    const response = await getData<PaginatedResponse<ProductType>>(
      '/api/products',
      {
        params: {
          ...(params?.search && { search: params.search }),
          page: params.page,
          size: params.size,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
