'use client';

import { useQuery } from '@tanstack/react-query';
import { SearchProductsRequest, searchProductsFn } from '../fetchers';

const useSearchProducts = (params: SearchProductsRequest) => {
  return useQuery({
    queryKey: ['search-products', params],
    queryFn: () => searchProductsFn(params),
    enabled: !!params.search && params.search.length > 0,
    staleTime: 1000 * 60 * 1, // 1 minute
    refetchOnWindowFocus: false,
  });
};

export default useSearchProducts;
