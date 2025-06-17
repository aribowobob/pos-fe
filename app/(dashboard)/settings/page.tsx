'use client';

import { useUserStore } from '@/lib/store/user-store';
import { BoxSelect, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { user, isLoading } = useUserStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-slate-800 h-16 text-white relative py-4 pr-6 pl-6 flex items-center justify-between">
        <p className="text-2xl font-semibold tracking-tight">{`${user?.full_name} (${user?.initial})`}</p>
        <p className="text-sm text-slate-400">{user?.email}</p>
        <UserCheck className="absolute bottom-4 left-4 h-6 w-6 text-green-500" />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Manajemen Stok</h2>
        <ul>
          <li>
            <Link href="/settings/products">
              <BoxSelect className="inline-block mr-2 h-5 w-5 text-blue-500" />
              Produk
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
