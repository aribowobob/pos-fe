import React, { useCallback, useEffect, useRef } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface IBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const BottomSheet: React.FC<IBottomSheetProps> = ({
  open,
  onClose,
  children,
  title,
  className,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Membuat handleClickOutside dengan useCallback
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, handleClickOutside]);

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        ref={sheetRef}
        className={clsx(
          'fixed left-0 right-0 z-50 bottom-0 bg-white shadow-lg transition-transform duration-300 ease-in-out max-h-[80vh] overflow-y-auto',
          className,
          {
            'translate-y-full': !open,
          }
        )}
      >
        <div className="w-full p-4 bg-white">
          <div className="flex justify-between text-lg mb-4">
            <label>{title}</label>
            <XCircleIcon className="w-7 h-7 cursor-pointer" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default BottomSheet;
