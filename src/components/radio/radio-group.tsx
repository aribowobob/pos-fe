import type { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import { Option } from '@types';
import Radio from './radio';

interface RadioGroupProps {
  className?: string;
  label?: string;
  name: string;
  options: Option[];
  value: string | number | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({
  className,
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <div className={clsx('relative', className)}>
      {label && <p>{label}</p>}
      {options.map(option => {
        const { label: lbl, value: val } = option;
        const id = `${name}${val}`;

        return (
          <Radio
            key={id}
            id={id}
            className="first:mt-0 mt-2"
            label={lbl}
            name={name}
            value={val}
            isChecked={val === value}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
