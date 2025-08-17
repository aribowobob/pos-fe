'use client';

import { useEditProductForm } from '../hooks';
import { ProductForm } from '@/components/forms';
import { Loader } from '@/components/ui/loader';

interface EditProductFormProps {
  productId: string;
}

export function EditProductForm({ productId }: EditProductFormProps) {
  const {
    form,
    onSubmit,
    isSubmitting,
    back,
    categoriesData,
    categoriesLoading,
    productLoading,
    productError,
  } = useEditProductForm(productId);

  if (productLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader />
      </div>
    );
  }

  if (productError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Gagal memuat data produk. Silakan coba lagi.</p>
      </div>
    );
  }

  return (
    <ProductForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onCancel={back}
      categoriesData={categoriesData}
      categoriesLoading={categoriesLoading}
      submitButtonText="Perbarui Produk"
      title="Edit Informasi Produk"
    />
  );
}
