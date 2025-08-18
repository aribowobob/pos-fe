'use client';

import { useState, useEffect } from 'react';
import { ChevronRightCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Pagination } from '@/components/pagination';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { ProductSearchInput, ProductSearchList } from './components';
import { useSearchProducts, useAddToCartFromSearch } from './hooks';
import { useUserStore } from '@/lib/store/user-store';

export default function Page() {
  const { back } = useRouter();
  const { user } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: productsData, isLoading } = useSearchProducts({
    search: searchQuery,
    page: currentPage,
    store_id: user?.store?.id,
  });
  const { data } = productsData ?? {};
  const { items: products = [], total_pages, page } = data ?? {};

  const { addProductToCart, isLoading: isAddingToCart } =
    useAddToCartFromSearch();

  useEffect(() => {
    if (page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/transactions">Transaksi</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/transactions/sales">
                Penjualan
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pencarian Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Pencarian Produk</h1>
          <Button variant="outline" onClick={back}>
            Kembali
            <ChevronRightCircleIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <ProductSearchInput onSearchChange={handleSearchChange} />

          <ProductSearchList
            products={products}
            isLoading={isLoading}
            onAddToCart={addProductToCart}
            isAddingToCart={isAddingToCart}
            searchQuery={searchQuery}
          />

          <Pagination
            page={page ?? 1}
            totalPages={total_pages ?? 1}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
