'use client';

import { ProductType } from '@/lib/types';
import { ProductSearchItem } from './product-search-item';
import { Loader } from '@/components/ui/loader';

interface ProductSearchListProps {
  products: ProductType[];
  isLoading: boolean;
  onAddToCart: (product: ProductType) => void;
  isAddingToCart: boolean;
  searchQuery: string;
}

export const ProductSearchList = ({
  products,
  isLoading,
  onAddToCart,
  isAddingToCart,
  searchQuery,
}: ProductSearchListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader />
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Ketik kata kunci untuk mencari produk</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Tidak ada produk yang ditemukan untuk &ldquo;{searchQuery}&rdquo;</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Menampilkan {products.length} produk untuk &ldquo;{searchQuery}&rdquo;
      </p>
      <div className="grid gap-3">
        {products.map(product => (
          <ProductSearchItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isLoading={isAddingToCart}
          />
        ))}
      </div>
    </div>
  );
};
