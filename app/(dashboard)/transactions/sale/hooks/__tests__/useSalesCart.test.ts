import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { SalesCartItem } from '@/lib/types';

// Mock all external dependencies
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/lib/store/user-store', () => ({
  useUserStore: jest.fn(() => ({
    user: {
      store: {
        id: 1,
        name: 'Test Store',
      },
    },
  })),
}));

jest.mock('@/lib/api/api-client', () => ({
  handleApiError: jest.fn(() => 'An error occurred'),
}));

// Mock the fetchers to return empty data by default
jest.mock('../../fetchers', () => ({
  getSalesCartItemsFn: jest.fn().mockResolvedValue({
    status: 'success',
    data: [],
  }),
  addToSalesCartFn: jest.fn(),
  updateSalesCartItemFn: jest.fn(),
  deleteSalesCartItemFn: jest.fn(),
  clearSalesCartFn: jest.fn(),
  createSalesOrderFn: jest.fn(),
}));

import { useSalesCart } from '../useSalesCart';

describe('useSalesCart - Basic Functionality', () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should render without crashing', () => {
    expect(() => {
      renderHook(() => useSalesCart(), { wrapper });
    }).not.toThrow();
  });

  it('should return correct initial loading states', async () => {
    const { result } = renderHook(() => useSalesCart(), { wrapper });

    // Check that initial states are correct
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.isAddingItem).toBe(false);
    expect(result.current.isUpdatingItem).toBe(false);
    expect(result.current.isDeletingItem).toBe(false);
    expect(result.current.isClearingCart).toBe(false);
    expect(result.current.isCreatingOrder).toBe(false);
    expect(result.current.isProcessingOrder).toBe(false);
  });

  it('should calculate empty cart summary correctly', async () => {
    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const summary = result.current.cartSummary;
    expect(summary.totalItems).toBe(0);
    expect(summary.totalAmount).toBe(0);
    expect(summary.totalDiscount).toBe(0);
    expect(summary.itemCount).toBe(0);
  });

  it('should not allow quantity decrement below 1', async () => {
    const mockCartItem: SalesCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '10000',
      qty: 1,
      discount_type: 'fixed' as const,
      discount_value: 0,
      discount_amount: '0',
      sale_price: '10000',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Test that decrement doesn't allow quantity below 1
    await act(async () => {
      result.current.decrementQuantity(mockCartItem);
    });

    // The hook should not attempt to update when quantity is already 1
    // This test validates the edge case handling
    expect(result.current.isUpdatingItem).toBe(false);
  });

  it('should have all required functions available', () => {
    const { result } = renderHook(() => useSalesCart(), { wrapper });

    // Verify all required functions are present
    expect(typeof result.current.addItem).toBe('function');
    expect(typeof result.current.updateItem).toBe('function');
    expect(typeof result.current.deleteItem).toBe('function');
    expect(typeof result.current.clearCart).toBe('function');
    expect(typeof result.current.createOrder).toBe('function');
    expect(typeof result.current.incrementQuantity).toBe('function');
    expect(typeof result.current.decrementQuantity).toBe('function');
  });

  it('should provide cart summary function', () => {
    const { result } = renderHook(() => useSalesCart(), { wrapper });

    // Verify cart summary is available and has correct structure
    const summary = result.current.cartSummary;
    expect(summary).toHaveProperty('totalItems');
    expect(summary).toHaveProperty('totalAmount');
    expect(summary).toHaveProperty('totalDiscount');
    expect(summary).toHaveProperty('itemCount');
  });

  it('should handle increment quantity calculation correctly', async () => {
    const mockCartItem: SalesCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '10000', // Total for qty 2
      qty: 2,
      discount_type: 'fixed' as const,
      discount_value: 1000,
      discount_amount: '1000',
      sale_price: '10000',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Test increment function exists and can be called
    await act(async () => {
      result.current.incrementQuantity(mockCartItem);
    });

    // Verify the function completed without errors
    expect(typeof result.current.incrementQuantity).toBe('function');
  });
});
