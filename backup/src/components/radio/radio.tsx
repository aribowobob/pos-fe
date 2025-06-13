import type { ChangeEvent, FC } from 'react';
import clsx from 'clsx';

type RadioProps = {
  className?: string;
  id: string;
  label: string;
  name: string;
  value: string | number;
  isChecked: boolean;
  onChange: (val: ChangeEvent<HTMLInputElement>) => void;
};

const Radio: FC<RadioProps> = props => {
  const { className, label, name, value, isChecked, onChange } = props;
  const id = `${name}${value}`;

  return (
    <div className={clsx('flex gap-2 items-center', className)}>
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radio;
