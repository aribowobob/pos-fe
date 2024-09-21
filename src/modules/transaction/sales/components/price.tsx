import type { FC } from 'react';

import { money, numberFormat } from '@utils';

type PriceProps = {
  basePrice: number;
  salesPrice: number;
  discountType?: string | null;
  discountValue?: number;
};

const Price: FC<PriceProps> = props => {
  const { basePrice, salesPrice, discountType, discountValue } = props;

  return (
    <p className="m-0">
      {!!discountValue &&
        !!discountType &&
        ['PERCENTAGE', 'FIXED'].includes(discountType) && (
          <span className="bg-red-500/10 text-red-500 px-1 py-0.5 text-[10px] leading-4 rounded mb-1 inline-block">
            {discountType === 'PERCENTAGE'
              ? `Diskon ${numberFormat(discountValue)}%`
              : `Diskon ${money(discountValue)}`}
          </span>
        )}

      <span className="flex items-start gap-1">
        <span className="text-sm">{money(salesPrice)}</span>
        {basePrice !== salesPrice && (
          <span className="text-[10px] line-through text-slate-400">
            {money(basePrice)}
          </span>
        )}
      </span>
    </p>
  );
};

export default Price;
