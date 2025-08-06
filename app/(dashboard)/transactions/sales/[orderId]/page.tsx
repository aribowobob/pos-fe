'use client';

import { useParams, useSearchParams, notFound } from 'next/navigation';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useSalesOrderDetail } from './hooks';
import { Button } from '@/components/ui/button';
import { Calendar, Printer, ThumbsUp, User, Warehouse } from 'lucide-react';
import { cn, formatCurrency, formatDisplayDate } from '@/lib/utils';
import { DiscountType } from '@/lib/types';

export default function Page() {
  const params = useParams() as { orderId: string };
  const { orderId } = params;
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const { orderDetail, isLoading, error } = useSalesOrderDetail(orderId);
  const { order, details } = orderDetail ?? {};
  const {
    order_number,
    date,
    grand_total,
    user_initial,
    store_initial,
    payment_cash,
    payment_non_cash,
    receivable,
  } = order ?? {};
  const isPaid = parseFloat(receivable ?? '0') === 0;
  const grandTotal = parseFloat(grand_total ?? '0');
  const paymentCash = parseFloat(payment_cash ?? '0');
  const paymentNonCash = parseFloat(payment_non_cash ?? '0');
  const totalPayment = paymentCash + paymentNonCash;
  const change = totalPayment - grandTotal;
  const paymentText = [
    paymentCash > 0 ? `${formatCurrency(payment_cash)} (Tunai)` : '',
    paymentNonCash > 0 ? `${formatCurrency(payment_non_cash)} (Non Tunai)` : '',
  ]
    .filter(Boolean)
    .join(' + ');

  if (isLoading) {
    return null;
  }

  if (error) {
    notFound();
  }

  if (!order || !details) {
    return null;
  }

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
              <BreadcrumbLink href="/transactions/sales">
                Penjualan
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{order_number}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Rincian Penjualan</h1>
          <Button variant="secondary">
            <Printer className="size-4" />
            Cetak Struk
          </Button>
        </div>

        {success && (
          <div className="text-green-600 bg-green-100 p-4 rounded-md flex items-start gap-4">
            <ThumbsUp className="w-5 h-5" />
            <p>Transaksi penjualan berhasil disimpan!</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4 text-sm border-y py-2 border-dashed">
            <p className="flex items-center gap-2">
              <Warehouse className="size-4" />
              <span>{store_initial}</span>
              <User className="size-4" />
              <span>{user_initial}</span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{formatDisplayDate(date)}</span>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {details.map((item, index) => {
              const basePrice = formatCurrency(item.base_price);
              let discount = '';
              if (
                item.discount_type === DiscountType.FIXED &&
                Number(item.discount_value) > 0
              ) {
                discount = `(- ${formatCurrency(item.discount_value)})`;
              } else if (
                item.discount_type === DiscountType.PERCENTAGE &&
                Number(item.discount_value) > 0
              ) {
                discount = `(- ${item.discount_value}%)`;
              }
              const subTotal = parseFloat(item.sale_price) * item.qty;
              const subTotalCalculationLabel = [
                basePrice,
                discount,
                `x ${item.qty}`,
                '=',
                formatCurrency(subTotal),
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div key={item.id} className="flex gap-2 items-start text-sm">
                  <span className="shrink-0">{index + 1}.</span>
                  <div className="grow flex flex-col">
                    <span className="text-right">{`${item.product_name} x ${item.qty} @${item.base_price}`}</span>
                    <span className="text-right">
                      {subTotalCalculationLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="border-t border-dashed pt-2 flex justify-between text-sm">
            <span className="font-medium">Total</span>
            <span className="">{formatCurrency(grandTotal)}</span>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm">
            <span>Pembayaran:</span>
            <span>{paymentText}</span>
          </p>

          {change > 0 && (
            <p className="flex items-center gap-2 text-sm">
              <span>Kembalian:</span>
              <span>{formatCurrency(Math.max(0, change))}</span>
            </p>
          )}

          <p className="flex items-center gap-2 text-sm">
            <span>Keterangan:</span>
            <span className={cn(isPaid ? 'text-green-600' : 'text-red-800')}>
              {isPaid ? `LUNAS` : `Piutang ${formatCurrency(receivable)}`}
            </span>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
