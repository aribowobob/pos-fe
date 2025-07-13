import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import useSearchProducts from '../useSearchProducts';

// Mock the fetcher
jest.mock('../../fetchers', () => ({
  searchProductsFn: jest.fn(),
}));

import { searchProductsFn } from '../../fetchers';

const mockSearchProductsFn = searchProductsFn as jest.MockedFunction<
  typeof searchProductsFn
>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  Wrapper.displayName = 'QueryClientWrapper';

  return Wrapper;
};

describe('useSearchProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not call the API when search query is empty', () => {
    const wrapper = createWrapper();

    renderHook(
      () =>
        useSearchProducts({
          search: '',
          size: '20',
        }),
      { wrapper }
    );

    expect(mockSearchProductsFn).not.toHaveBeenCalled();
  });

  it('should not call the API when search query is not provided', () => {
    const wrapper = createWrapper();

    renderHook(
      () =>
        useSearchProducts({
          size: '20',
        }),
      { wrapper }
    );

    expect(mockSearchProductsFn).not.toHaveBeenCalled();
  });

  it('should call the API with correct parameters when search query is provided', async () => {
    const mockResponse = {
      status: 'success',
      message: 'Products retrieved successfully',
      data: {
        items: [
          {
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
          },
        ],
        page: 1,
        size: 20,
        total: 1,
        total_pages: 1,
      },
    };

    mockSearchProductsFn.mockResolvedValue(mockResponse);

    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useSearchProducts({
          search: 'test',
          size: '20',
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockSearchProductsFn).toHaveBeenCalledWith({
      search: 'test',
      size: '20',
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    const mockError = new Error('API Error');
    mockSearchProductsFn.mockRejectedValue(mockError);

    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useSearchProducts({
          search: 'test',
          size: '20',
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
  });

  it('should use correct default parameters', async () => {
    mockSearchProductsFn.mockResolvedValue({
      status: 'success',
      message: 'Products retrieved successfully',
      data: {
        items: [],
        page: 1,
        size: 20,
        total: 0,
        total_pages: 0,
      },
    });

    const wrapper = createWrapper();

    renderHook(
      () =>
        useSearchProducts({
          search: 'test',
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(mockSearchProductsFn).toHaveBeenCalledWith({
        search: 'test',
      });
    });
  });
});
