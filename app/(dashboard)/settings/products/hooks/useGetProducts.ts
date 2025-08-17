import { useQuery } from '@tanstack/react-query';
import { GetProductsRequest } from '@/lib/types';
import { getProductsFn } from '../fetchers/get-products';

const useGetProducts = (params: GetProductsRequest) => {
  return useQuery({
    queryKey: ['get-products', params],
    queryFn: () => getProductsFn(params),
    staleTime: 1000 * 60 * 1, // 1 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetProducts;
