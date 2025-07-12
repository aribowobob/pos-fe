import { getData } from '@/lib/api/api-client';
import { PaginatedResponse, ProductCategoryType } from '@/lib/types';

export const getProductCategoriesFn = async () => {
  try {
    const response = await getData<PaginatedResponse<ProductCategoryType>>(
      '/api/products/categories'
    );

    return response;
  } catch (error) {
    throw error;
  }
};
