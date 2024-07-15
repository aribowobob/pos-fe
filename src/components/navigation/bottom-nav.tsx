import {
  ClipboardDocumentListIcon,
  CogIcon,
  HomeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const cssBtn = 'flex gap-2 flex-col w-16 items-center text-slate-800';
const cssLabel = 'text-sm leading-[20px]';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 bg-slate-200 w-full sm:max-w-[608px] md:max-w-[736px] lg:max-w-[992px] xl:max-w-[1248px] 2xl:max-w-[1504px]">
      <ul className="flex p-4 items-center justify-between">
        <li>
          <button className={cssBtn}>
            <HomeIcon className="w-6 h-6" />
            <span className={cssLabel}>Beranda</span>
          </button>
        </li>
        <li>
          <button className={cssBtn}>
            <ShoppingBagIcon className="w-6 h-6" />
            <span className={cssLabel}>Transaksi</span>
          </button>
        </li>
        <li>
          <button className={cssBtn}>
            <ClipboardDocumentListIcon className="w-6 h-6" />
            <span className={cssLabel}>Laporan</span>
          </button>
        </li>
        <li>
          <button className={cssBtn}>
            <CogIcon className="w-6 h-6" />
            <span className={cssLabel}>Sistem</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
