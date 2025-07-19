'use client';

import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUserStore } from '@/lib/store/user-store';
import { handleApiError } from '@/lib/api/api-client';
import {
  SalesCartItem,
  UpdateCartItemRequest,
  CreateOrderRequest,
} from '@/lib/types';

// Import fetcher functions
import { getSalesCartItemsFn } from '../fetchers/get-items';
import { updateSalesCartItemFn } from '../fetchers/update-item';
import { deleteSalesCartItemFn } from '../fetchers/delete-item';
import { clearSalesCartFn } from '../fetchers/clear-sales-cart';
import { createSalesOrderFn } from '../fetchers/create-order';

export const useSalesCart = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [editItem, setEditItem] = useState<SalesCartItem | null>(null);

  const storeId = user?.store?.id;

  // Query to get cart items
  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sales-cart', storeId],
    queryFn: () => {
      if (!storeId) throw new Error('Store ID is required');
      return getSalesCartItemsFn(storeId);
    },
    enabled: !!storeId,
  });

  // Calculate cart totals
  const cartSummary = useCallback(() => {
    const items = cartItems?.data || [];
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.sale_price) * item.qty,
      0
    );
    const totalDiscount = items.reduce(
      (sum, item) => sum + parseFloat(item.discount_amount),
      0
    );

    return {
      totalItems,
      totalAmount,
      totalDiscount,
      itemCount: items.length,
    };
  }, [cartItems]);

  // Update item mutation
  const updateItemMutation = useMutation({
    mutationFn: ({
      itemId,
      update,
    }: {
      itemId: number;
      update: UpdateCartItemRequest;
    }) => updateSalesCartItemFn(itemId, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
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
    mutationFn: deleteSalesCartItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
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
      return clearSalesCartFn(storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success('Keranjang berhasil dikosongkan');
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: createSalesOrderFn,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['sales-cart', storeId] });
      toast.success(
        `Order berhasil dibuat dengan nomor: ${data.data.order.order_number}`
      );
      setIsProcessingOrder(false);
    },
    onError: error => {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      setIsProcessingOrder(false);
    },
  });

  // Helper functions
  const updateItem = useCallback(
    (itemId: number, update: UpdateCartItemRequest) => {
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
    (order: CreateOrderRequest) => {
      setIsProcessingOrder(true);
      createOrderMutation.mutate(order);
    },
    [createOrderMutation]
  );

  // Increment item quantity
  const incrementQuantity = useCallback(
    (item: SalesCartItem) => {
      const newQty = item.qty + 1;

      updateItem(item.id, {
        qty: newQty,
      });
    },
    [updateItem]
  );

  // Decrement item quantity
  const decrementQuantity = useCallback(
    (item: SalesCartItem) => {
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
    cartSummary: cartSummary(),
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
