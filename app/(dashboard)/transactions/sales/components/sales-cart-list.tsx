import { Separator } from '@/components/ui/separator';
import { SalesCartItem, SalesCartSummaryType } from '@/lib/types';

import { EmptyCartState } from './empty-cart-state';
import { SalesCartItemCard } from './sales-cart-item-card';
import { SalesCartSummary } from './sales-cart-summary';

interface SalesCartListProps {
  items: SalesCartItem[];
  isLoading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isClearingCart?: boolean;
  cartSummary: SalesCartSummaryType;
  onIncrement: (item: SalesCartItem) => void;
  onDecrement: (item: SalesCartItem) => void;
  onDeleteItem: (itemId: number) => void;
  onClearCart: () => void;
  onEditItem: (item: SalesCartItem | null) => void;
}

export const SalesCartList = ({
  items,
  isLoading = false,
  isUpdating = false,
  isDeleting = false,
  isClearingCart = false,
  cartSummary,
  onIncrement,
  onDecrement,
  onDeleteItem,
  onClearCart,
  onEditItem,
}: SalesCartListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={`sales-cart-item-loader-${i}`} className="animate-pulse">
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

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="space-y-4">
      {/* Cart Items */}
      {items.map(item => (
        <SalesCartItemCard
          key={item.id}
          item={item}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onDelete={onDeleteItem}
          onEditItem={onEditItem}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}

      {/* Cart Summary */}
      <SalesCartSummary
        summary={cartSummary}
        onClearCart={onClearCart}
        isClearingCart={isClearingCart}
      />
    </div>
  );
};
