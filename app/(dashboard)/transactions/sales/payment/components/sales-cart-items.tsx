import { DiscountType, SalesCartItem, SalesCartSummaryType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface SalesCartItemsProps {
  cartItems: SalesCartItem[];
  cartSummary: SalesCartSummaryType;
}

export const SalesCartItems = ({
  cartItems,
  cartSummary,
}: SalesCartItemsProps) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold mb-2">Rincian</h4>

      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => {
          const basePrice = formatCurrency(item.base_price);
          let discount = '';
          if (
            item.discount_type === DiscountType.FIXED &&
            item.discount_value > 0
          ) {
            discount = `(- ${formatCurrency(item.discount_value)})`;
          } else if (
            item.discount_type === DiscountType.PERCENTAGE &&
            item.discount_value > 0
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
                <span className="text-right">{subTotalCalculationLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="border-t border-dashed pt-2 flex justify-between text-sm">
        <span className="font-medium">Total</span>
        <span className="bg-green-50 text-green-600 px-2 py-1 rounded">
          {formatCurrency(cartSummary.totalAmount)}
        </span>
      </p>
    </div>
  );
};
