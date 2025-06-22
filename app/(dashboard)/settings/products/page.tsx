'use client';

import { useSearchParams } from 'next/navigation';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Filter, ProductList } from './components';
import useGetProducts from './hooks/useGetProducts';

const SIZE = '20';

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // Get current search params
  const currentSearch = searchParams.get('search') || '';
  const currentPage = searchParams.get('page') || '1';

  const { data, isLoading } = useGetProducts({
    search: currentSearch,
    page: currentPage,
    size: SIZE,
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/settings">Pengaturan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-semibold">Pengaturan Produk</h1>

        <Filter />

        <ProductList response={data} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
