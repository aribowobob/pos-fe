'use client';

import { useState } from 'react';
import { ChevronRightCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
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

export default function Page() {
  const { back } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: productsData, isLoading } = useSearchProducts({
    search: searchQuery,
    size: '20',
  });

  const { addProductToCart, isLoading: isAddingToCart } =
    useAddToCartFromSearch();

  const products = productsData?.data?.items || [];

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
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
        </div>
      </div>
    </DashboardLayout>
  );
}
