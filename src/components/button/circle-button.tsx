import { PlusIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

type CircleButtonProps = {
  onClick: () => void;
  className?: string;
};

const CircleButton = ({ onClick, className }: CircleButtonProps) => {
  return (
    <button
      type="button"
      className={clsx('bg-blue-500 text-white rounded-full', className)}
      onClick={onClick}
    >
      <PlusIcon className="w-16 h-16" />
    </button>
  );
};

export default CircleButton;
