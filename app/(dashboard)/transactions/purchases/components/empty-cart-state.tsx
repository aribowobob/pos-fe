import { ShoppingCart } from 'lucide-react';

interface EmptyCartStateProps {
  title?: string;
  description?: string;
}

export const EmptyCartState = ({
  title = 'Keranjang Pembelian Kosong',
  description = 'Belum ada produk yang ditambahkan ke keranjang pembelian. Tambahkan produk untuk memulai transaksi.',
}: EmptyCartStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingCart className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
};
