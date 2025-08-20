import { Separator } from '@/components/ui/separator';
import { PurchasesSkuSummaryItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

type SkuSummaryProps = {
  skus?: PurchasesSkuSummaryItem[];
};

export const SkuSummary = ({ skus }: SkuSummaryProps) => {
  const totalPurchases =
    skus?.reduce((acc, item) => acc + item.total_qty, 0) || 0;

  return (
    <div className="border border-border rounded-sm p-4 bg-white">
      <div className="flex flex-col gap-1 text-xs">
        <h2 className="text-base font-medium">Rekap Pembelian per-SKU</h2>
        <Separator />

        {(!skus || skus.length === 0) && (
          <p className="text-gray-500">Tidak ada produk yang dibeli.</p>
        )}

        {skus &&
          skus.map(item => (
            <p key={item.product_id} className="flex justify-between gap-4">
              <span>
                ({item.sku}) {item.product_name}
              </span>
              <span>
                {formatCurrency(item.total_qty, { withSymbol: false })}
              </span>
            </p>
          ))}

        <Separator />

        <p className="flex justify-between gap-4">
          <strong className="font-medium">Total Unit Dibeli</strong>
          <span>
            {formatCurrency(totalPurchases, {
              withSymbol: false,
            })}
          </span>
        </p>
      </div>
    </div>
  );
};
