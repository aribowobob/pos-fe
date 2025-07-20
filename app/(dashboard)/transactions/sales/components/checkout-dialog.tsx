'use client';

import { useState } from 'react';
import { BanknoteArrowUp, CreditCard } from 'lucide-react';

import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateOrderRequest } from '@/lib/types';
import { useUserStore } from '@/lib/store/user-store';
import { formatCurrency } from '@/lib/utils/common';
import { InputNumber } from '@/components/input-number';

interface CheckoutDialogProps {
  onCreateOrder: (order: CreateOrderRequest) => void;
  cartSummary: {
    totalItems: number;
    totalAmount: number;
    totalDiscount: number;
    itemCount: number;
  };
  isLoading?: boolean;
  disabled?: boolean;
}

export const CheckoutDialog = ({
  onCreateOrder,
  cartSummary,
  isLoading = false,
  disabled = false,
}: CheckoutDialogProps) => {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentCash, setPaymentCash] = useState('');
  const [paymentNonCash, setPaymentNonCash] = useState('');
  const [orderDate, setOrderDate] = useState<string | undefined>(
    new Date().toISOString().split('T')[0]
  );

  const generateOrderNumber = () => {
    const now = new Date();
    const timestamp = now.getTime().toString().slice(-6);
    return `ORD${timestamp}`;
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Generate new order number when dialog opens
      setOrderNumber(generateOrderNumber());
      // Set default cash & non-cash payment to blank
      setPaymentCash('');
      setPaymentNonCash('');
    }
    setIsOpen(open);
  };

  const handleCreateOrder = () => {
    if (!user?.store?.id || !orderDate) return;

    const totalPayment =
      parseFloat(paymentCash || '0') + parseFloat(paymentNonCash || '0');
    if (totalPayment < cartSummary.totalAmount) {
      alert('Total pembayaran tidak boleh kurang dari total tagihan!');
      return;
    }

    const order: CreateOrderRequest = {
      order_number: orderNumber,
      store_id: user.store.id,
      date: orderDate,
      payment_cash: paymentCash || '0',
      payment_non_cash: paymentNonCash || '0',
    };

    onCreateOrder(order);
    setIsOpen(false);
  };

  const totalPayment =
    parseFloat(paymentCash || '0') + parseFloat(paymentNonCash || '0');
  const change = totalPayment - cartSummary.totalAmount;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="w-fit"
          size="lg"
          disabled={disabled || cartSummary.itemCount === 0}
        >
          <BanknoteArrowUp className="w-4 h-4 mr-2" />
          Lanjutkan ke Pembayaran
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Checkout Penjualan
          </DialogTitle>
          <DialogDescription>
            Konfirmasi pembayaran untuk menyelesaikan transaksi penjualan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Summary */}
          <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
            <h4 className="font-medium mb-2">Ringkasan Pesanan</h4>
            <div className="flex justify-between text-sm">
              <span>Total Item:</span>
              <span>{cartSummary.totalItems} item</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>
                {formatCurrency(
                  cartSummary.totalAmount + cartSummary.totalDiscount
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Diskon:</span>
              <span className="text-red-600">
                -{formatCurrency(cartSummary.totalDiscount)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total Tagihan:</span>
              <span className="text-green-600">
                {formatCurrency(cartSummary.totalAmount)}
              </span>
            </div>
          </div>

          {/* Order Date */}
          <div className="space-y-2">
            <Label>Tanggal Penjualan</Label>
            <DatePicker
              value={orderDate}
              onChange={setOrderDate}
              maxDate={new Date().toISOString().split('T')[0]} // Prevent future dates
            />
          </div>

          {/* Order Number */}
          <div className="space-y-2">
            <Label htmlFor="order-number">Nomor Penjualan</Label>
            <Input
              id="order-number"
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
              placeholder="Masukkan nomor penjualan"
              required
            />
          </div>

          {/* Payment Cash */}
          <div className="space-y-2">
            <Label htmlFor="payment-cash">Pembayaran Tunai</Label>
            <InputNumber
              id="payment-cash"
              min={0}
              value={paymentCash}
              onChange={value => setPaymentCash(value)}
              placeholder="Rp 0"
              prefix="Rp "
            />
          </div>

          {/* Payment Non-Cash */}
          <div className="space-y-2">
            <Label htmlFor="payment-non-cash">Pembayaran Non-Tunai</Label>
            <InputNumber
              id="payment-non-cash"
              min={0}
              value={paymentNonCash}
              onChange={value => setPaymentNonCash(value)}
              placeholder="Rp 0"
              prefix="Rp "
            />
          </div>

          {/* Payment Summary */}
          <div className="border rounded-lg p-3 bg-blue-50 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Pembayaran:</span>
              <span className="font-medium">
                {formatCurrency(totalPayment)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Kembalian:</span>
              <span
                className={`font-medium ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(Math.max(0, change))}
              </span>
            </div>
            {totalPayment < cartSummary.totalAmount && (
              <p className="text-xs text-red-600 mt-1">
                Pembayaran kurang{' '}
                {formatCurrency(cartSummary.totalAmount - totalPayment)}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={handleCreateOrder}
            disabled={
              !orderNumber ||
              totalPayment < cartSummary.totalAmount ||
              isLoading
            }
          >
            {isLoading ? 'Memproses...' : 'Buat Pesanan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
