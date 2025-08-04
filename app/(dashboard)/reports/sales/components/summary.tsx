import { Separator } from '@/components/ui/separator';
import { SalesReportSummary } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

type SummaryProps = {
  data?: SalesReportSummary;
  isLoading: boolean;
};

export const Summary = ({ data, isLoading }: SummaryProps) => {
  const totalSales =
    parseFloat(data?.total_payment_cash ?? '0') +
    parseFloat(data?.total_payment_non_cash ?? '0') +
    parseFloat(data?.total_receivable ?? '0');

  return (
    <div className="flex flex-col gap-1 text-xs">
      <h2 className="text-base font-medium">Ringkasan</h2>
      <Separator />
      <p className="flex justify-between gap-4">
        <span className="font-medium">Total Pembayaran Tunai</span>
        {isLoading ? (
          <span className="animate-pulse bg-gray-200 h-4 w-20 inline-block rounded-xs" />
        ) : (
          <span>{formatCurrency(data?.total_payment_cash ?? '0')}</span>
        )}
      </p>
      <p className="flex justify-between gap-4">
        <span className="font-medium">Total Pembayaran Non-Tunai</span>
        {isLoading ? (
          <span className="animate-pulse bg-gray-200 h-4 w-20 inline-block rounded-xs" />
        ) : (
          <span>{formatCurrency(data?.total_payment_non_cash ?? '0')}</span>
        )}
      </p>
      <p className="flex justify-between gap-4">
        <span className="font-medium">Total Piutang</span>
        {isLoading ? (
          <span className="animate-pulse bg-gray-200 h-4 w-20 inline-block rounded-xs" />
        ) : (
          <span>{formatCurrency(data?.total_receivable ?? '0')}</span>
        )}
      </p>
      <Separator />
      <p className="flex justify-between gap-4">
        <span className="font-medium">Total Penjualan</span>
        {isLoading ? (
          <span className="animate-pulse bg-gray-200 h-4 w-20 inline-block rounded-xs" />
        ) : (
          <span>
            {`(${formatCurrency(data?.total_orders ?? '0', {
              withSymbol: false,
            })} transaksi) ${formatCurrency(totalSales)}`}
          </span>
        )}
      </p>
    </div>
  );
};
