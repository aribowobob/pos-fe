import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import {
  BottomSheet,
  Button,
  Checkbox,
  CurrencyInput,
  RadioGroup,
} from '@components';
import { Price } from '@modules/transaction/sales/components';
import { useSales } from '@store';
import { money, numberFormat, parseNumber } from '@utils';
import { DiscountType } from '@types';

const EditItemForm: FC = () => {
  const [isDiscount, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState<DiscountType>(null);
  const [discountValue, setDiscountValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const { editId, items, setEditId } = useSales();
  const editItem = items.find(item => item.id === editId);
  const {
    name,
    base_price: basePrice = 0,
    discount_type: discountTypeEdit,
    discount_value: discountValueEdit,
    stock,
    qty,
  } = editItem || {};
  let salesPrice = basePrice;
  let discountAmount = 0;

  if (!!discountType && ['FIXED', 'PERCENTAGE'].includes(discountType)) {
    const parseDiscountValue = discountValue ? parseNumber(discountValue) : 0;

    if (discountType === 'FIXED') {
      discountAmount = parseDiscountValue;
    } else {
      discountAmount = (basePrice * parseDiscountValue) / 100;
    }

    salesPrice = basePrice - discountAmount;
  }

  const handleChangeIsDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setIsDiscount(checked);

    if (!checked) {
      setDiscountType(null);
      setDiscountValue('');
    }
  };
  const resetForm = () => {
    setEditId(0);
    setDiscountType(null);
    setDiscountValue('');
    setQuantity('');
  };

  useEffect(() => {
    if (editItem) {
      if (discountTypeEdit) {
        setDiscountType(discountTypeEdit);
      } else {
        setDiscountType(null);
      }

      if (discountValueEdit) {
        setDiscountValue(numberFormat(discountValueEdit));
      } else {
        setDiscountValue('');
      }

      if (discountTypeEdit && discountValueEdit) {
        setIsDiscount(true);
      }

      if (qty) {
        setQuantity(numberFormat(qty));
      } else {
        setQuantity('');
      }
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editItem]);

  return (
    <BottomSheet
      open={!!editItem}
      onClose={resetForm}
      title={name || ''}
      footer={
        <div className="flex gap-4 justify-between items-center">
          <Button
            color="danger"
            ghost
            onClick={() => {
              setEditId(0);
            }}
          >
            Hapus
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setEditId(0);
            }}
            className="grow"
          >
            Simpan Perubahan
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="flex justify-between items-center">
          <span>
            Harga Jual{' '}
            <span className="font-semibold">{money(basePrice || 0)}</span>
          </span>
          <span>
            Stok{' '}
            <span className="font-semibold">{numberFormat(stock || 0)}</span>
          </span>
        </p>

        <div>
          <Checkbox
            id="discount"
            label="Diskon Produk"
            isChecked={isDiscount}
            onChange={handleChangeIsDiscount}
          />

          {isDiscount && (
            <>
              <RadioGroup
                name="discount_type"
                className="pl-4 mt-2"
                options={[
                  { label: 'Persentase', value: 'PERCENTAGE' },
                  { label: 'Nominal', value: 'FIXED' },
                ]}
                value={discountType}
                onChange={e => {
                  setDiscountType(e.target.value as DiscountType);
                  setDiscountValue('');
                }}
              />
              <CurrencyInput
                label="Nilai Diskon"
                name="discount_value"
                prefixElement={discountType === 'FIXED' ? 'Rp' : null}
                suffixElement={discountType === 'PERCENTAGE' ? '%' : null}
                value={discountValue}
                onChange={e => setDiscountValue(e.target.value)}
                className="mt-4"
                disabled={discountType === null}
              />
            </>
          )}
        </div>

        <CurrencyInput
          label="Jumlah"
          name="qty"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />

        <div className="mt-4 flex gap-4 items-end">
          <Price
            basePrice={basePrice || 0}
            salesPrice={salesPrice}
            discountType={discountType}
            discountValue={parseNumber(discountValue)}
          />
          <span>X</span>
          <span>{quantity}</span>
          <span>=</span>
          <span className="font-semibold">
            {money(salesPrice * parseNumber(quantity))}
          </span>
        </div>
      </div>
    </BottomSheet>
  );
};

export default EditItemForm;
