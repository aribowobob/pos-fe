'use client';

import { useState } from 'react';
import { Minus, Plus, Trash2, AlertTriangle, SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PurchasesCartItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/common';
import { Separator } from '@/components/ui/separator';
import { ProductPrice } from '@/components/product-price';

interface PurchasesCartItemCardProps {
  item: PurchasesCartItem;
  onIncrement: (item: PurchasesCartItem) => void;
  onDecrement: (item: PurchasesCartItem) => void;
  onDelete: (itemId: number) => void;
  onEditItem: (item: PurchasesCartItem | null) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export const PurchasesCartItemCard = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  onEditItem,
  isUpdating = false,
  isDeleting = false,
}: PurchasesCartItemCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(item.id);
    setIsDeleteDialogOpen(false);
  };
  const itemStock = item.stock ?? 0;

  return (
    <div className="border border-border rounded-sm p-4 bg-white flex flex-col gap-4">
      <div className="flex items-start gap-2 justify-between">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">
            SKU: {item.sku || `PROD-${item.product_id}`}
          </p>
          <h3 className="font-medium text-sm">
            {item.product_name || `Produk ${item.product_id}`}
          </h3>
        </div>

        <Button
          className="p-0 size-4"
          variant="ghost"
          size="icon"
          onClick={() => onEditItem(item)}
        >
          <SquarePen className="size-4 text-muted-foreground hover:text-primary" />
        </Button>
      </div>

      <div className="flex items-end gap-4 justify-between">
        <ProductPrice
          discountType={item.discount_type}
          discountValue={item.discount_value}
          basePrice={item.base_price}
          salePrice={item.sale_price}
        />
        <p className="text-sm">{`Stok: ${formatCurrency(itemStock, {
          withSymbol: false,
        })}`}</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p className="font-medium text-xl text-green-600">
          {formatCurrency(Number(item.sale_price) * item.qty)}
        </p>

        <div className="flex items-center gap-4">
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Konfirmasi Hapus Item
                </DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin ingin menghapus item &quot;
                  {item.product_name || `Produk ${item.product_id}`}&quot; dari
                  keranjang? Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Hapus Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDecrement(item)}
              disabled={item.qty <= 1 || isUpdating}
              className="w-8 h-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="min-w-12 h-8 p-0 gap-1 text-base text-center font-medium"
              onClick={() => onEditItem(item)}
            >
              {item.qty}
              <span className="text-muted-foreground text-[10px]">
                {item.unit_name}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onIncrement(item)}
              disabled={isUpdating}
              className="w-8 h-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
