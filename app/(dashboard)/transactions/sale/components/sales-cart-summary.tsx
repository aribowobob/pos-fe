import { CheckoutDialog } from './checkout-dialog';
import { CreateOrderRequest } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/common';

interface SalesCartSummaryProps {
  summary: {
    totalItems: number;
    totalAmount: number;
    totalDiscount: number;
    itemCount: number;
  };
  onCreateOrder?: (order: CreateOrderRequest) => void;
  isCreatingOrder?: boolean;
}

export const SalesCartSummary = ({
  summary,
  onCreateOrder,
  isCreatingOrder = false,
}: SalesCartSummaryProps) => {
  const subtotal = summary.totalAmount + summary.totalDiscount;

  return (
    <div className="border border-border rounded-lg p-4 bg-gray-50 space-y-3">
      <h3 className="font-semibold text-lg mb-4">Ringkasan Keranjang</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Item:</span>
          <span className="font-medium">{summary.totalItems} item</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Diskon:</span>
          <span className="font-medium text-red-600">
            -{formatCurrency(summary.totalDiscount)}
          </span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-green-600">
            {formatCurrency(summary.totalAmount)}
          </span>
        </div>
      </div>

      {onCreateOrder && (
        <div className="pt-4">
          <CheckoutDialog
            onCreateOrder={onCreateOrder}
            cartSummary={summary}
            isLoading={isCreatingOrder}
            disabled={summary.itemCount === 0}
          />
        </div>
      )}
    </div>
  );
};
