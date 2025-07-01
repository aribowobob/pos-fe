'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

type FormData = z.infer<typeof formSchema>;

// Dummy category options
const categoryOptions = [
  { id: '1', name: 'Makanan & Minuman' },
  { id: '2', name: 'Elektronik' },
  { id: '3', name: 'Pakaian' },
  { id: '4', name: 'Kesehatan & Kecantikan' },
  { id: '5', name: 'Peralatan Rumah Tangga' },
];

export function AddProductForm() {
  const router = useRouter();

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

  const onSubmit = (data: FormData) => {
    // Empty function as requested
    console.log('Form submitted:', data);

    // Redirect to product list page
    router.push('/settings/products');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Produk</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan SKU produk"
                        maxLength={32}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama produk"
                        maxLength={128}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchase_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Beli</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan harga beli"
                        {...field}
                        onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sale_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Jual</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan harga jual"
                        {...field}
                        onChange={e => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Satuan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan satuan produk"
                        maxLength={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori produk" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit">Simpan Produk</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/settings/products')}
              >
                Batal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
