import { getData } from '@/lib/api/api-client';
import { PaginatedResponse, ProductType } from '@/lib/types';

export type SearchProductsRequest = {
  search?: string;
  size?: string;
};

export const searchProductsFn = async (params: SearchProductsRequest) => {
  try {
    const response = await getData<PaginatedResponse<ProductType>>(
      '/api/products',
      {
        params: {
          ...(params?.search && { search: params.search }),
          page: '1',
          size: params.size || '20',
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
