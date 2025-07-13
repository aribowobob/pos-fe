'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

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

interface ClearCartDialogProps {
  onClearCart: () => void;
  itemCount: number;
  isClearingCart?: boolean;
}

export const ClearCartDialog = ({
  onClearCart,
  itemCount,
  isClearingCart = false,
}: ClearCartDialogProps) => {
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleClearConfirm = () => {
    onClearCart();
    setIsClearDialogOpen(false);
  };

  return (
    <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive/50 hover:text-destructive hover:bg-destructive/10"
          disabled={isClearingCart || itemCount === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Kosongkan Keranjang
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Konfirmasi Kosongkan Keranjang
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin mengosongkan semua produk dari keranjang
            penjualan? Semua produk yang ada akan dihapus dan tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsClearDialogOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleClearConfirm}>
            Kosongkan Keranjang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
