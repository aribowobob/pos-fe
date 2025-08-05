'use client';

import { FileSearch } from 'lucide-react';
import { DatePicker } from '@/components/date-picker';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderList, SkuSummary, Summary } from './components';
import { useSalesReport } from './hooks';

export default function Page() {
  const {
    // Fetching sales report data
    data,
    error,
    isLoading,
    isValidFilter,
    // State management branch selection
    stores,
    // Form handling
    form,
    onSubmit,
  } = useSalesReport();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/reports">Laporan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Penjualan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Laporan Penjualan</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-wrap items-start gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Mulai</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Akhir</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabang</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!stores.length}
                    >
                      <FormControl>
                        <SelectTrigger className="w-40 [&>span]:truncate [&>span]:!block">
                          <SelectValue placeholder="Pilih cabang.." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Semua cabang</SelectItem>
                        {stores.map(store => (
                          <SelectItem
                            key={store.id}
                            value={store.id.toString()}
                          >
                            {`[${store.initial}] ${store.name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-5.5">
                <Button type="submit">
                  <FileSearch className="size-4" />
                  Lihat
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {error && isValidFilter && (
          <p className="text-red-500">
            Error: Terjadi kesalahan saat memuat laporan penjualan.
            {error?.message}
          </p>
        )}

        {!error && isValidFilter && (
          <>
            <OrderList data={data?.orders} isLoading={isLoading} />
            <SkuSummary data={data?.sku_summary} isLoading={isLoading} />
            <Summary data={data?.summary} isLoading={isLoading} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
