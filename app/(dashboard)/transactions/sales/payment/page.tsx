'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useSalesCart } from '../hooks';
import {
  CreateOrderForm,
  PrintSalesTransaction,
  SalesCartItems,
} from './components';

export default function Page() {
  const { cartItems, cartSummary, isLoading, createOrder } = useSalesCart();

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
              <BreadcrumbPage>Pembayaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Pembayaran Penjualan</h1>

          <PrintSalesTransaction />
        </div>

        <div className="space-y-4">
          {/* Order Summary */}
          <SalesCartItems cartItems={cartItems} cartSummary={cartSummary} />

          {/* Create Order Form */}
          <CreateOrderForm
            cartSummary={cartSummary}
            isLoading={isLoading}
            createOrder={createOrder}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
