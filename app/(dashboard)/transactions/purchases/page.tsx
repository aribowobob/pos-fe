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

import { EditItemDialog, PurchasesCartList } from './components';
import { usePurchasesCart } from './hooks/usePurchasesCart';

export default function Page() {
  const {
    cartItems,
    cartSummary,
    editItem,
    isLoading,
    isUpdatingItem,
    isDeletingItem,
    isClearingCart,
    incrementQuantity,
    decrementQuantity,
    deleteItem,
    clearCart,
    setEditItem,
    updateItem,
  } = usePurchasesCart();

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
              <BreadcrumbPage>Pembelian</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Transaksi Pembelian</h1>
          <Button asChild>
            <Link href="/transactions/purchases/search">
              <Plus className="h-4 w-4" />
              Tambah Produk ke Keranjang
            </Link>
          </Button>
        </div>

        <PurchasesCartList
          cartItems={cartItems}
          cartSummary={cartSummary}
          isLoading={isLoading}
          isUpdatingItem={isUpdatingItem}
          isDeletingItem={isDeletingItem}
          isClearingCart={isClearingCart}
          onIncrementQuantity={incrementQuantity}
          onDecrementQuantity={decrementQuantity}
          onDeleteItem={deleteItem}
          onClearCart={clearCart}
          onEditItem={setEditItem}
        />

        <EditItemDialog
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={updateItem}
          isUpdating={isUpdatingItem}
        />
      </div>
    </DashboardLayout>
  );
}
