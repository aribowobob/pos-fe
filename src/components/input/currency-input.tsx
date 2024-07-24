import React, { ChangeEvent } from 'react';
import { NumericFormat } from 'react-number-format';
import TextInput from './text-input';

type CurrencyInputProps = {
  value: string;
  name: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CurrencyInput = ({
  name,
  value,
  label = 'Contoh',
  onChange,
  className,
}: CurrencyInputProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }
  return (
    <NumericFormat
      name={name}
      value={value}
      label={label}
      customInput={TextInput}
      onChange={handleChange}
      className={className}
      thousandSeparator
    />
  );
};

export default CurrencyInput;
