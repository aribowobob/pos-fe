'use client';

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
import { InputNumber } from '@/components/input-number';
import { UseFormReturn } from 'react-hook-form';
import { PaginatedResponse, ProductCategoryType } from '@/lib/types';

export interface ProductFormData {
  sku: string;
  name: string;
  purchase_price: string;
  sale_price: string;
  unit_name: string;
  category_id: string;
}

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  categoriesData?: PaginatedResponse<ProductCategoryType>;
  categoriesLoading: boolean;
  submitButtonText?: string;
  title?: string;
}

export function ProductForm({
  form,
  onSubmit,
  isSubmitting,
  onCancel,
  categoriesData,
  categoriesLoading,
  submitButtonText = 'Simpan Produk',
  title = 'Informasi Produk',
}: ProductFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
                        onChange={e => {
                          const value = e.target.value
                            .replace(/[^a-zA-Z0-9-]/g, '')
                            .toUpperCase();
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
                      <InputNumber
                        placeholder="Rp 0"
                        min={0}
                        prefix="Rp "
                        {...field}
                        onChange={value => {
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
                      <InputNumber
                        placeholder="Rp 0"
                        min={0}
                        prefix="Rp "
                        {...field}
                        onChange={value => {
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
                      value={field.value}
                      disabled={categoriesLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              categoriesLoading
                                ? 'Memuat kategori...'
                                : 'Pilih kategori produk'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesData?.data?.items?.map(category => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : submitButtonText}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
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
