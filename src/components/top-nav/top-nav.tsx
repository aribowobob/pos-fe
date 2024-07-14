import { ChevronLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const TopNav = () => {
  return (
    <header className="flex items-center gap-4 p-4 bg-white sticky top-0">
      <button>
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <p className="text-xl grow">Primadona Store</p>
      <ShoppingCartIcon className="w-6 h-6" />
    </header>
  );
};

export default TopNav;
