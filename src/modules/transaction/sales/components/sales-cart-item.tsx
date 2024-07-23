import { NumberInput } from '@components';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';

import { SalesTransactionItemType } from '@store';
import { money, numberFormat } from '@utils';

type SalesCartItemProps = {
  data: SalesTransactionItemType;
};
const SalesCartItem = ({ data }: SalesCartItemProps) => {
  const {
    productName,
    baseSalesPrice,
    salesPrice,
    discountType,
    discountValue,
    stock,
    totalPrice,
    quantity,
  } = data;

  return (
    <div className="bg-white p-4 flex flex-col gap-4 w-full rounded">
      <div className="flex gap-4 items-center">
        <p className="grow text-base leading-normal text-ellipsis overflow-hidden whitespace-nowrap">
          {productName}
        </p>
        <button>
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between items-end">
        <p className="m-0">
          {!!discountType && ['PERCENTAGE', 'FIXED'].includes(discountType) && (
            <span className="bg-red-500/10 text-red-500 px-1 py-0.5 text-[10px] leading-4 rounded mb-1 inline-block">
              {discountType === 'PERCENTAGE'
                ? `Diskon ${numberFormat(discountValue)}%`
                : `Diskon ${money(discountValue)}`}
            </span>
          )}

          <span className="flex items-start gap-1">
            <span className="text-sm">{money(salesPrice)}</span>
            {baseSalesPrice !== salesPrice && (
              <span className="text-[10px] line-through text-slate-400">
                {money(baseSalesPrice)}
              </span>
            )}
          </span>
        </p>

        <span>{`Stok: ${numberFormat(stock)}`}</span>
      </div>

      <div className="border-t border-slate-300 pt-4 flex gap-4 justify-between items-center w-full">
        <span className="text-base font-semibold">{money(totalPrice)}</span>
        <div className="flex gap-4 items-center">
          <button>
            <TrashIcon className="w-6 h-6 text-slate-400" />
          </button>
          <NumberInput
            value={quantity}
            onChange={() => {}}
            min={1}
            max={stock}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesCartItem;
