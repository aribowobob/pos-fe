import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { SalesTransactionItemType } from '@store';

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
        <p className="flex flex-col">
          {!!discountType && ['PERCENTAGE', 'FIXED'].includes(discountType) && (
            <span className="bg-red-500/10 text-red-500 px-2 text-[10px] leading-4 rounded">
              {discountType === 'PERCENTAGE'
                ? `Diskon ${discountValue}%`
                : `Diskon ${discountValue}`}
            </span>
          )}

          <span className="flex items-start gap-1">
            <span className="text-sm">{salesPrice}</span>
            {baseSalesPrice !== salesPrice && (
              <span className="text-[10px] line-through text-slate-400">
                {baseSalesPrice}
              </span>
            )}
          </span>
        </p>

        <span>Stok: 99</span>
      </div>

      <div className="border-t border-slate-300 pt-4 flex gap-4 justify-between w-full">
        <span className="text-base font-semibold">{salesPrice}</span>
        <span>-number stepper-</span>
      </div>
    </div>
  );
};

export default SalesCartItem;
