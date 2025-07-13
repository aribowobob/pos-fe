import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Transaksi</h1>

        <Link
          href="/transactions/sales"
          className="text-blue-500 hover:underline"
        >
          Transaksi Penjualan
        </Link>

        <Link
          href="/transactions/purchase"
          className="text-blue-500 hover:underline"
        >
          Transaksi Pembelian
        </Link>
      </div>
    </DashboardLayout>
  );
}
