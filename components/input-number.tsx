import { NumericFormat } from 'react-number-format';
import { Input } from './ui/input';

interface InputNumberProps {
  className?: string;
  decimalScale?: number;
  disabled?: boolean;
  id?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  prefix?: string;
  required?: boolean;
  suffix?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const InputNumber = ({
  className,
  decimalScale = 0,
  disabled = false,
  id,
  max,
  min,
  placeholder = '0',
  prefix,
  required = false,
  suffix,
  value = '',
  onChange,
}: InputNumberProps) => {
  return (
    <NumericFormat
      className={className}
      customInput={Input}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
      required={required}
      value={value}
      onValueChange={values => {
        if (onChange) {
          onChange(values.value);
        }
      }}
      isAllowed={({ floatValue }) => {
        console.log('floatValue', floatValue);
        if (max !== undefined && floatValue && floatValue > max) return false;
        if (min !== undefined && floatValue && floatValue < min) return false;
        return true;
      }}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={decimalScale}
      fixedDecimalScale
      inputMode="numeric"
      prefix={prefix}
      suffix={suffix}
    />
  );
};
