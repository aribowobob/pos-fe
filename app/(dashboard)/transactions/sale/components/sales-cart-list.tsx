import { SalesCartItem, CreateOrderRequest } from '@/lib/types';
import { SalesCartItemCard } from './sales-cart-item-card';
import { EmptyCartState } from './empty-cart-state';
import { SalesCartSummary } from './sales-cart-summary';

interface SalesCartListProps {
  items: SalesCartItem[];
  isLoading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isClearingCart?: boolean;
  isCreatingOrder?: boolean;
  cartSummary: {
    totalItems: number;
    totalAmount: number;
    totalDiscount: number;
    itemCount: number;
  };
  onIncrement: (item: SalesCartItem) => void;
  onDecrement: (item: SalesCartItem) => void;
  onDeleteItem: (itemId: number) => void;
  onClearCart: () => void;
  onCreateOrder?: (order: CreateOrderRequest) => void;
}

export const SalesCartList = ({
  items,
  isLoading = false,
  isUpdating = false,
  isDeleting = false,
  isClearingCart = false,
  isCreatingOrder = false,
  cartSummary,
  onIncrement,
  onDecrement,
  onDeleteItem,
  onClearCart,
  onCreateOrder,
}: SalesCartListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="border border-border rounded-lg p-4 bg-white">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
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
      <div className="space-y-4">
        {items.map(item => (
          <SalesCartItemCard
            key={item.id}
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDeleteItem}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <SalesCartSummary
        summary={cartSummary}
        onCreateOrder={onCreateOrder}
        onClearCart={onClearCart}
        isClearingCart={isClearingCart}
        isCreatingOrder={isCreatingOrder}
      />
    </div>
  );
};
