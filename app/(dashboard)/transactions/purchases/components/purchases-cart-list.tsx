import { Separator } from '@/components/ui/separator';
import { PurchasesCartItem, PurchasesCartSummaryType } from '@/lib/types';

import { EmptyCartState } from './empty-cart-state';
import { PurchasesCartItemCard } from './purchases-cart-item-card';
import { PurchasesCartSummary } from './purchases-cart-summary';

interface PurchasesCartListProps {
  cartItems: PurchasesCartItem[];
  cartSummary: PurchasesCartSummaryType;
  isLoading?: boolean;
  isUpdatingItem?: boolean;
  isDeletingItem?: boolean;
  isClearingCart?: boolean;
  onIncrementQuantity: (item: PurchasesCartItem) => void;
  onDecrementQuantity: (item: PurchasesCartItem) => void;
  onDeleteItem: (itemId: number) => void;
  onClearCart: () => void;
  onEditItem: (item: PurchasesCartItem | null) => void;
}

export const PurchasesCartList = ({
  cartItems,
  cartSummary,
  isLoading = false,
  isUpdatingItem = false,
  isDeletingItem = false,
  isClearingCart = false,
  onIncrementQuantity,
  onDecrementQuantity,
  onDeleteItem,
  onClearCart,
  onEditItem,
}: PurchasesCartListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={`purchases-cart-item-loader-${i}`}
            className="animate-pulse"
          >
            <div className="border border-border rounded-sm p-4 bg-white flex flex-col gap-4">
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-1" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="flex gap-4 justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div className="h-7 bg-gray-200 rounded w-32" />
                <div className="flex items-center gap-4">
                  <div className="w-[38px] h-8 bg-gray-200 rounded" />
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                    <div className="w-12 h-8 bg-gray-200 rounded" />
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="space-y-4">
      {/* Cart Items */}
      {cartItems.map(item => (
        <PurchasesCartItemCard
          key={item.id}
          item={item}
          onIncrement={onIncrementQuantity}
          onDecrement={onDecrementQuantity}
          onDelete={onDeleteItem}
          onEditItem={onEditItem}
          isUpdating={isUpdatingItem}
          isDeleting={isDeletingItem}
        />
      ))}

      {/* Cart Summary */}
      <PurchasesCartSummary
        summary={cartSummary}
        onClearCart={onClearCart}
        isClearingCart={isClearingCart}
      />
    </div>
  );
};
