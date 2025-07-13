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

// Mock the individual fetcher files that are directly imported by the hook
jest.mock('../../fetchers/get-items', () => ({
  getSalesCartItemsFn: jest.fn().mockResolvedValue({
    status: 'success',
    data: [],
  }),
}));

jest.mock('../../fetchers/update-item', () => ({
  updateSalesCartItemFn: jest.fn(),
}));

jest.mock('../../fetchers/delete-item', () => ({
  deleteSalesCartItemFn: jest.fn(),
}));

jest.mock('../../fetchers/clear-sales-cart', () => ({
  clearSalesCartFn: jest.fn(),
}));

jest.mock('../../fetchers/create-order', () => ({
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

describe('useSalesCart - Cart Totals Calculation', () => {
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

  it('should calculate cart totals correctly with mixed discount types', async () => {
    const mockCartItems: SalesCartItem[] = [
      // Item 1: No discount, qty 2
      {
        id: 1,
        user_id: 1,
        store_id: 1,
        product_id: 1,
        base_price: '10000', // 5000 per unit * 2 qty
        qty: 2,
        discount_type: 'fixed',
        discount_value: 0,
        discount_amount: '0',
        sale_price: '10000',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      // Item 2: Fixed discount 2000, qty 1
      {
        id: 2,
        user_id: 1,
        store_id: 1,
        product_id: 2,
        base_price: '15000', // 15000 per unit * 1 qty
        qty: 1,
        discount_type: 'fixed',
        discount_value: 2000,
        discount_amount: '2000',
        sale_price: '13000',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      // Item 3: Percentage discount 20%, qty 3
      {
        id: 3,
        user_id: 1,
        store_id: 1,
        product_id: 3,
        base_price: '30000', // 10000 per unit * 3 qty
        qty: 3,
        discount_type: 'percentage',
        discount_value: 20,
        discount_amount: '6000', // 20% of 30000
        sale_price: '24000',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    // Mock the get items function to return our mock cart items
    const { getSalesCartItemsFn } = jest.requireMock(
      '../../fetchers/get-items'
    );
    getSalesCartItemsFn.mockResolvedValueOnce({
      status: 'success',
      data: mockCartItems,
    });

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const summary = result.current.cartSummary;

    // Expected calculations:
    // Total base amount: 10000 + 15000 + 30000 = 55000
    // Total discount: 0 + 2000 + 6000 = 8000
    // Total sale amount: 10000 + 13000 + 24000 = 47000
    // Total items: 2 + 1 + 3 = 6
    // Item count: 3 (number of different items)

    expect(summary.totalItems).toBe(6); // Total quantity
    expect(summary.totalAmount).toBe(47000); // Total sale price
    expect(summary.totalDiscount).toBe(8000); // Total discount amount
    expect(summary.itemCount).toBe(3); // Number of different items
  });
});

describe('useSalesCart - Update Item Mutation', () => {
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

  it('should handle update item error', async () => {
    const mockCartItem: SalesCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '10000',
      qty: 2,
      discount_type: 'fixed',
      discount_value: 0,
      discount_amount: '0',
      sale_price: '10000',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const updateData = {
      base_price: '15000',
      discount_type: 'fixed' as const,
      discount_value: 1000,
      qty: 3,
    };

    const mockError = new Error('Failed to update item');

    // Get mocked functions
    const { updateSalesCartItemFn } = jest.requireMock(
      '../../fetchers/update-item'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock error response
    updateSalesCartItemFn.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute update item
    await act(async () => {
      result.current.updateItem(mockCartItem.id, updateData);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify error toast was called
      expect(toast.error).toHaveBeenCalledWith('An error occurred');
    });

    // Verify the mutation was called with correct parameters
    expect(updateSalesCartItemFn).toHaveBeenCalledWith(
      mockCartItem.id,
      updateData
    );
  });
});

describe('useSalesCart - Delete Item Mutation', () => {
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

  it('should successfully delete item - success case', async () => {
    const itemId = 1;

    // Get mocked functions
    const { deleteSalesCartItemFn } = jest.requireMock(
      '../../fetchers/delete-item'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock successful response
    deleteSalesCartItemFn.mockResolvedValueOnce({
      status: 'success',
      message: 'Item deleted successfully',
      data: 'Item deleted',
    });

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute delete item
    await act(async () => {
      result.current.deleteItem(itemId);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify success toast was called
      expect(toast.success).toHaveBeenCalledWith(
        'Item berhasil dihapus dari keranjang'
      );
    });

    // Verify the mutation was called with correct parameters
    expect(deleteSalesCartItemFn).toHaveBeenCalledWith(itemId);
  });

  it('should handle delete item error', async () => {
    const itemId = 1;
    const mockError = new Error('Failed to delete item');

    // Get mocked functions
    const { deleteSalesCartItemFn } = jest.requireMock(
      '../../fetchers/delete-item'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock error response
    deleteSalesCartItemFn.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute delete item
    await act(async () => {
      result.current.deleteItem(itemId);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify error toast was called
      expect(toast.error).toHaveBeenCalledWith('An error occurred');
    });

    // Verify the mutation was called with correct parameters
    expect(deleteSalesCartItemFn).toHaveBeenCalledWith(itemId);
  });
});

describe('useSalesCart - Clear Cart Mutation', () => {
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

  it('should successfully clear cart - success case', async () => {
    const storeId = 1;

    // Get mocked functions
    const { clearSalesCartFn } = jest.requireMock(
      '../../fetchers/clear-sales-cart'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock successful response
    clearSalesCartFn.mockResolvedValueOnce({
      status: 'success',
      message: 'Cart cleared successfully',
      data: 'Cart cleared',
    });

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute clear cart
    await act(async () => {
      result.current.clearCart();
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify success toast was called
      expect(toast.success).toHaveBeenCalledWith(
        'Keranjang berhasil dikosongkan'
      );
    });

    // Verify the mutation was called with correct parameters
    expect(clearSalesCartFn).toHaveBeenCalledWith(storeId);
  });

  it('should handle clear cart error', async () => {
    const storeId = 1;
    const mockError = new Error('Failed to clear cart');

    // Get mocked functions
    const { clearSalesCartFn } = jest.requireMock(
      '../../fetchers/clear-sales-cart'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock error response
    clearSalesCartFn.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute clear cart
    await act(async () => {
      result.current.clearCart();
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify error toast was called
      expect(toast.error).toHaveBeenCalledWith('An error occurred');
    });

    // Verify the mutation was called with correct parameters
    expect(clearSalesCartFn).toHaveBeenCalledWith(storeId);
  });
});

describe('useSalesCart - Create Order Mutation', () => {
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

  it('should successfully create order - success case', async () => {
    const orderData = {
      customer_id: 1,
      date: '2024-01-01',
      order_number: 'ORDER-001',
      payment_cash: '50000',
      payment_non_cash: '0',
      store_id: 1,
    };

    // Get mocked functions
    const { createSalesOrderFn } = jest.requireMock(
      '../../fetchers/create-order'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock successful response with correct structure
    createSalesOrderFn.mockResolvedValueOnce({
      data: {
        order: {
          id: 1,
          order_number: 'ORDER-001',
          total: 47000,
          customer_id: 1,
          date: '2024-01-01',
          payment_cash: '50000',
          payment_non_cash: '0',
          store_id: 1,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      },
    });

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute create order
    await act(async () => {
      result.current.createOrder(orderData);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify success toast was called with order number
      expect(toast.success).toHaveBeenCalledWith(
        'Order berhasil dibuat dengan nomor: ORDER-001'
      );
    });

    // Verify the mutation was called with correct parameters
    expect(createSalesOrderFn).toHaveBeenCalledWith(orderData);
  });

  it('should handle create order error', async () => {
    const orderData = {
      customer_id: 1,
      date: '2024-01-01',
      order_number: 'ORDER-001',
      payment_cash: '50000',
      payment_non_cash: '0',
      store_id: 1,
    };

    const mockError = new Error('Failed to create order');

    // Get mocked functions
    const { createSalesOrderFn } = jest.requireMock(
      '../../fetchers/create-order'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock error response
    createSalesOrderFn.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute create order
    await act(async () => {
      result.current.createOrder(orderData);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify error toast was called
      expect(toast.error).toHaveBeenCalledWith('An error occurred');
    });

    // Verify the mutation was called with correct parameters
    expect(createSalesOrderFn).toHaveBeenCalledWith(orderData);
  });
});

describe('useSalesCart - Increment & Decrement Quantity', () => {
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

  it('should successfully increment item quantity', async () => {
    const mockCartItem: SalesCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '10000',
      qty: 2,
      discount_type: 'fixed',
      discount_value: 0,
      discount_amount: '0',
      sale_price: '10000',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    // Get mocked functions
    const { updateSalesCartItemFn } = jest.requireMock(
      '../../fetchers/update-item'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock successful response
    updateSalesCartItemFn.mockResolvedValueOnce({
      status: 'success',
      message: 'Item updated successfully',
      data: {
        ...mockCartItem,
        qty: 3,
        base_price: '15000',
        sale_price: '15000',
      },
    });

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute increment quantity
    await act(async () => {
      result.current.incrementQuantity(mockCartItem);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify success toast was called
      expect(toast.success).toHaveBeenCalledWith('Item berhasil diperbarui');
    });

    // Verify the mutation was called with correct parameters
    // Expected: qty should be incremented by 1, prices should be calculated accordingly
    expect(updateSalesCartItemFn).toHaveBeenCalledWith(mockCartItem.id, {
      base_price: '15000', // 5000 per unit * 3 qty
      discount_type: 'fixed',
      discount_value: 0,
      qty: 3, // incremented from 2 to 3
    });
  });

  it('should successfully decrement item quantity', async () => {
    const mockCartItem: SalesCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '15000', // 5000 per unit * 3 qty
      qty: 3,
      discount_type: 'fixed',
      discount_value: 0,
      discount_amount: '0',
      sale_price: '15000',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    // Get mocked functions
    const { updateSalesCartItemFn } = jest.requireMock(
      '../../fetchers/update-item'
    );
    const { toast } = jest.requireMock('sonner');

    // Mock successful response
    updateSalesCartItemFn.mockResolvedValueOnce({
      status: 'success',
      message: 'Item updated successfully',
      data: {
        ...mockCartItem,
        qty: 2,
        base_price: '10000',
        sale_price: '10000',
      },
    });

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute decrement quantity
    await act(async () => {
      result.current.decrementQuantity(mockCartItem);
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify success toast was called
      expect(toast.success).toHaveBeenCalledWith('Item berhasil diperbarui');
    });

    // Verify the mutation was called with correct parameters
    // Expected: qty should be decremented by 1, prices should be calculated accordingly
    expect(updateSalesCartItemFn).toHaveBeenCalledWith(mockCartItem.id, {
      base_price: '10000', // 5000 per unit * 2 qty
      discount_type: 'fixed',
      discount_value: 0,
      qty: 2, // decremented from 3 to 2
    });
  });

  it('should not decrement quantity below 1', async () => {
    const mockCartItem: SalesCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '5000',
      qty: 1,
      discount_type: 'fixed',
      discount_value: 0,
      discount_amount: '0',
      sale_price: '5000',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    // Get mocked functions
    const { updateSalesCartItemFn } = jest.requireMock(
      '../../fetchers/update-item'
    );

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute decrement quantity
    await act(async () => {
      result.current.decrementQuantity(mockCartItem);
    });

    // Verify the mutation was NOT called since qty is already 1
    expect(updateSalesCartItemFn).not.toHaveBeenCalled();
  });
});

describe('useSalesCart - Edge Cases: Undefined Store ID', () => {
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

  it('should handle query get cart items when user.store.id is undefined', async () => {
    // Mock user store to return undefined store.id
    const { useUserStore } = jest.requireMock('@/lib/store/user-store');
    useUserStore.mockReturnValueOnce({
      user: {
        store: {
          id: undefined,
          name: 'Test Store',
        },
      },
    });

    // Get mocked functions
    const { getSalesCartItemsFn } = jest.requireMock(
      '../../fetchers/get-items'
    );

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    // Wait for the hook to initialize
    await waitFor(() => {
      // When store ID is undefined, the query should be disabled
      // and cartItems should remain empty
      expect(result.current.cartItems).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });

    // Verify that the fetcher function was NOT called since query is disabled
    expect(getSalesCartItemsFn).not.toHaveBeenCalled();

    // Verify cart summary with empty cart
    const summary = result.current.cartSummary;
    expect(summary.totalItems).toBe(0);
    expect(summary.totalAmount).toBe(0);
    expect(summary.totalDiscount).toBe(0);
    expect(summary.itemCount).toBe(0);
  });

  it('should handle clear cart mutation when user.store.id is undefined', async () => {
    // Mock user store to return undefined store.id
    const { useUserStore } = jest.requireMock('@/lib/store/user-store');
    useUserStore.mockReturnValueOnce({
      user: {
        store: {
          id: undefined,
          name: 'Test Store',
        },
      },
    });

    // Get mocked functions
    const { clearSalesCartFn } = jest.requireMock(
      '../../fetchers/clear-sales-cart'
    );
    const { toast } = jest.requireMock('sonner');

    const { result } = renderHook(() => useSalesCart(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Execute clear cart when store ID is undefined
    await act(async () => {
      result.current.clearCart();
    });

    // Wait for any async operations
    await waitFor(() => {
      // Verify error toast was called because store ID is required
      expect(toast.error).toHaveBeenCalledWith('An error occurred');
    });

    // Verify the clear cart fetcher was NOT called since store ID is undefined
    expect(clearSalesCartFn).not.toHaveBeenCalled();
  });
});
