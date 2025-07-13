'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    onAddToCart(product);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              SKU: {product.sku}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">
                  {formatCurrency(parseFloat(product.sale_price))}
                </span>
                <span className="text-sm text-muted-foreground">
                  Stok: {product.stock || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <Button
              onClick={handleAddToCart}
              disabled={
                isLoading || (product.stock !== undefined && product.stock <= 0)
              }
              size="sm"
            >
              {isLoading ? 'Menambah...' : 'Tambah'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
