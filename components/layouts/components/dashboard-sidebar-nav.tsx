'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DashboardNavProps } from '@/lib/types';
import { cn } from '@/lib/utils';

const DashboardSidebarNav = ({ navigation }: DashboardNavProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 gap-4 shrink-0 items-center">
          <Image
            src="/static/icons/icon-192x192.png"
            width={40}
            height={40}
            alt="Logo"
          />
          <h1 className="text-xl font-semibold">Flux POS</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? 'bg-gray-100 text-primary'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebarNav;
