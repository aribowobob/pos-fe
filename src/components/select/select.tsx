import React, { useState } from 'react';
import { TextInput } from '@components';

interface AutoCompleteSelectProps {
  name: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  name,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onSelect(option);
    setFilteredOptions([]);
  };

  return (
    <div className="w-full max-w-xs">
      <TextInput
        type="text"
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Pilih Kategori Produk"
      />
      {isOpen ? (
        <ul className="mt-1 bg-white border border-gray-300 rounded-md absolute w-full">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AutoCompleteSelect;
