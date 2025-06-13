import { useEffect, useState } from 'react';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDebounce } from 'use-debounce';

import { NumberInput } from '@components';
import { useSalesCart } from '@hooks';
import {
  DeleteConfirmation,
  Price,
} from '@modules/transaction/sales/components';
import type { SalesCartItemProps } from '@types';
import { money, numberFormat } from '@utils';

const SalesCartItem = ({ data, onRemove, onEdit }: SalesCartItemProps) => {
  const { updateSalesCartItem } = useSalesCart();
  const [showModal, setShowModal] = useState(false);
  const [qty, setQty] = useState(0);
  const [nextQty] = useDebounce(qty, 1000);
  const {
    id,
    name,
    base_price: basePrice,
    sale_price: salesPrice,
    discount_type: discountType,
    discount_value: discountValue,
    stock,
    qty: cartQty,
  } = data;
  const totalPrice = salesPrice * qty;

  useEffect(() => {
    if (cartQty !== qty) {
      setQty(cartQty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQty]);

  useEffect(() => {
    if (nextQty === qty && nextQty > 0 && nextQty !== cartQty) {
      updateSalesCartItem({ ...data, qty: nextQty });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQty]);

  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-4 w-full rounded">
        <div className="flex gap-4 items-center">
          <p className="grow text-base leading-normal text-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </p>
          <button
            type="button"
            onClick={() => {
              onEdit(id);
            }}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between items-end">
          <Price
            basePrice={basePrice}
            salesPrice={salesPrice}
            discountType={discountType}
            discountValue={discountValue}
          />

          <span>{`Stok: ${numberFormat(stock)}`}</span>
        </div>

        <div className="border-t border-slate-300 pt-4 flex gap-4 justify-between items-center w-full">
          <span className="text-base font-semibold">{money(totalPrice)}</span>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowModal(true)}>
              <TrashIcon className="w-6 h-6 text-slate-400" />
            </button>
            <NumberInput
              value={qty}
              onChange={setQty}
              min={1}
              max={stock}
              onClickValue={() => {
                onEdit(id);
              }}
            />
          </div>
        </div>
      </div>

      <DeleteConfirmation
        open={showModal}
        name={name}
        onCancel={() => setShowModal(false)}
        onDelete={() => onRemove(id)}
      />
    </>
  );
};

export default SalesCartItem;
