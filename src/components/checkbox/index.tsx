import React, { useState, ChangeEvent, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  options: Option[];
  onChange: (selectedOption: string[] | []) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
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
    <div>
      <p className="p-1">{label}</p>
      {options.map((option, index) => (
        <label key={index} className="mr-2 block">
          <input
            type="checkbox"
            value={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={handleChange}
            className="mr-1"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
