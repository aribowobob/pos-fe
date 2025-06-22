'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EllipsisVertical, Menu } from 'lucide-react';
import {
  DropdownMenu,
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode SKU</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead className="text-right">Harga Jual</TableHead>
            <TableHead className="text-center">Stok</TableHead>
            <TableHead className="text-center">
              <Menu className="h-4 w-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(response?.data?.items ?? []).map(product => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {Number(product.sale_price).toLocaleString('id-ID')}
              </TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="cursor-pointer h-4 w-4" />
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
