'use client';

import { useState } from 'react';
import { Minus, Plus, Trash2, AlertTriangle, MoreVertical } from 'lucide-react';

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
import { SalesCartItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/common';
import { Separator } from '@/components/ui/separator';

interface SalesCartItemCardProps {
  item: SalesCartItem;
  onIncrement: (item: SalesCartItem) => void;
  onDecrement: (item: SalesCartItem) => void;
  onDelete: (itemId: number) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export const SalesCartItemCard = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: SalesCartItemCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(item.id);
    setIsDeleteDialogOpen(false);
  };

  const formatDiscountType = (
    type: 'fixed' | 'percentage',
    value: number
  ): string => {
    const discountText = type === 'fixed' ? formatCurrency(value) : `${value}%`;
    return `Diskon ${discountText}`;
  };

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

        <button>
          <MoreVertical className="w-5 h-5 text-muted-foreground hover:text-primary" />
        </button>
      </div>

      <div className="flex items-end gap-4 justify-between">
        <div className="flex flex-col gap-1">
          {item.discount_value > 0 && (
            <p className="text-xs bg-destructive/10 text-destructive px-1 rounded self-start">
              {formatDiscountType(item.discount_type, item.discount_value)}
            </p>
          )}

          <div className="flex items-start gap-1">
            <p>{formatCurrency(item.sale_price)}</p>
            {item.discount_value > 0 && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(item.base_price)}
              </p>
            )}
          </div>
        </div>
        <p className="text-sm">{`Stok: ${0}`}</p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <p className="font-medium text-xl text-green-600">
          {formatCurrency(Number(item.sale_price))}
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

            <p className="min-w-12 text-center font-medium">
              {item.qty}
              <span className="text-muted-foreground text-[10px] ml-1">
                {item.unit_name}
              </span>
            </p>

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
