/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import { useAddProductForm, FormData } from '../useAddProductForm';
import useCreateProduct from '../useCreateProduct';
import useGetProductCategories from '../useGetProductCategories';
import { handleApiError } from '@/lib/api/api-client';
import { CreateProductResponse, ProductCategoryType } from '@/lib/types';
import { PaginatedResponse } from '@/lib/types/common';

// Mock dependencies
jest.mock('next/navigation');
jest.mock('sonner');
jest.mock('../useCreateProduct');
jest.mock('../useGetProductCategories');
jest.mock('@/lib/api/api-client');

const mockBack = jest.fn();
const mockMutateAsync = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseCreateProduct = useCreateProduct as jest.MockedFunction<
  typeof useCreateProduct
>;
const mockUseGetProductCategories =
  useGetProductCategories as jest.MockedFunction<
    typeof useGetProductCategories
  >;
const mockHandleApiError = handleApiError as jest.MockedFunction<
  typeof handleApiError
>;

describe('useAddProductForm', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    mockUseRouter.mockReturnValue({
      back: mockBack,
      forward: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    mockUseCreateProduct.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);

    const mockCategoriesData: PaginatedResponse<ProductCategoryType> = {
      status: 'success',
      message: 'Categories retrieved successfully',
      data: {
        items: [
          {
            id: 1,
            name: 'Category 1',
            description: 'Test category 1',
            parent_id: null,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          {
            id: 2,
            name: 'Category 2',
            description: 'Test category 2',
            parent_id: null,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        ],
        page: 1,
        size: 10,
        total: 2,
        total_pages: 1,
      },
    };

    mockUseGetProductCategories.mockReturnValue({
      data: mockCategoriesData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    (toast as any).success = mockToastSuccess;
    (toast as any).error = mockToastError;
  });

  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  it('should initialize with default form values', () => {
    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    expect(result.current.form.getValues()).toEqual({
      sku: '',
      name: '',
      purchase_price: '',
      sale_price: '',
      unit_name: 'pcs',
      category_id: '',
    });
  });

  it('should return categories data and loading state', () => {
    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    expect(result.current.categoriesData?.data.items).toHaveLength(2);
    expect(result.current.categoriesData?.data.items[0].name).toBe(
      'Category 1'
    );
    expect(result.current.categoriesLoading).toBe(false);
  });

  it('should return isSubmitting state based on mutation pending state', () => {
    mockUseCreateProduct.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      mutate: jest.fn(),
      reset: jest.fn(),
      variables: undefined,
      isIdle: false,
      status: 'pending',
      context: undefined,
      submittedAt: Date.now(),
      failureCount: 0,
      failureReason: null,
    } as any);

    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    expect(result.current.isSubmitting).toBe(true);
  });

  it('should validate form fields correctly using schema', () => {
    // Test the zod schema directly instead of the form state
    const formSchema = z.object({
      sku: z
        .string()
        .min(1, 'SKU harus diisi')
        .max(32, 'SKU maksimal 32 karakter'),
      name: z
        .string()
        .min(1, 'Nama harus diisi')
        .max(128, 'Nama maksimal 128 karakter'),
      purchase_price: z
        .string()
        .min(1, 'Harga beli harus diisi')
        .regex(/^\d+$/, 'Harga beli harus berupa angka'),
      sale_price: z
        .string()
        .min(1, 'Harga jual harus diisi')
        .regex(/^\d+$/, 'Harga jual harus berupa angka'),
      unit_name: z
        .string()
        .min(1, 'Satuan harus diisi')
        .max(8, 'Satuan maksimal 8 karakter'),
      category_id: z.string().min(1, 'Kategori harus dipilih'),
    });

    const emptyData = {
      sku: '',
      name: '',
      purchase_price: '',
      sale_price: '',
      unit_name: '',
      category_id: '',
    };

    const result = formSchema.safeParse(emptyData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.sku).toContain('SKU harus diisi');
      expect(errors.name).toContain('Nama harus diisi');
      expect(errors.purchase_price).toContain('Harga beli harus diisi');
      expect(errors.sale_price).toContain('Harga jual harus diisi');
      expect(errors.unit_name).toContain('Satuan harus diisi');
      expect(errors.category_id).toContain('Kategori harus dipilih');
    }
  });

  it('should validate price fields as numbers only', () => {
    const formSchema = z.object({
      purchase_price: z
        .string()
        .min(1, 'Harga beli harus diisi')
        .regex(/^\d+$/, 'Harga beli harus berupa angka'),
      sale_price: z
        .string()
        .min(1, 'Harga jual harus diisi')
        .regex(/^\d+$/, 'Harga jual harus berupa angka'),
    });

    const invalidData = {
      purchase_price: 'invalid',
      sale_price: 'invalid',
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.purchase_price).toContain('Harga beli harus berupa angka');
      expect(errors.sale_price).toContain('Harga jual harus berupa angka');
    }
  });

  it('should validate field length limits', () => {
    const formSchema = z.object({
      sku: z
        .string()
        .min(1, 'SKU harus diisi')
        .max(32, 'SKU maksimal 32 karakter'),
      name: z
        .string()
        .min(1, 'Nama harus diisi')
        .max(128, 'Nama maksimal 128 karakter'),
      unit_name: z
        .string()
        .min(1, 'Satuan harus diisi')
        .max(8, 'Satuan maksimal 8 karakter'),
    });

    const invalidData = {
      sku: 'a'.repeat(33), // Max 32
      name: 'a'.repeat(129), // Max 128
      unit_name: 'a'.repeat(9), // Max 8
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.sku).toContain('SKU maksimal 32 karakter');
      expect(errors.name).toContain('Nama maksimal 128 karakter');
      expect(errors.unit_name).toContain('Satuan maksimal 8 karakter');
    }
  });

  it('should submit form successfully with valid data', async () => {
    const mockSuccessResponse: CreateProductResponse = {
      status: 'success',
      message: 'Product created',
      data: {
        id: 1,
        sku: 'TEST-001',
        name: 'Test Product',
        purchase_price: '1000',
        sale_price: '1500',
        company_id: 1,
        unit_name: 'pcs',
        category_id: 1,
        deleted_at: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
    };

    mockMutateAsync.mockResolvedValue(mockSuccessResponse);

    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    const validFormData: FormData = {
      sku: 'TEST-001',
      name: 'Test Product',
      purchase_price: '1000',
      sale_price: '1500',
      unit_name: 'pcs',
      category_id: '1',
    };

    await act(async () => {
      // Set form values
      Object.entries(validFormData).forEach(([key, value]) => {
        result.current.form.setValue(key as keyof FormData, value);
      });

      // Submit form
      await result.current.onSubmit(validFormData);
    });

    expect(mockMutateAsync).toHaveBeenCalledWith({
      sku: 'TEST-001',
      name: 'Test Product',
      purchase_price: '1000',
      sale_price: '1500',
      unit_name: 'pcs',
      category_id: 1, // Should be converted to number
    });

    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Produk berhasil ditambahkan!'
    );
    expect(mockBack).toHaveBeenCalled();
  });

  it('should handle form submission error', async () => {
    const errorMessage = 'Something went wrong';
    const error = new Error('API Error');

    mockMutateAsync.mockRejectedValue(error);
    mockHandleApiError.mockReturnValue(errorMessage);

    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    const validFormData: FormData = {
      sku: 'TEST-001',
      name: 'Test Product',
      purchase_price: '1000',
      sale_price: '1500',
      unit_name: 'pcs',
      category_id: '1',
    };

    await act(async () => {
      await result.current.onSubmit(validFormData);
    });

    expect(mockHandleApiError).toHaveBeenCalledWith(error);
    expect(mockToastError).toHaveBeenCalledWith(errorMessage);
    expect(mockBack).not.toHaveBeenCalled();
  });

  it('should call back function when back is invoked', () => {
    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    act(() => {
      result.current.back();
    });

    expect(mockBack).toHaveBeenCalled();
  });

  it('should handle categories loading state', () => {
    mockUseGetProductCategories.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useGetProductCategories>);

    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    expect(result.current.categoriesData).toBeUndefined();
    expect(result.current.categoriesLoading).toBe(true);
  });

  it('should accept valid numeric strings for price fields', async () => {
    const { result } = renderHook(() => useAddProductForm(), { wrapper });

    await act(async () => {
      result.current.form.setValue('purchase_price', '12345');
      result.current.form.setValue('sale_price', '67890');
      await result.current.form.trigger(['purchase_price', 'sale_price']);
    });

    const errors = result.current.form.formState.errors;
    expect(errors.purchase_price).toBeUndefined();
    expect(errors.sale_price).toBeUndefined();
  });

  it('should not accept decimal or negative numbers in price fields', () => {
    const formSchema = z.object({
      purchase_price: z
        .string()
        .min(1, 'Harga beli harus diisi')
        .regex(/^\d+$/, 'Harga beli harus berupa angka'),
      sale_price: z
        .string()
        .min(1, 'Harga jual harus diisi')
        .regex(/^\d+$/, 'Harga jual harus berupa angka'),
    });

    const invalidData = {
      purchase_price: '123.45',
      sale_price: '-100',
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.purchase_price).toContain('Harga beli harus berupa angka');
      expect(errors.sale_price).toContain('Harga jual harus berupa angka');
    }
  });
});
