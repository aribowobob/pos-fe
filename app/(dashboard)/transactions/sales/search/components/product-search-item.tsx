'use client';

import { ProductType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductSearchItemProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
  isLoading?: boolean;
}

export const ProductSearchItem = ({
  product,
  onAddToCart,
  isLoading = false,
}: ProductSearchItemProps) => {
  const handleAddToCart = () => {
    if (isLoading) return;
    onAddToCart(product);
  };

  return (
    <div
      className="p-4 border rounded-lg hover:bg-secondary transition-colors cursor-pointer"
      role="button"
      onClick={handleAddToCart}
    >
      <p className="font-medium">{product.name}</p>
      <div className="flex gap-4 items-center justify-between mt-1">
        <span className="text-sm">
          {formatCurrency(parseFloat(product.sale_price))}
        </span>

        <span className="text-sm">Stok: {product.stock || 0}</span>
      </div>
    </div>
  );
};
