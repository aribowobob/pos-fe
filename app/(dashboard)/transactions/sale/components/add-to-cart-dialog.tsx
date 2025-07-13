'use client';

import { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddToCartRequest, ProductType } from '@/lib/types';
import { useUserStore } from '@/lib/store/user-store';
import useGetProducts from '../../../settings/products/hooks/useGetProducts';

interface AddToCartDialogProps {
  onAddToCart: (item: AddToCartRequest) => void;
  isLoading?: boolean;
}

export const AddToCartDialog = ({
  onAddToCart,
  isLoading = false,
}: AddToCartDialogProps) => {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [quantity, setQuantity] = useState('1');
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>(
    'percentage'
  );
  const [discountValue, setDiscountValue] = useState('0');

  // Fetch products
  const { data: productsData, isLoading: productsLoading } = useGetProducts({
    search: '',
    page: '1',
    size: '100', // Get enough products for selection
  });

  const products = productsData?.data?.items || [];

  const handleProductSelect = (productId: string) => {
    const product = products.find(
      (p: ProductType) => p.id.toString() === productId
    );
    setSelectedProduct(product || null);
  };

  const calculatePrices = () => {
    if (!selectedProduct)
      return { basePrice: 0, discountAmount: 0, salePrice: 0 };

    const qty = parseInt(quantity) || 1;
    const unitPrice = parseFloat(selectedProduct.sale_price);
    const basePrice = unitPrice * qty;
    const discountVal = parseFloat(discountValue) || 0;

    let discountAmount = 0;
    if (discountType === 'percentage') {
      discountAmount = (basePrice * discountVal) / 100;
    } else {
      discountAmount = discountVal * qty;
    }

    const salePrice = basePrice - discountAmount;

    return { basePrice, discountAmount, salePrice };
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !user?.store?.id) return;

    const { basePrice, discountAmount, salePrice } = calculatePrices();
    const qty = parseInt(quantity) || 1;

    const cartItem: AddToCartRequest = {
      product_id: selectedProduct.id,
      qty,
      base_price: basePrice.toString(),
      discount_type: discountType,
      discount_value: parseFloat(discountValue) || 0,
      discount_amount: discountAmount.toString(),
      sale_price: salePrice.toString(),
      store_id: user.store.id,
    };

    onAddToCart(cartItem);
    setIsOpen(false);

    // Reset form
    setSelectedProduct(null);
    setQuantity('1');
    setDiscountValue('0');
    setDiscountType('percentage');
  };

  const { basePrice, discountAmount, salePrice } = calculatePrices();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <Plus className="size-4" />
          Tambah Produk ke Keranjang
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Tambah Produk ke Keranjang
          </DialogTitle>
          <DialogDescription>
            Pilih produk dan atur kuantitas dan diskon untuk menambahkan ke
            keranjang penjualan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product">Produk</Label>
            <Select
              onValueChange={handleProductSelect}
              disabled={productsLoading}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    productsLoading ? 'Memuat produk...' : 'Pilih produk'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {products.map((product: ProductType) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.sku} - Rp{' '}
                        {parseInt(product.sale_price).toLocaleString('id-ID')} /{' '}
                        {product.unit_name}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProduct && (
            <>
              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Jumlah ({selectedProduct.unit_name})
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  placeholder="1"
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <Label htmlFor="discount-type">Jenis Diskon</Label>
                <Select
                  value={discountType}
                  onValueChange={(value: 'fixed' | 'percentage') =>
                    setDiscountType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Persentase (%)</SelectItem>
                    <SelectItem value="fixed">Nominal (Rp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount Value */}
              <div className="space-y-2">
                <Label htmlFor="discount-value">
                  Nilai Diskon {discountType === 'percentage' ? '(%)' : '(Rp)'}
                </Label>
                <Input
                  id="discount-value"
                  type="number"
                  min="0"
                  value={discountValue}
                  onChange={e => setDiscountValue(e.target.value)}
                  placeholder="0"
                />
              </div>

              {/* Price Summary */}
              <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Harga Dasar:</span>
                  <span>Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Diskon:</span>
                  <span className="text-red-600">
                    -Rp {discountAmount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2">
                  <span>Total Harga:</span>
                  <span className="text-green-600">
                    Rp {salePrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!selectedProduct || isLoading || productsLoading}
          >
            {isLoading ? 'Menambahkan...' : 'Tambah ke Keranjang'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
