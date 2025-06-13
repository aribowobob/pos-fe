import type { ChangeEvent, FC } from 'react';

type CheckboxProps = {
  label: string;
  id: string;
  isChecked: boolean;
  onChange: (val: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: FC<CheckboxProps> = props => {
  const { label, id, isChecked, onChange } = props;

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        value="1"
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
