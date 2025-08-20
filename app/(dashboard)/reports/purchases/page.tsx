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
import { usePurchasesReport } from './hooks';

export default function Page() {
  const {
    // Fetching purchases report data
    data,
    error,
    isLoading,
    isValidFilter,
    // State management branch selection
    stores,
    // Form handling
    form,
    onSubmit,
  } = usePurchasesReport();

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
              <BreadcrumbPage>Pembelian</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Laporan Pembelian</h1>
        </div>

        {/* Filter Form */}
        <div className="border border-border rounded-sm p-4 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                          placeholder="Pilih tanggal mulai"
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
                          placeholder="Pilih tanggal akhir"
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih cabang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Semua Cabang</SelectItem>
                          {stores.map(store => (
                            <SelectItem
                              key={store.id}
                              value={store.id.toString()}
                            >
                              {store.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button type="submit" className="w-full">
                    <FileSearch className="w-4 h-4 mr-2" />
                    Cari
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {/* Report Content */}
        {isValidFilter && (
          <>
            {error && (
              <div className="border border-red-200 rounded-sm p-4 bg-red-50">
                <p className="text-red-600">
                  Terjadi kesalahan saat memuat data: {error.message}
                </p>
              </div>
            )}

            {isLoading && (
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded" />
                </div>
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded" />
                </div>
                <div className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded" />
                </div>
              </div>
            )}

            {data && !isLoading && (
              <div className="space-y-6">
                <Summary summary={data.summary} />
                <OrderList orders={data.orders} />
                <SkuSummary skus={data.skus} />
              </div>
            )}
          </>
        )}

        {!isValidFilter && (
          <div className="border border-border rounded-sm p-8 bg-gray-50">
            <div className="text-center">
              <FileSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Pilih Filter Laporan
              </h3>
              <p className="text-gray-500">
                Silakan pilih tanggal mulai dan tanggal akhir untuk melihat
                laporan pembelian.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
