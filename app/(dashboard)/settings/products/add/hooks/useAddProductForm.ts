'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import useCreateProduct from './useCreateProduct';
import useGetProductCategories from './useGetProductCategories';
import { handleApiError } from '@/lib/api/api-client';

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

export type FormData = z.infer<typeof formSchema>;

export function useAddProductForm() {
  const { back } = useRouter();
  const createProductMutation = useCreateProduct();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategories();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: '',
      name: '',
      purchase_price: '',
      sale_price: '',
      unit_name: 'pcs',
      category_id: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createProductMutation.mutateAsync({
        sku: data.sku,
        name: data.name,
        purchase_price: data.purchase_price,
        sale_price: data.sale_price,
        unit_name: data.unit_name,
        category_id: parseInt(data.category_id),
      });

      toast.success('Produk berhasil ditambahkan!');
      back();
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: createProductMutation.isPending,
    back,
    categoriesData,
    categoriesLoading,
  };
}
