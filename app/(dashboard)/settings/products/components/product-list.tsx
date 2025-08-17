'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PaginatedResponse, ProductType } from '@/lib/types';
import ProductItem from './product-item';

type ProductListProps = {
  response?: PaginatedResponse<ProductType>;
  isLoading?: boolean;
};

const ProductList = ({ response, isLoading }: ProductListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Handle pagination
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    router.push(`?${params.toString()}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!response || !response.data || response.data.items.length === 0) {
    return <div className="text-center py-4">Tidak ada produk ditemukan.</div>;
  }

  const totalPages = response.data.total_pages ?? 1;
  const currentPage = response.data.page ?? 1;

  return (
    <>
      <div className="flex flex-col gap-4">
        {(response?.data?.items ?? []).map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center py-4 sticky bottom-0 bg-white">
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
