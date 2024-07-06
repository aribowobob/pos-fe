'use client';

import {
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassCircleIcon,
} from '@heroicons/react/16/solid';
import clsx from 'clsx';
import type { ChangeEvent, FocusEvent, ReactNode, KeyboardEvent } from 'react';
import React, { useState } from 'react';

type TextInputProps = {
  label?: string;
  message?: string | ReactNode;
  name?: string;
  type?: 'text' | 'date' | 'password' | 'email' | 'number' | 'search';
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
  size?: 'xs' | 'md' | 'lg' | 'sm' | 'xl';
  isValid?: boolean;
  labelType?: 'floating' | 'leftside' | 'upside' | 'underline';
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
  size = 'md',
  isValid = false,
  labelType = 'upside',
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const [textValue, setTextValue] = useState(value);

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
    const { value } = e.target;
    setTextValue(value);
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;
  const jumlahInputan = textValue?.length || 0;

  const passwordStyle =
    'absolute top-1/2 right-2 transform -translate-y-1/2 transition-all delay-300 duration-300 ease-linear';
  const addOnsStyle =
    'flex justify-center bg-slate-100 min-w-[40px] items-center h-10 px-2 border border-solid';

  let borderColor = 'border-slate-300';
  if (isFocused && !isError) borderColor = 'border-sky-500';
  if (isError) borderColor = 'border-red-600';
  if (disabled) borderColor = 'border-slate-500';
  //if (isValid) borderColor = "border-green-500";

  let textColor = 'text-slate-800';
  if (isError) textColor = 'text-red-600';
  if (disabled) textColor = 'text-slate-400';

  let bgColor = 'bg-white';
  if (disabled) bgColor = 'bg-slate-300';

  return (
    <div
      className={clsx('w-full relative gap-1 ', className, {
        error: isError,
        'flex flex-col': labelType === 'upside',
        flex: labelType === 'leftside',
      })}
    >
      {labelType === 'upside' || labelType === 'leftside' ? (
        <label
          htmlFor={name}
          className={clsx(
            'flex items-center text-base text-left mb-1',
            {
              'w-60 justify-end mr-2': labelType === 'leftside',
            },
            textColor,
            borderColor
          )}
        >
          <span className={isValid ? `text-green-800` : `text-black`}>
            {label}
          </span>
          {required ? <span className="text-red-500 ml-1">*</span> : null}
          {isValid ? (
            <CheckCircleIcon className="ml-1 mf-2" color="green" />
          ) : null}
        </label>
      ) : null}

      <div className="flex w-full items-center">
        {hasPrefix ? (
          <div
            className={clsx(
              'rounded-l border-r-0',
              addOnsStyle,
              textColor,
              borderColor,
              {
                'h-8': size === 'xs',
                'h-10': size === 'sm',
                'h-12': size === 'md',
                'h-14': size === 'lg',
                'h-16': size === 'xl',
              }
            )}
          >
            <span className={size === 'sm' || size === 'md' ? `p-2` : `p-3`}>
              {prefix}
            </span>
          </div>
        ) : null}
        <div className="relative w-full">
          <input
            id={name}
            onFocus={handleFocus}
            type={type === 'search' ? 'text' : inputType}
            value={value}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            required={required}
            readOnly={readOnly}
            className={clsx(
              'flex justify-center text-slate-900 items-center px-2 h-10 border border-solid w-full focus:outline-none',
              borderColor,
              textColor,
              bgColor,
              {
                'rounded-l': !hasPrefix,
                'rounded-r': !hasSuffix,
                'h-8': size === 'xs',
                'h-10': size === 'sm',
                'h-12': size === 'md',
                'h-14': size === 'lg',
                'h-16': size === 'xl',
                'border-b-2 border-t-0 border-l-0 border-r-0':
                  labelType === 'underline',
              }
            )}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          {inputType === 'password' && !isShowPassword ? (
            <button
              type="button"
              onClick={() => setisShowPassword(true)}
              className={passwordStyle}
              tabIndex={-1}
            >
              <EyeSlashIcon />
            </button>
          ) : null}
          {/* {labelType === "floating" && (jumlahInputan > 0 || isFocused) ? (
            <span className="absolute -top-2 left-2 bg-white text-sm font-normal border-gray-200 rounded p-1 transition-transform duration-300 transform -translate-y-2 opacity-100">
              {required ? <span className="text-red-500 mr-1">*</span> : null}

              {label}
            </span>
          ) : null} */}

          {labelType === 'floating' ? (
            <span
              className={clsx(
                'absolute transition-all  delay-300 duration-200 ease-linear',
                {
                  'top-1/2 left-1 p-1  -translate-y-1/2 text-gray-500':
                    jumlahInputan === 0 && !isFocused,
                  '-top-2 left-2 bg-white text-sm font-normal border-gray-200 rounded p-1 -translate-y-2 opacity-100':
                    jumlahInputan > 0 || isFocused,
                }
              )}
            >
              {required ? (
                <span className="text-red-500 ml-1">*&nbsp;</span>
              ) : null}
              {label}
            </span>
          ) : null}
          {inputType === 'text' && isShowPassword ? (
            <button
              type="button"
              onClick={() => setisShowPassword(false)}
              className={passwordStyle}
            >
              <EyeIcon />
            </button>
          ) : null}
          {type === 'search' ? (
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <MagnifyingGlassCircleIcon />
            </div>
          ) : null}
        </div>
        {hasSuffix ? (
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
        ) : null}
      </div>
      {message ? (
        <p className={clsx('mt-1 text-[11px] leading-normal', textColor)}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
