import { useState } from 'react';

import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  ArrowTurnUpLeftIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  HomeIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type SubMenuType = '' | 'TRANSACTION' | 'REPORT';

const cssBtn = 'flex gap-2 flex-col w-16 items-center';
const cssLabel = 'text-sm leading-[20px]';
const cssTriangle =
  'border-t-slate-300 border-t-[14px] border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent w-0 h-0 absolute -top-8 left-1/2 -ml-2';

const BottomNav = () => {
  const { asPath, push } = useRouter();
  const [subMenu, setSubMenu] = useState<SubMenuType>('');
  const isDashboard = asPath.includes('/dashboard');
  const isTransaction = asPath.includes('/transaction');
  const isReport = asPath.includes('/report');
  const isSystem = asPath.includes('/system');
  const handleShowSubMenu = (subMenu: SubMenuType) => {
    setSubMenu(subMenu);
  };

  return (
    <nav className="fixed bottom-0 bg-slate-200 w-full sm:max-w-[608px] md:max-w-[736px] lg:max-w-[992px] xl:max-w-[1248px] 2xl:max-w-[1504px]">
      <ul className="flex p-4 items-center justify-between">
        <li className="relative">
          <button
            className={clsx(cssBtn, {
              'text-blue-500': isDashboard,
              'text-slate-800': !isDashboard,
            })}
            disabled={isDashboard}
            onClick={() => {
              push('/dashboard');
            }}
          >
            <HomeIcon className="w-6 h-6" />
            <span className={cssLabel}>Beranda</span>
          </button>
        </li>
        <li className="relative">
          <button
            className={clsx(cssBtn, {
              'text-blue-500': isTransaction,
              'text-slate-800': !isTransaction,
            })}
            disabled={isTransaction}
            onClick={() => {
              handleShowSubMenu('TRANSACTION');
            }}
          >
            <ShoppingBagIcon className="w-6 h-6" />
            <span className={cssLabel}>Transaksi</span>
          </button>

          {subMenu === 'TRANSACTION' && <span className={cssTriangle} />}
        </li>
        <li className="relative">
          <button
            className={clsx(cssBtn, {
              'text-blue-500': isReport,
              'text-slate-800': !isReport,
            })}
            disabled={isReport}
            onClick={() => {
              handleShowSubMenu('REPORT');
            }}
          >
            <ClipboardDocumentListIcon className="w-6 h-6" />
            <span className={cssLabel}>Laporan</span>
          </button>

          {subMenu === 'REPORT' && <span className={cssTriangle} />}
        </li>
        <li className="relative">
          <button
            className={clsx(cssBtn, {
              'text-blue-500': isSystem,
              'text-slate-800': !isSystem,
            })}
            disabled={isSystem}
            onClick={() => {
              push('/system');
            }}
          >
            <CogIcon className="w-6 h-6" />
            <span className={cssLabel}>Sistem</span>
          </button>
        </li>
      </ul>

      {subMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setSubMenu('');
            }}
          />

          <div className="fixed z-20 bottom-20 p-4 w-full sm:max-w-[608px] md:max-w-[736px] lg:max-w-[992px] xl:max-w-[1248px] 2xl:max-w-[1504px]">
            {subMenu === 'TRANSACTION' && (
              <ul className="flex p-2 items-center justify-center gap-4 bg-slate-300 rounded">
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/transaction/return');
                    }}
                  >
                    <ArrowTurnUpLeftIcon className="w-6 h-6" />
                    <span className={cssLabel}>Retur</span>
                  </button>
                </li>
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/transaction/stock-movement');
                    }}
                  >
                    <ArrowPathIcon className="w-6 h-6" />
                    <span className={cssLabel}>Pindah</span>
                  </button>
                </li>
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/transaction/sales');
                    }}
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span className={cssLabel}>Jual</span>
                  </button>
                </li>
              </ul>
            )}

            {subMenu === 'REPORT' && (
              <ul className="flex p-2 items-start justify-center gap-4 bg-slate-300 rounded">
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/report/stock');
                    }}
                  >
                    <ArchiveBoxIcon className="w-6 h-6" />
                    <span className={cssLabel}>Stok</span>
                  </button>
                </li>
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/report/sales');
                    }}
                  >
                    <BanknotesIcon className="w-6 h-6" />
                    <span className={cssLabel}>Penjualan</span>
                  </button>
                </li>
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/report/sales-return');
                    }}
                  >
                    <ArrowTurnUpLeftIcon className="w-6 h-6" />
                    <span className={cssLabel}>Retur</span>
                  </button>
                </li>
                <li>
                  <button
                    className={clsx(cssBtn, 'p-2 text-slate-800')}
                    onClick={() => {
                      push('/report/inventory-audit');
                    }}
                  >
                    <ShieldCheckIcon className="w-6 h-6" />
                    <span className={cssLabel}>Stok Opname</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default BottomNav;
