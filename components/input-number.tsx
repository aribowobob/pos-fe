import { NumericFormat } from 'react-number-format';

interface InputNumberProps {
  className?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const InputNumber = ({
  className,
  disabled = false,
  max,
  min,
  placeholder = '0',
  required = false,
  value = '',
  onChange,
}: InputNumberProps) => {
  return (
    <NumericFormat
      className={className}
      disabled={disabled}
      max={max}
      min={min}
      placeholder={placeholder}
      required={required}
      value={value}
      onValueChange={values => {
        if (onChange) {
          onChange(values.value);
        }
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
    />
  );
};
