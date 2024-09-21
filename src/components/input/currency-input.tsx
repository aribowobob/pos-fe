import type { ChangeEvent, ReactNode } from 'react';
import { NumericFormat } from 'react-number-format';
import TextInput from './text-input';

type CurrencyInputProps = {
  value: string | number;
  name: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  prefixElement?: string | ReactNode;
  suffixElement?: string | ReactNode;
  allowNegative?: boolean;
  disabled?: boolean;
};

const CurrencyInput = ({
  name,
  value,
  label = 'Contoh',
  onChange,
  className,
  prefixElement,
  suffixElement,
  allowNegative = false,
  disabled = false,
}: CurrencyInputProps) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }
  return (
    <NumericFormat
      name={name}
      value={value}
      label={label}
      prefixElement={prefixElement}
      suffixElement={suffixElement}
      customInput={TextInput}
      onChange={handleChange}
      className={className}
      thousandSeparator
      allowNegative={allowNegative}
      decimalScale={0}
      disabled={disabled}
    />
  );
};

export default CurrencyInput;
