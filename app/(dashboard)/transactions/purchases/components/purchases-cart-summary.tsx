import { BanknoteArrowUp } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/common';

import { ClearCartDialog } from './clear-cart-dialog';
import { PurchasesCartSummaryType } from '@/lib/types';

interface PurchasesCartSummaryProps {
  summary: PurchasesCartSummaryType;
  onClearCart: () => void;
  isClearingCart?: boolean;
}

export const PurchasesCartSummary = ({
  summary,
  onClearCart,
  isClearingCart = false,
}: PurchasesCartSummaryProps) => {
  return (
    <div className="border border-border rounded-sm p-4 bg-gray-50 space-y-3">
      <h3 className="font-semibold text-lg mb-2">Ringkasan Keranjang</h3>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Item:</span>
          <span className="font-medium">
            {formatCurrency(summary.totalItems, { withSymbol: false })} item
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Kuantitas:</span>
          <span className="font-medium">
            {formatCurrency(summary.totalQty, { withSymbol: false })}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">
            {formatCurrency(summary.totalPurchaseAmount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Diskon:</span>
          <span className="font-medium text-red-600">
            -{formatCurrency(summary.totalDiscountAmount)}
          </span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-green-600">
            {formatCurrency(summary.grandTotal)}
          </span>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <ClearCartDialog
          itemCount={summary.totalItems}
          onClearCart={onClearCart}
          isClearingCart={isClearingCart}
        />

        <Link href="/transactions/purchases/payment">
          <Button
            className="w-fit"
            size="lg"
            disabled={summary.totalItems === 0}
          >
            <BanknoteArrowUp className="w-4 h-4" />
            Lanjutkan ke Pembayaran
          </Button>
        </Link>
      </div>
    </div>
  );
};
