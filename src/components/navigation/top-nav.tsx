import {
  ChevronLeftIcon,
  CircleStackIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

type TopNavProps = {
  onBack?: () => void;
  title: string;
  onCartClick?: () => void;
  isCartActive?: boolean;
  branchName?: string;
  isLoading?: boolean;
};

const TopNav = ({
  onBack,
  title,
  onCartClick,
  isCartActive,
  branchName,
  isLoading,
}: TopNavProps) => {
  const { replace } = useRouter();

  return (
    <header className="flex items-center gap-4 p-4 bg-white sticky top-0">
      {typeof onBack === 'function' && (
        <button type="button" onClick={onBack}>
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      <p className="text-xl grow font-medium">
        {isLoading || !title ? (
          <span className="w-60 h-7 block rounded bg-slate-200 animate-pulse" />
        ) : (
          title
        )}
      </p>

      {typeof onCartClick === 'function' && (
        <button type="button" className="relative" onClick={onCartClick}>
          <ShoppingCartIcon className="w-6 h-6" />
          {isCartActive && (
            <>
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600" />
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600 animate-ping" />
            </>
          )}
        </button>
      )}

      {!!branchName && (
        <button
          type="button"
          className="flex gap-2 text-blue-500 items-center"
          onClick={() => {
            replace('/branches');
          }}
        >
          <CircleStackIcon className="w-5 h-5" />
          <span className="font-medium text-xl">{branchName}</span>
        </button>
      )}
    </header>
  );
};

export default TopNav;
