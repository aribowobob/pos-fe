import { clsx } from 'clsx';
import React, { MouseEventHandler } from 'react';

type SwitchProps = {
  label?: string[];
  onClick?: MouseEventHandler<HTMLInputElement>;
  size?: 'md' | 'lg' | 'sm' | 'xl';
  isOn: boolean;
};

export default function Switch({
  label = [],
  size = 'sm',
  onClick,
  isOn = false,
}: SwitchProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-lg relative shadow cursor-pointer border transition-all duration-300 ease-linear',
        {
          'h-3 w-9': size === 'sm',
          'h-4 w-10': size === 'md',
          'h-5 w-11': size === 'lg',
          'h-6 w-12': size === 'xl',
          'bg-gray-300 border-gray-300': !isOn,
          'bg-blue-300 border-gray-300': isOn,
        }
      )}
    >
      <div
        className={clsx(
          'rounded-full absolute top-1/2 transform -translate-y-1/2 transition-all delay-300 duration-300 ease-linear',
          {
            'h-5 w-5': size === 'sm',
            'h-6 w-6': size === 'md',
            'h-7 w-7': size === 'lg',
            'h-8 w-8': size === 'xl',
            '-left-1 bg-gray-500': !isOn,
            'bg-blue-500 left-4': isOn,
          }
        )}
      ></div>
      {label.length > 0 ? (
        <span
          className={clsx(
            'absolute top-1/2 transform -translate-y-1/2 transition-all delay-300 duration-300 ease-linear',
            {
              'left-10': size === 'sm',
              'left-11': size === 'md',
              'left-12': size === 'lg',
              'left-13': size === 'xl',
              'text-gray-500 font-medium': !isOn,
              'text-blue-500 font-medium': isOn,
            }
          )}
        >
          {isOn ? label[0] : label[1]}
        </span>
      ) : null}
    </div>
  );
}
