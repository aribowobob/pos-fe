import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Info = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, d MMM yyyy', { locale: id });

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex gap-4 justify-between">
        <div className="flex gap-2 items-center text-blue-500">
          <HomeIcon className="w-4 h-4" />
          <span>GUD (Gudang Utama)</span>
        </div>

        <span>{formattedDate}</span>
      </div>

      <div className="flex gap-2 items-center text-blue-500">
        <UserIcon className="w-4 h-4" />
        <span>JDO (John Doe)</span>
      </div>
    </div>
  );
};

export default Info;
