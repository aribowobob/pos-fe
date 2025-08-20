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

import { usePurchasesCart } from '../hooks';
import {
  CreatePurchaseOrderForm,
  PrintPurchasesTransaction,
  PurchasesCartItems,
} from './components';

export default function Page() {
  const { cartItems, cartSummary, isCreatingOrder, createOrder } =
    usePurchasesCart();

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
              <BreadcrumbLink href="/transactions/purchases">
                Pembelian
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pembayaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Pembayaran Pembelian</h1>

          <PrintPurchasesTransaction />
        </div>

        <div className="space-y-4">
          {/* Order Summary */}
          <PurchasesCartItems cartItems={cartItems} cartSummary={cartSummary} />

          {/* Create Order Form */}
          <CreatePurchaseOrderForm
            cartSummary={cartSummary}
            isLoading={isCreatingOrder}
            createOrder={createOrder}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
