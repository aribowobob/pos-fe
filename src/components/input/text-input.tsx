import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ChangeEvent, FocusEvent, ReactNode, KeyboardEvent } from 'react';
import React, { useState } from 'react';

type TextInputProps = {
  label?: string;
  message?: string | ReactNode;
  name: string;
  type?: 'text' | 'date' | 'password' | 'email' | 'number';
  value?: string;
  isError?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  inputMode?: 'text' | 'numeric';
};

export default function TextInput({
  label,
  message,
  name,
  type = 'text',
  value,
  isError,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  disabled = false,
  required = false,
  readOnly = false,
  className,
  placeholder,
  maxLength,
  prefix,
  suffix,
  inputMode = 'text',
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);

  const inputType = type === 'password' && isShowPassword ? 'text' : type;

  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    setIsFocused(true);
    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    setIsFocused(false);
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (typeof onKeyDown === 'function') {
      onKeyDown(e);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;

  const passwordStyle = 'absolute top-1/2 right-2 transform -translate-y-1/2';
  const addOnsStyle =
    'flex justify-center bg-slate-300 min-w-[40px] items-center h-10 px-2 border border-solid';

  let borderColor = 'border-slate-500';
  if (isFocused && !isError) borderColor = 'border-blue-500';
  if (isError) borderColor = 'border-red-600';

  let textColor = 'text-slate-900';
  if (isError) textColor = 'text-red-600';
  if (disabled) textColor = 'text-slate-400';

  let bgColor = 'bg-white';
  if (disabled) bgColor = 'bg-slate-300';

  return (
    <div
      className={clsx('w-full relative gap-1 ', className, {
        error: isError,
      })}
    >
      {label && (
        <label
          htmlFor={name}
          className={clsx('mb-1 leading-normal block', textColor)}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex w-full items-center">
        {hasPrefix && (
          <div
            className={clsx(
              'rounded-l border-r-0',
              addOnsStyle,
              textColor,
              borderColor
            )}
          >
            <span className="p-2">{prefix}</span>
          </div>
        )}
        <div className="relative w-full">
          <input
            id={name}
            onFocus={handleFocus}
            type={inputType}
            value={value}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            required={required}
            readOnly={readOnly}
            className={clsx(
              'flex justify-center text-slate-800 items-center px-4 h-10 border border-solid w-full outline-none focus:outline-none',
              borderColor,
              textColor,
              bgColor,
              {
                'rounded-l': !hasPrefix,
                'rounded-r': !hasSuffix,
                'pr-10': type === 'password',
                'cursor-not-allowed': disabled,
              }
            )}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode={inputMode}
            disabled={disabled}
            autoComplete="off"
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setisShowPassword(!isShowPassword)}
              className={passwordStyle}
              tabIndex={-1}
            >
              {isShowPassword ? (
                <EyeIcon className="w-6 h-6" />
              ) : (
                <EyeSlashIcon className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
        {hasSuffix && (
          <div
            className={clsx(
              'rounded-r border-l-0',
              addOnsStyle,
              borderColor,
              textColor
            )}
          >
            <span>{suffix}</span>
          </div>
        )}
      </div>
      {message && (
        <p className={clsx('mt-1 text-[10px] leading-normal', textColor)}>
          {message}
        </p>
      )}
    </div>
  );
}
