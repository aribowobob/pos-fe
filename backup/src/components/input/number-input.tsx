import type { FC } from 'react';

import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  onClickValue?: () => void;
};

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  onClickValue,
  min = 1,
  max = 999999999,
  step = 1,
}) => {
  const handleIncrement = () => {
    let nextValue = value;

    if (value + step <= max) {
      nextValue += step;
    }

    onChange(nextValue);
  };

  const handleDecrement = () => {
    let nextValue = value;

    if (value - step >= min) {
      nextValue -= step;
    }

    onChange(nextValue);
  };

  return (
    <div className="p-1 border border-slate-500 gap-4 rounded-full flex items-center">
      <button className="p-0" onClick={handleDecrement}>
        <MinusCircleIcon
          className={clsx(
            'w-6 h-6',
            value <= min ? 'text-slate-300' : 'text-red-600'
          )}
        />
      </button>

      <span
        className="min-w-[52px] text-center leading-6 cursor-text"
        onClick={() => {
          if (onClickValue) onClickValue();
        }}
      >
        {value}
      </span>

      <button className="p-0" onClick={handleIncrement}>
        <PlusCircleIcon
          className={clsx(
            'w-6 h-6',
            value < max ? 'text-teal-600' : 'text-slate-300'
          )}
        />
      </button>
    </div>
  );
};

export default NumberInput;
