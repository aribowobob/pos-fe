import { Button } from '@components/button';
import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ModalProps {
  title: string;
  cancelText?: string;
  onCancel?: () => void;
  onClose: () => void;
  okText: string;
  onOk: () => void;
  isResist?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  cancelText,
  onCancel,
  onClose,
  okText,
  onOk,
  isResist = false,
  children,
}) => {
  const handleOverlayClick = () => {
    if (!isResist) {
      onClose();
    }
  };

  return (
    <div className="ml-2 mr-2 fixed -top-14 inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={handleOverlayClick}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 pb-8 z-10">
        <div className="flex justify-between items-center">
          <p className="text-xl">{title}</p>
          <XCircleIcon className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        <div className="py-6">{children}</div>
        <div className="flex flex-col gap-2">
          {!!cancelText && typeof onCancel === 'function' && (
            <Button onClick={onCancel} className="w-full" color="primary" ghost>
              {cancelText}
            </Button>
          )}
          <Button onClick={onOk} className="w-full" color="primary">
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
