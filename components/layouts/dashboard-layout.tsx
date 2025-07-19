'use client';

import { ReactNode } from 'react';
import {
  DashboardBottomNav,
  DashboardSidebarNav,
  DashboardTopNav,
} from './components';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigation = [
    { name: 'Beranda', href: '/dashboard', icon: 'HomeIcon' },
    { name: 'Transaksi', href: '/transactions', icon: 'ShoppingCartIcon' },
    { name: 'Laporan', href: '/reports', icon: 'ChartBarIcon' },
    { name: 'Setting', href: '/settings', icon: 'CogIcon' },
  ];

  return (
    <div className="min-h-screen md:pl-50">
      {/* Sidebar for desktop */}
      <DashboardSidebarNav navigation={navigation} />

      {/* Main content */}
      <div className="flex flex-col flex-1 pb-16 md:pb-0">
        <DashboardTopNav />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <DashboardBottomNav navigation={navigation} />
    </div>
  );
}
