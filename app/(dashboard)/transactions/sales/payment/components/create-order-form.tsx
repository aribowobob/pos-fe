'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/date-picker';
import { InputNumber } from '@/components/input-number';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/lib/store/user-store';
import { CreateOrderRequest, SalesCartSummaryType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CreateOrderFormProps {
  cartSummary: SalesCartSummaryType;
  isLoading: boolean;
  createOrder: (order: CreateOrderRequest) => void;
}

export const CreateOrderForm = ({
  cartSummary,
  isLoading,
  createOrder,
}: CreateOrderFormProps) => {
  const { back } = useRouter();
  const { user } = useUserStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentCash, setPaymentCash] = useState('');
  const [paymentNonCash, setPaymentNonCash] = useState('');
  const [orderDate, setOrderDate] = useState<string | undefined>(
    new Date().toISOString().split('T')[0]
  );
  const [receivableNotif, setReceivableNotif] = useState(false);

  const generateOrderNumber = () => {
    const now = new Date();
    const timestamp = now.getTime().toString().slice(-6);
    return `TRJ${timestamp}`;
  };

  const handleCreateOrder = () => {
    if (!user?.store?.id || !orderDate) return;

    const totalPayment =
      parseFloat(paymentCash || '0') + parseFloat(paymentNonCash || '0');
    if (totalPayment < cartSummary.totalAmount && !receivableNotif) {
      setReceivableNotif(true);
      return;
    }

    const order: CreateOrderRequest = {
      order_number: orderNumber,
      store_id: user.store.id,
      date: orderDate,
      payment_cash: paymentCash || '0',
      payment_non_cash: paymentNonCash || '0',
    };

    createOrder(order);
  };

  const totalPayment =
    parseFloat(paymentCash || '0') + parseFloat(paymentNonCash || '0');
  const change = totalPayment - cartSummary.totalAmount;
  const receivable = cartSummary.totalAmount - totalPayment;

  useEffect(() => {
    // Generate new order number when component mounts
    setOrderNumber(generateOrderNumber());
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
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
        <div className="border rounded-sm p-3 bg-blue-50 space-y-2 col-span-2">
          <div className="flex justify-between text-sm">
            <span>Total Pembayaran:</span>
            <span className="font-medium">{formatCurrency(totalPayment)}</span>
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
          {totalPayment < cartSummary.totalAmount ? (
            <p className="text-xs text-red-600 mt-1">
              Pembayaran kurang {formatCurrency(receivable)}
            </p>
          ) : (
            <p className="text-xs text-green-600 mt-1">LUNAS</p>
          )}
        </div>

        {/* Create Order Button */}
        <div className="flex items-center justify-between gap-4 col-span-2">
          <Button variant="outline" onClick={back}>
            <ChevronLeft className="size-4" />
            Kembali
          </Button>
          <Button
            onClick={handleCreateOrder}
            disabled={!orderNumber || isLoading}
            className="w-36"
          >
            {isLoading ? 'Memproses...' : 'Buat Pesanan'}
            <CircleCheckBig className="size-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={receivableNotif} onOpenChange={setReceivableNotif}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pembayaran kurang!</AlertDialogTitle>
            <AlertDialogDescription>
              Kamu yakin ingin melanjutkan dengan pembayaran kurang{' '}
              {formatCurrency(receivable)}. Kekurangan pembayaran akan ditandai
              sebagai piutang.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Saya cek lagi</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateOrder}>
              Yakin, lanjutkan!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
