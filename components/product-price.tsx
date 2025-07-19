import { DiscountType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductPriceProps {
  discountType: DiscountType;
  discountValue: number;
  basePrice: string | number;
  salePrice: string | number;
}

export const ProductPrice = ({
  discountType,
  discountValue,
  basePrice,
  salePrice,
}: ProductPriceProps) => {
  const formatDiscountType = (type: DiscountType, value: number): string => {
    const discountText =
      type === DiscountType.FIXED ? formatCurrency(value) : `${value}%`;
    return `Diskon ${discountText}`;
  };

  return (
    <div className="flex flex-col gap-1">
      {discountValue > 0 && (
        <p className="text-xs bg-destructive/10 text-destructive px-1 rounded self-start">
          {formatDiscountType(discountType, discountValue)}
        </p>
      )}

      <div className="flex items-start gap-1">
        <p>{formatCurrency(salePrice)}</p>
        {discountValue > 0 && (
          <p className="text-xs text-muted-foreground line-through">
            {formatCurrency(basePrice)}
          </p>
        )}
      </div>
    </div>
  );
};
