'use client';

import { useAddProductForm } from '../hooks/useAddProductForm';
import { ProductForm } from '@/components/forms';

export function AddProductForm() {
  const {
    form,
    onSubmit,
    isSubmitting,
    back,
    categoriesData,
    categoriesLoading,
  } = useAddProductForm();

  return (
    <ProductForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onCancel={back}
      categoriesData={categoriesData}
      categoriesLoading={categoriesLoading}
      submitButtonText="Simpan Produk"
      title="Informasi Produk"
    />
  );
}
