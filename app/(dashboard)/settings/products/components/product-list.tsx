'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PaginatedResponse, ProductType } from '@/lib/types';

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
          <div key={product.id} className="border border-border rounded-sm p-4">
            <div className="flex items-start justify-between">
              <p className="flex flex-col">
                <span className="text-muted-foreground text-xs">{`SKU: ${product.sku}`}</span>
                <span className="font-medium">{product.name}</span>
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem>
                    <Edit />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">
                  {Number(product.purchase_price).toLocaleString('id-ID')}
                </span>

                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                  {Number(product.sale_price).toLocaleString('id-ID')}
                </span>
              </div>

              <p className="flex items-center gap-1">
                <span className="font-medium">Stok:</span>
                <span className="text-muted-foreground">
                  {product?.stock ?? 0} {product.unit_name}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </>
  );
};

export default ProductList;
