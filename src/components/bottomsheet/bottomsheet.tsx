import React, { useCallback, useEffect, useRef } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface IBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
}

const BottomSheet: React.FC<IBottomSheetProps> = ({
  open,
  onClose,
  children,
  title,
  className,
  footer,
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
        <div className="w-full flex flex-col h-full">
          <div className="sticky top-0 bg-white p-4 z-10 flex-shrink-0">
            <div className="flex justify-between text-lg mb-4">
              <label>{title}</label>
              <XCircleIcon
                className="w-7 h-7 cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
          {footer && (
            <div className="sticky bottom-0 p-4 bg-white flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BottomSheet;
