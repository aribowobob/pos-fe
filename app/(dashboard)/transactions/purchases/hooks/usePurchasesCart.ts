'use client';

import { useState, useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import {
  PurchasesCartItem,
  UpdatePurchasesCartItemRequest,
  CreatePurchasesOrderRequest,
  PurchasesCartSummaryType,
} from '@/lib/types';

// Import fetcher functions
import { getPurchasesCartItemsFn } from '../fetchers/get-items';
import { updatePurchasesCartItemFn } from '../fetchers/update-item';
import { deletePurchasesCartItemFn } from '../fetchers/delete-item';
import { clearPurchasesCartFn } from '../fetchers/clear-purchases-cart';
import { createPurchasesOrderFn } from '../fetchers/create-order';

export const usePurchasesCart = () => {
  const { replace } = useRouter();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [editItem, setEditItem] = useState<PurchasesCartItem | null>(null);

  const storeId = user?.store?.id;

  // Query to get cart items
  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['purchases-cart', storeId],
    queryFn: () => {
      if (!storeId) throw new Error('Store ID is required');
      return getPurchasesCartItemsFn(storeId);
    },
    enabled: !!storeId,
  });

  // Calculate cart totals
  const cartSummary = useMemo<PurchasesCartSummaryType>(() => {
    const items = cartItems?.data ?? [];
    const totalItems = items.length;
    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
    const totalPurchaseAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.base_price) * item.qty,
      0
    );
    const totalDiscountAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.discount_amount) * item.qty,
      0
    );
    const grandTotal = totalPurchaseAmount - totalDiscountAmount;

    return {
      totalItems,
      totalQty,
      totalPurchaseAmount,
      totalDiscountAmount,
      grandTotal,
    };
  }, [cartItems]);

  // Update item mutation
  const updateItemMutation = useMutation({
    mutationFn: ({
      itemId,
      update,
    }: {
      itemId: number;
      update: UpdatePurchasesCartItemRequest;
    }) => updatePurchasesCartItemFn(itemId, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases-cart', storeId] });
      toast.success('Item berhasil diperbarui');

      if (editItem) {
        setEditItem(null);
      }
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });

  // Delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: deletePurchasesCartItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases-cart', storeId] });
      toast.success('Item berhasil dihapus dari keranjang');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => {
      if (!storeId) throw new Error('Store ID is required');
      return clearPurchasesCartFn(storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases-cart', storeId] });
      toast.success('Keranjang berhasil dikosongkan');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: createPurchasesOrderFn,
    onSuccess: data => {
      const orderId = data.data.id; // API returns PurchasesOrder directly
      queryClient.invalidateQueries({ queryKey: ['purchases-cart', storeId] });
      replace(`/transactions/purchases/${orderId}?success=true`);
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      setIsProcessingOrder(false);
    },
  });

  // Helper functions
  const updateItem = useCallback(
    (itemId: number, update: UpdatePurchasesCartItemRequest) => {
      updateItemMutation.mutate({ itemId, update });
    },
    [updateItemMutation]
  );

  const deleteItem = useCallback(
    (itemId: number) => {
      deleteItemMutation.mutate(itemId);
    },
    [deleteItemMutation]
  );

  const clearCart = useCallback(() => {
    clearCartMutation.mutate();
  }, [clearCartMutation]);

  const createOrder = useCallback(
    (order: CreatePurchasesOrderRequest) => {
      setIsProcessingOrder(true);
      createOrderMutation.mutate(order);
    },
    [createOrderMutation]
  );

  // Increment item quantity
  const incrementQuantity = useCallback(
    (item: PurchasesCartItem) => {
      const newQty = item.qty + 1;

      updateItem(item.id, {
        qty: newQty,
      });
    },
    [updateItem]
  );

  // Decrement item quantity
  const decrementQuantity = useCallback(
    (item: PurchasesCartItem) => {
      if (item.qty <= 1) return; // Don't allow quantity below 1

      const newQty = item.qty - 1;

      updateItem(item.id, {
        qty: newQty,
      });
    },
    [updateItem]
  );

  return {
    // Data
    cartItems: cartItems?.data || [],
    cartSummary,
    editItem,

    // Setters
    setEditItem,

    // Loading states
    isLoading,
    isProcessingOrder,

    // Mutation states
    isUpdatingItem: updateItemMutation.isPending,
    isDeletingItem: deleteItemMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
    isCreatingOrder: createOrderMutation.isPending,

    // Actions
    updateItem,
    deleteItem,
    clearCart,
    createOrder,
    incrementQuantity,
    decrementQuantity,

    // Error
    error,
  };
};
