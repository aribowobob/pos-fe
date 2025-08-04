import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';

export default function Page() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Laporan</h1>

        <Link href="/reports/sales" className="text-blue-500 hover:underline">
          Laporan Penjualan
        </Link>

        <Link
          href="/reports/purchase"
          className="text-blue-500 hover:underline"
        >
          Laporan Pembelian
        </Link>
      </div>
    </DashboardLayout>
  );
}
