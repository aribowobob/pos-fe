import { FormEvent, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DiscountType,
  SalesCartItem,
  UpdateCartItemRequest,
} from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { ProductPrice } from '@/components/product-price';
import { Equal, ShoppingBasket, X } from 'lucide-react';
import { InputNumber } from '@/components/input-number';

interface EditItemDialogProps {
  isUpdatingItem?: boolean;
  item: SalesCartItem | null;
  onClose: () => void;
  onSave: (itemId: number, update: UpdateCartItemRequest) => void;
}

export const EditItemDialog = ({
  item,
  onClose,
  onSave,
}: EditItemDialogProps) => {
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountType, setDiscountType] = useState<DiscountType>(
    DiscountType.PERCENTAGE
  );
  const [discountValue, setDiscountValue] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (item) {
      onSave(item.id, {
        qty: quantity,
        discount_type: discountType,
        discount_value: parseFloat(discountValue || '0'),
      });
    }
  };
  const handleChangeToggleDiscount = (checked: boolean) => {
    setHasDiscount(checked);
    if (!checked) {
      setDiscountType(DiscountType.PERCENTAGE);
      setDiscountValue('');
    }
  };
  const salePrice = useMemo(() => {
    if (!item) return 0;
    const basePrice = parseFloat(item.base_price);
    const discountAmount = hasDiscount
      ? discountType === DiscountType.FIXED
        ? parseFloat(discountValue || '0')
        : (basePrice * parseFloat(discountValue || '0')) / 100
      : 0;

    return basePrice - discountAmount;
  }, [item, hasDiscount, discountType, discountValue]);
  const finalPrice = useMemo(() => {
    return salePrice * quantity;
  }, [salePrice, quantity]);

  useEffect(() => {
    if (!item) return;

    const { discount_type, discount_value, qty } = item;

    setHasDiscount(discount_value > 0);
    setDiscountType(discount_type);
    setDiscountValue(discount_value.toString());
    setQuantity(qty);
  }, [item]);

  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBasket className="size-5" />
              Ubah Isi Keranjang
            </DialogTitle>
            <DialogDescription>
              Lakukan perubahan pada keranjang belanja Anda. Pastikan semua
              informasi sudah benar sebelum menyimpan.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <p className="bg-green-200 text-green-800 px-2 py-1 rounded font-medium">{`Harga: ${formatCurrency(
                item?.base_price ?? 0
              )}`}</p>
              <p>{`Stok: ${formatCurrency(0, { withSymbol: false })}`}</p>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                checked={hasDiscount}
                id="has-discount"
                onCheckedChange={handleChangeToggleDiscount}
              />
              <div className="flex flex-col gap-4">
                <Label htmlFor="has-discount" className="leading-4">
                  Diskon Produk
                </Label>

                {hasDiscount && (
                  <>
                    <RadioGroup
                      value={discountType}
                      onValueChange={value => {
                        setDiscountType(value as DiscountType);
                        setDiscountValue('');
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value={DiscountType.PERCENTAGE}
                          id="discount-percentage"
                        />
                        <Label htmlFor="discount-percentage">Persentasi</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value={DiscountType.FIXED}
                          id="discount-fixed"
                        />
                        <Label htmlFor="discount-fixed">Nominal</Label>
                      </div>
                    </RadioGroup>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="discount-value">Nilai Diskon</Label>
                      <div className="relative">
                        <InputNumber
                          value={discountValue}
                          onChange={value => {
                            setDiscountValue(value);
                          }}
                          placeholder={
                            discountType === DiscountType.FIXED ? 'Rp 0' : '0%'
                          }
                          prefix={
                            discountType === DiscountType.FIXED
                              ? 'Rp '
                              : undefined
                          }
                          suffix={
                            discountType === DiscountType.PERCENTAGE
                              ? '%'
                              : undefined
                          }
                          id="discount-value"
                          min={0}
                          max={
                            discountType === DiscountType.PERCENTAGE
                              ? 100
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="quantity">Jumlah</Label>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={e => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value > 0) {
                    setQuantity(value);
                  }
                }}
                min={1}
                placeholder="Masukkan jumlah"
              />
            </div>

            <div className="flex flex-row gap-4 items-end p-4 border border-border rounded bg-secondary">
              <ProductPrice
                discountType={discountType}
                discountValue={parseFloat(discountValue || '0')}
                basePrice={item?.base_price ?? 0}
                salePrice={salePrice ?? 0}
              />

              <X className="size-6" />

              <span>{formatCurrency(quantity, { withSymbol: false })}</span>

              <Equal className="size-6" />

              <span>{formatCurrency(finalPrice)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
