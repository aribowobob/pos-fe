import { Separator } from '@/components/ui/separator';
import { SkuSummaryItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

type SkuSummaryProps = {
  data?: SkuSummaryItem[];
  isLoading: boolean;
};

export const SkuSummary = ({ data, isLoading }: SkuSummaryProps) => {
  const totalSales = data?.reduce((acc, item) => acc + item.total_qty, 0) || 0;
  return (
    <div className="flex flex-col gap-1 text-xs">
      <h2 className="text-base font-medium">Rekap Penjualan per-SKU</h2>
      <Separator />
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <p key={index} className="animate-pulse flex justify-between gap-4">
            <span className="bg-gray-200 h-4 w-40 inline-block rounded-xs" />
            <span className="bg-gray-200 h-4 w-20 inline-block rounded-xs" />
          </p>
        ))}

      {!isLoading && (data || []).length === 0 && (
        <p className="text-gray-500">Tidak ada produk yang terjual.</p>
      )}

      {!isLoading &&
        data &&
        data.map(item => (
          <p key={item.product_id} className="flex justify-between gap-4">
            <span>
              ({item.sku}) {item.product_name}
            </span>
            <span>{formatCurrency(item.total_qty, { withSymbol: false })}</span>
          </p>
        ))}
      <Separator />
      <p className="flex justify-between gap-4">
        <strong className="font-medium">Total Unit Terjual</strong>
        {isLoading ? (
          <span className="animate-pulse bg-gray-200 h-4 w-20 inline-block rounded-xs" />
        ) : (
          <span>
            {formatCurrency(totalSales, {
              withSymbol: false,
            })}
          </span>
        )}
      </p>
    </div>
  );
};
