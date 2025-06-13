import type { ReactNode } from 'react';
import React from 'react';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'danger' | 'success' | 'warning';
  block?: boolean;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ghost?: boolean;
  className?: string;
}

interface ButtonReturn {
  borderColor: string;
  bgColor: string;
  textColor: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    type = 'button',
    color = 'primary',
    block,
    onClick,
    disabled = false,
    ghost = false,
    className = '',
  } = props;

  function getButtonStyle(): ButtonReturn {
    let borderColor = 'border border-blue-500';
    let bgColor = 'bg-white';
    let textColor = 'text-white';

    if (color === 'success') {
      borderColor = 'border border-teal-600';
      bgColor = 'bg-teal-600';

      if (ghost) {
        textColor = 'text-teal-600';
      }
    } else if (color === 'danger') {
      borderColor = 'border border-red-700';
      bgColor = 'bg-red-700';

      if (ghost) {
        textColor = 'text-red-700';
      }
    } else if (color === 'warning') {
      borderColor = 'border border-amber-400';
      bgColor = 'bg-amber-400';
      textColor = 'text-slate-900';

      if (ghost) {
        textColor = 'text-amber-400';
      }
    } else if (color === 'primary') {
      borderColor = 'border border-blue-500';
      bgColor = 'bg-blue-500';

      if (ghost) {
        textColor = 'text-blue-500';
      }
    }

    if (ghost) {
      bgColor = 'bg-white';
    }

    if (disabled) {
      bgColor = 'bg-slate-300 cursor-not-allowed';
      textColor = 'text-slate-400';
      borderColor = 'border border-slate-300';

      if (ghost) {
        bgColor = 'bg-slate-100 cursor-not-allowed';
        textColor = 'text-slate-300';
      }
    }

    return { borderColor, bgColor, textColor };
  }

  const { borderColor, bgColor, textColor } = getButtonStyle();

  return (
    <button
      type={type}
      className={clsx(
        'px-2 py-2.5 rounded flex justify-center items-center text-sm leading-[18px]',
        className,
        borderColor,
        bgColor,
        textColor,
        {
          'w-full': block,
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
