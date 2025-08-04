'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DatePicker } from '@/components/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSalesReport } from './hooks';
import { OrderList, SkuSummary, Summary } from './components';

export default function Page() {
  const {
    // Fetching sales report data
    data,
    error,
    isLoading,
    // State management for date and branch selection
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    branch,
    setBranch,
    stores,
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

        <div className="flex flex-wrap w-full items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tanggal Mulai:</label>
            <DatePicker value={startDate} onChange={setStartDate} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tanggal Akhir:</label>
            <DatePicker value={endDate} onChange={setEndDate} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Cabang:</label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-40 [&>span]:truncate [&>span]:!block">
                <SelectValue placeholder="Pilih cabang.." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Semua cabang</SelectItem>
                {stores.map(store => (
                  <SelectItem key={store.id} value={store.id.toString()}>
                    {`[${store.initial}] ${store.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && startDate && endDate && (
          <p className="text-red-500">
            Error: Terjadi kesalahan saat memuat laporan penjualan.
            {error?.message}
          </p>
        )}

        {!error && startDate && endDate && (
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
