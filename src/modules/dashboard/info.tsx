import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Link from 'next/link';

import { useUser } from '@store';

const Info = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, d MMM yyyy', { locale: id });
  const { fullName, initial, store } = useUser();
  const { name, initial: storeInitial } = store || {};
  const storeName =
    !!name && !!storeInitial ? `${storeInitial} (${name})` : '-';

  if (!fullName) return null;

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex gap-4 justify-between">
        <Link
          href="/branches"
          className="flex gap-2 items-center text-blue-500"
        >
          <HomeIcon className="w-4 h-4" />
          <span>{storeName}</span>
        </Link>

        <span>{formattedDate}</span>
      </div>

      <Link href="/system" className="flex gap-2 items-center text-blue-500">
        <UserIcon className="w-4 h-4" />
        <span>{`${initial} (${fullName})`}</span>
      </Link>
    </div>
  );
};

export default Info;
