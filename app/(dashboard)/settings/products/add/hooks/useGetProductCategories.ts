import { useQuery } from '@tanstack/react-query';
import { getProductCategoriesFn } from '../fetchers/get-product-categories';

const useGetProductCategories = () => {
  return useQuery({
    queryKey: ['get-product-categories'],
    queryFn: getProductCategoriesFn,
    staleTime: 1000 * 60 * 5, // 5 minutes (categories don't change often)
    refetchOnWindowFocus: false,
  });
};

export default useGetProductCategories;