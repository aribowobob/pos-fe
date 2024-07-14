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

    if (disabled && !ghost) {
      bgColor = 'bg-slate-300 cursor-not-allowed';
      textColor = 'text-slate-400';
      return { borderColor, bgColor, textColor };
    }
    if (disabled && ghost) {
      bgColor = 'bg-white';
      textColor = 'text-slate-300';
      return { borderColor, bgColor, textColor };
    }

    let styleColor = 'blue-500';
    if (color === 'success') {
      styleColor = 'teal-600';
    } else if (color === 'danger') {
      styleColor = 'red-700';
    } else if (color === 'warning') {
      styleColor = 'amber-400';
    }

    borderColor = `border border-${styleColor}`;
    if (!ghost) {
      bgColor = `bg-${styleColor}`;
    } else {
      textColor = `text-${styleColor}`;
    }

    if (color === 'warning' && !ghost) {
      textColor = `text-slate-900`;
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
