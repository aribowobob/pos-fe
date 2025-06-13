import { useState, ChangeEvent, useEffect } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';

import { Option } from '@types';

import Checkbox from './checkbox';

interface CheckboxGroupProps {
  className?: string;
  label: string;
  options: Option[];
  onChange: (selectedOption: string[] | []) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  className,
  label,
  options,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedOptions(prevSelectedOptions =>
      checked
        ? [...prevSelectedOptions, value]
        : prevSelectedOptions.filter(option => option !== value)
    );
  };

  return (
    <div className={clsx('relative', className)}>
      {label && <p className="block mb-2">{label}</p>}
      {options.map((option, index) => {
        const id = `cb-${index}`;

        return (
          <Checkbox
            key={index}
            label={option.label}
            id={id}
            isChecked={selectedOptions.includes(option.value as string)}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
