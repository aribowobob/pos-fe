'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DashboardNavProps } from '@/lib/types';
import { cn } from '@/lib/utils';

const DashboardBottomNav = ({ navigation }: DashboardNavProps) => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t bg-white md:hidden">
      <div className="mx-auto grid h-full max-w-lg grid-cols-5">
        {navigation.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50',
              pathname === item.href && 'text-primary'
            )}
          >
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardBottomNav;
