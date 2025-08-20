'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import {
  AddToPurchasesCartRequest,
  DiscountType,
  ProductType,
} from '@/lib/types';
import { addToPurchasesCartFn } from '../fetchers';

export const useAddToCartFromSearch = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const storeId = user?.store?.id;

  const addItemMutation = useMutation({
    mutationFn: (item: AddToPurchasesCartRequest) => addToPurchasesCartFn(item),
    onSuccess: () => {
      // Invalidate cart queries to refresh the cart
      queryClient.invalidateQueries({ queryKey: ['purchases-cart', storeId] });
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

    const cartItem: AddToPurchasesCartRequest = {
      product_id: product.id,
      base_price: product.purchase_price,
      qty: 1,
      discount_type: DiscountType.PERCENTAGE,
      discount_value: 0,
      discount_amount: '0',
      sale_price: product.purchase_price,
      store_id: storeId,
    };

    addItemMutation.mutate(cartItem);
  };

  return {
    addProductToCart,
    isLoading: addItemMutation.isPending,
  };
};
