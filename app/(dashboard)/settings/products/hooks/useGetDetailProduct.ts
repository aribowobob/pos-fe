import { useQuery } from '@tanstack/react-query';
import { getDetailProductFn } from '../fetchers/get-detail-product';

const useGetDetailProduct = (id: number) => {
  return useQuery({
    queryKey: ['get-detail-product', id],
    queryFn: () => getDetailProductFn(id),
    staleTime: 1000 * 60 * 1, // 1 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetDetailProduct;
