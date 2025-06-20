import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import Link from 'next/link';

export default function Page() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Setting</h1>
        <Link
          href="/settings/products"
          className="text-blue-500 hover:underline"
        >
          Pengaturan Produk
        </Link>
      </div>
    </DashboardLayout>
  );
}
