'use client';

import { useParams, useSearchParams, notFound } from 'next/navigation';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useSalesOrderDetail } from './hooks';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function Page() {
  const params = useParams() as { orderId: string };
  const { orderId } = params;
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const { orderDetail, isLoading, error } = useSalesOrderDetail(orderId);

  if (isLoading) {
    return null;
  }

  if (error) {
    notFound();
  }

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
              <BreadcrumbPage>
                {orderDetail?.order?.order_number}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Rincian Penjualan</h1>
          <Button variant="secondary">
            <Printer className="w-4 h-4" />
            Cetak Struk
          </Button>
        </div>

        {success && (
          <div className="text-green-600 bg-green-100 p-4 rounded-md">
            Transaksi penjualan berhasil disimpan!
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
