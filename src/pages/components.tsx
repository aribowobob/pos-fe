import { useState } from 'react';

import { Button, CheckboxGroup, RadioGroup, TextInput } from '@components';

export default function Components() {
  const [selectedRadio, setSelectedRadioOption] = useState<string | null>(null);

  const [selectedCheckbox, setSelectedCheckboxOption] = useState<string[] | []>(
    []
  );
  const listPilihan = [
    { label: 'React JS', value: 'React JS' },
    { label: 'Next JS', value: 'Next JS' },
    { label: 'Golang', value: 'Golang' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Java', value: 'Java' },
    { label: 'ASP', value: 'ASP' },
  ];

  function handleRadioChange(selectedOption: string | null) {
    setSelectedRadioOption(selectedOption);
  }

  function handleCheckboxChange(selectedOption: string[] | []) {
    setSelectedCheckboxOption(selectedOption);
  }

  return (
    <main>
      <div className="p-2 flex">
        <div className="bg-slate-200 w-1/2">
          <div className="p-1 w-60">
            <TextInput label="Username" size="md" labelType="floating" />
          </div>
          <div className="p-1 w-60 mt-2">
            <TextInput
              label="Password"
              type="password"
              size="md"
              labelType="floating"
            />
          </div>

          <div className="p-1 w-60 mt-2">
            <Button ghost>Testing Button</Button>
          </div>
          <div className="p-1 w-60 mt-2">
            <CheckboxGroup
              label="Pilihan Anda"
              options={listPilihan}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="p-1 w-60 mt-2">
            <RadioGroup
              label="Pilihan Anda"
              options={listPilihan}
              onChange={handleRadioChange}
            />
          </div>
        </div>
        <div className="bg-blue-200 w-1/2">
          <p>Pilihan 1</p>
          {selectedCheckbox.join(', ')}
          <p>Pilihan 2</p>
          {selectedRadio}
        </div>
      </div>
    </main>
  );
}
