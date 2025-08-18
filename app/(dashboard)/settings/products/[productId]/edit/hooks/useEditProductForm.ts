'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import useGetDetailProduct from '../../../hooks/useGetDetailProduct';
import useUpdateProduct from '../../../hooks/useUpdateProduct';
import useGetProductCategories from '../../../add/hooks/useGetProductCategories';
import { handleApiError } from '@/lib/api/api-client';
import { ProductFormData } from '@/components/forms';

// Form validation schema
const formSchema = z.object({
  sku: z.string().min(1, 'SKU harus diisi').max(32, 'SKU maksimal 32 karakter'),
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

export function useEditProductForm(productId: string) {
  const { back } = useRouter();
  const updateProductMutation = useUpdateProduct();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategories();

  // Get product detail
  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetDetailProduct(parseInt(productId));

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: '',
      name: '',
      purchase_price: '',
      sale_price: '',
      unit_name: '',
      category_id: '',
    },
  });

  // Set form values when product data is loaded
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;

      // Set all values except category_id first
      form.setValue('sku', product.sku);
      form.setValue('name', product.name);
      form.setValue('purchase_price', product.purchase_price);
      form.setValue('sale_price', product.sale_price);
      form.setValue('unit_name', product.unit_name);

      // Set category_id with a small delay to ensure Select component is ready
      setTimeout(() => {
        form.setValue('category_id', product.category_id.toString());
      }, 100);
    }
  }, [productData, form]);

  // Re-set category_id when categories finish loading to fix Select component value loss
  useEffect(() => {
    if (
      productData?.data &&
      categoriesData?.data?.items &&
      !categoriesLoading
    ) {
      const productCategoryId = productData.data.category_id.toString();

      // Always set the category_id when categories are loaded to ensure it's not lost
      setTimeout(() => {
        form.setValue('category_id', productCategoryId, {
          shouldValidate: true,
        });
      }, 50);
    }
  }, [categoriesData, categoriesLoading, productData, form]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await updateProductMutation.mutateAsync({
        id: parseInt(productId),
        sku: data.sku,
        name: data.name,
        purchase_price: data.purchase_price,
        sale_price: data.sale_price,
        unit_name: data.unit_name,
        category_id: parseInt(data.category_id),
      });

      toast.success('Produk berhasil diperbarui!');
      back();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: updateProductMutation.isPending,
    back,
    categoriesData,
    categoriesLoading,
    productData: productData?.data,
    productLoading,
    productError,
  };
}
