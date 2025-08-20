import { Separator } from '@/components/ui/separator';
import { PurchasesReportSummary } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

type SummaryProps = {
  summary?: PurchasesReportSummary;
};

export const Summary = ({ summary }: SummaryProps) => {
  const totalPurchases =
    parseFloat(summary?.total_payment_cash ?? '0') +
    parseFloat(summary?.total_payment_non_cash ?? '0') +
    parseFloat(summary?.total_receivable ?? '0');

  return (
    <div className="border border-border rounded-sm p-4 bg-white">
      <div className="flex flex-col gap-1 text-xs">
        <h2 className="text-base font-medium">Ringkasan</h2>
        <Separator />
        <p className="flex justify-between gap-4">
          <span className="font-medium">Total Pembayaran Tunai</span>
          <span>{formatCurrency(summary?.total_payment_cash ?? '0')}</span>
        </p>
        <p className="flex justify-between gap-4">
          <span className="font-medium">Total Pembayaran Non-Tunai</span>
          <span>{formatCurrency(summary?.total_payment_non_cash ?? '0')}</span>
        </p>
        <p className="flex justify-between gap-4">
          <span className="font-medium">Total Hutang</span>
          <span>{formatCurrency(summary?.total_receivable ?? '0')}</span>
        </p>
        <Separator />
        <p className="flex justify-between gap-4">
          <span className="font-medium">Total Pembelian</span>
          <span>
            {`(${formatCurrency(summary?.total_orders ?? 0, {
              withSymbol: false,
            })} transaksi) ${formatCurrency(totalPurchases)}`}
          </span>
        </p>
      </div>
    </div>
  );
};
