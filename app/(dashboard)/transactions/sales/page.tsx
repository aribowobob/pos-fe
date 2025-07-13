'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
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

import { SalesCartList } from './components';
import { useSalesCart } from './hooks/useSalesCart';

export default function Page() {
  const {
    cartItems,
    cartSummary,
    isLoading,
    isUpdatingItem,
    isDeletingItem,
    isClearingCart,
    isCreatingOrder,
    incrementQuantity,
    decrementQuantity,
    deleteItem,
    clearCart,
    createOrder,
  } = useSalesCart();

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
              <BreadcrumbPage>Penjualan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Transaksi Penjualan</h1>
          <Button asChild>
            <Link href="/transactions/sales/search">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Produk ke Keranjang
            </Link>
          </Button>
        </div>

        <SalesCartList
          items={cartItems}
          isLoading={isLoading}
          isUpdating={isUpdatingItem}
          isDeleting={isDeletingItem}
          isClearingCart={isClearingCart}
          isCreatingOrder={isCreatingOrder}
          cartSummary={cartSummary}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onDeleteItem={deleteItem}
          onClearCart={clearCart}
          onCreateOrder={createOrder}
        />
      </div>
    </DashboardLayout>
  );
}
