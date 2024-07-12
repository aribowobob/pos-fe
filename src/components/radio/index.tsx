import React, { useState, ChangeEvent } from 'react';

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  options: Option[];
  onChange: (selectedOption: string | null) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  }

  return (
    <div>
      <p>{label}</p>
      {options.map(option => (
        <label key={option.value} className="mr-2 block">
          <input
            type="radio"
            name="radioGroup"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
            className="mr-2"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
