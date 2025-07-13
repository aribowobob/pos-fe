'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import { AddToCartRequest, ProductType } from '@/lib/types';
import { addToSalesCartFn } from '../../fetchers/add-item';

export const useAddToCartFromSearch = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const storeId = user?.store?.id;

  const addItemMutation = useMutation({
    mutationFn: (item: AddToCartRequest) => addToSalesCartFn(item),
    onSuccess: () => {
      // Invalidate cart queries to refresh the cart
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success('Produk berhasil ditambahkan ke keranjang');
      router.back();
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });

  const addProductToCart = (product: ProductType) => {
    if (!storeId) {
      toast.error('Store ID tidak ditemukan');
      return;
    }

    const cartItem: AddToCartRequest = {
      product_id: product.id,
      base_price: product.sale_price,
      qty: 1,
      discount_type: 'percentage',
      discount_value: 0,
      discount_amount: '0',
      sale_price: product.sale_price,
      store_id: storeId,
    };

    addItemMutation.mutate(cartItem);
  };

  return {
    addProductToCart,
    isLoading: addItemMutation.isPending,
  };
};
