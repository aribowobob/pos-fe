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

import { SalesCartList, AddToCartDialog } from './components';
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
    addItem,
    incrementQuantity,
    decrementQuantity,
    deleteItem,
    clearCart,
    createOrder,
    isAddingItem,
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
          <AddToCartDialog onAddToCart={addItem} isLoading={isAddingItem} />
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
