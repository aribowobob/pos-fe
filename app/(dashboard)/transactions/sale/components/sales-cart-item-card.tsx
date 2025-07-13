'use client';

import { useState } from 'react';
import { Minus, Plus, Trash2, AlertTriangle } from 'lucide-react';

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

  const formatDiscountType = (type: 'fixed' | 'percentage') => {
    return type === 'percentage' ? 'Persen' : 'Nominal';
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">
            SKU: {item.sku || `PROD-${item.product_id}`}
          </p>
          <h3 className="font-medium text-sm">
            {item.product_name || `Produk ${item.product_id}`}
          </h3>
        </div>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
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
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs mb-4">
        <div>
          <span className="text-muted-foreground">Harga Dasar:</span>
          <p className="font-medium">
            {formatCurrency(Number(item.base_price))}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Harga Jual:</span>
          <p className="font-medium text-green-600">
            {formatCurrency(Number(item.sale_price))}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Jenis Diskon:</span>
          <p className="font-medium">
            {formatDiscountType(item.discount_type)}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Nilai Diskon:</span>
          <p className="font-medium">
            {item.discount_type === 'percentage'
              ? `${item.discount_value}%`
              : formatCurrency(Number(item.discount_value))}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Diskon:</span>
          <p className="font-medium text-red-600">
            {formatCurrency(Number(item.discount_amount))}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Satuan:</span>
          <p className="font-medium">{item.unit_name || 'pcs'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
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

          <span className="w-12 text-center font-medium">{item.qty}</span>

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

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="font-semibold text-lg text-green-600">
            {formatCurrency(Number(item.sale_price))}
          </p>
        </div>
      </div>
    </div>
  );
};
