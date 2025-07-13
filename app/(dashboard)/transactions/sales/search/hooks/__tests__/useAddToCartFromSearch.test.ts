import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRouter } from 'next/navigation';

import { useAddToCartFromSearch } from '../useAddToCartFromSearch';
import { ProductType } from '@/lib/types';

// Mock external dependencies
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

jest.mock('../../../fetchers/add-item', () => ({
  addToSalesCartFn: jest.fn(),
}));

import { toast } from 'sonner';
import { addToSalesCartFn } from '../../../fetchers/add-item';

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockAddToSalesCartFn = addToSalesCartFn as jest.MockedFunction<
  typeof addToSalesCartFn
>;
const mockToast = toast as jest.Mocked<typeof toast>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  Wrapper.displayName = 'QueryClientWrapper';

  return Wrapper;
};

describe('useAddToCartFromSearch', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      back: mockBack,
      forward: jest.fn(),
      refresh: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it('should successfully add product to cart', async () => {
    const mockCartItem = {
      id: 1,
      user_id: 1,
      store_id: 1,
      product_id: 1,
      base_price: '15000',
      qty: 1,
      discount_type: 'percentage' as const,
      discount_value: 0,
      discount_amount: '0',
      sale_price: '15000',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    };

    const mockResponse = {
      status: 'success',
      message: 'Item added to cart',
      data: mockCartItem,
    };

    mockAddToSalesCartFn.mockResolvedValue(mockResponse);

    const wrapper = createWrapper();

    const { result } = renderHook(() => useAddToCartFromSearch(), { wrapper });

    const testProduct: ProductType = {
      id: 1,
      sku: 'PROD001',
      name: 'Test Product',
      purchase_price: '10000',
      sale_price: '15000',
      company_id: 1,
      unit_name: 'pcs',
      category_id: 1,
      stock: 10,
      deleted_at: null,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    };

    await act(async () => {
      result.current.addProductToCart(testProduct);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockAddToSalesCartFn).toHaveBeenCalledWith({
      product_id: 1,
      base_price: '15000',
      qty: 1,
      discount_type: 'percentage',
      discount_value: 0,
      discount_amount: '0',
      sale_price: '15000',
      store_id: 1,
    });

    expect(mockToast.success).toHaveBeenCalledWith(
      'Produk berhasil ditambahkan ke keranjang'
    );
    expect(mockBack).toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    mockAddToSalesCartFn.mockRejectedValue(mockError);

    const wrapper = createWrapper();

    const { result } = renderHook(() => useAddToCartFromSearch(), { wrapper });

    const testProduct: ProductType = {
      id: 1,
      sku: 'PROD001',
      name: 'Test Product',
      purchase_price: '10000',
      sale_price: '15000',
      company_id: 1,
      unit_name: 'pcs',
      category_id: 1,
      stock: 10,
      deleted_at: null,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    };

    await act(async () => {
      result.current.addProductToCart(testProduct);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockToast.error).toHaveBeenCalledWith('An error occurred');
    expect(mockBack).not.toHaveBeenCalled();
  });
});
