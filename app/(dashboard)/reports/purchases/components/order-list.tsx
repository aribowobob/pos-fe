import { Separator } from '@/components/ui/separator';
import { PurchasesReportOrder } from '@/lib/types';
import {
  cn,
  formatCurrency,
  formatDateIndonesian,
  itemSubTotalCalculation,
} from '@/lib/utils';
import { Box, Calendar, User, Warehouse } from 'lucide-react';
import Link from 'next/link';

type OrderListProps = {
  orders?: PurchasesReportOrder[];
};

export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="border border-border rounded-sm p-4 bg-white">
      <div className="flex flex-col gap-1 text-xs">
        <h2 className="text-base font-medium">Daftar Transaksi Pembelian</h2>
        <Separator />

        {(!orders || orders.length === 0) && (
          <p className="text-gray-400">Tidak ada transaksi pembelian.</p>
        )}

        {orders &&
          orders.map(order => {
            const {
              date,
              grand_total,
              id,
              items,
              order_number,
              payment_cash,
              payment_non_cash,
              receivable,
              store_initial,
              user_initial,
            } = order;
            const isCashPayment = parseFloat(payment_cash) > 0;
            const isNonCashPayment = parseFloat(payment_non_cash) > 0;

            const isReceivable = parseFloat(receivable) > 0;
            const paymentNotes = isReceivable
              ? formatCurrency(parseFloat(receivable) * -1)
              : 'LUNAS';
            const itemLength = items.length;
            const firstItem = items[0];
            let totalPaid = parseFloat(grand_total);
            if (isReceivable) {
              totalPaid =
                parseFloat(payment_cash) + parseFloat(payment_non_cash);
            }
            let paymentLabel = 'TUNAI';

            if (isCashPayment && isNonCashPayment) {
              paymentLabel = 'MIXED';
            } else if (isNonCashPayment) {
              paymentLabel = 'NON-TUNAI';
            }

            return (
              <div
                key={id}
                className="flex flex-col gap-1 pt-1 pb-2 border-b border-border last:border-0"
              >
                <div className="flex gap-4 justify-between">
                  <Link
                    href={`/transactions/purchases/${id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {order_number}
                  </Link>

                  <div className="flex items-center gap-1">
                    <User className="size-3 text-gray-400" />
                    <span>{user_initial}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <Warehouse className="size-3 text-gray-400" />
                    <span>{store_initial}</span>
                  </div>
                </div>

                <p className="flex gap-1 items-center">
                  <Calendar className="size-3 text-gray-400" />
                  <span>{formatDateIndonesian(date)}</span>
                </p>

                <p className="flex gap-1 items-center w-full">
                  <Box className="size-3 text-gray-400" />
                  <span className="w-full truncate">
                    {firstItem.product_name}
                  </span>
                </p>

                <p className="text-right">
                  {itemSubTotalCalculation({
                    ...firstItem,
                    discount_value: parseFloat(firstItem.discount_value),
                    sale_price: firstItem.sale_price,
                  })}
                </p>

                {itemLength > 1 && (
                  <p className="text-right text-gray-400">
                    + {itemLength - 1} produk lainnya
                  </p>
                )}

                <div className="flex gap-4 justify-between">
                  <p className="flex gap-1 items-center">
                    <span className="font-semibold">TOTAL</span>
                    <span>{formatCurrency(totalPaid)}</span>
                    <span>{paymentLabel}</span>
                  </p>

                  <p
                    className={cn(
                      isReceivable ? 'text-red-600' : 'text-green-600'
                    )}
                  >
                    {paymentNotes}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
