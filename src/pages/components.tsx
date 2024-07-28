import { useState } from 'react';

import { Button, CheckboxGroup, RadioGroup, TextInput } from '@components';
import { UserIcon } from '@heroicons/react/24/outline';

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
            <TextInput
              label="Username"
              name="username"
              message="Lorem ipsum dolor sit amet"
              prefix="Rp"
              suffix={<UserIcon className="w-4 h-4" />}
            />
          </div>
          <div className="p-1 w-60 mt-2">
            <TextInput label="Password" name="password" type="password" />
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
      <div className="flex gap-4 p-4">
        <div className="flex flex-col gap-4">
          <Button color="primary">Testing Button</Button>
          <Button color="primary" ghost>
            Testing Button
          </Button>
          <Button color="primary" disabled>
            Testing Button
          </Button>
          <Button color="primary" ghost disabled>
            Testing Button
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <Button color="danger">Testing Button</Button>
          <Button color="danger" ghost>
            Testing Button
          </Button>
          <Button color="danger" disabled>
            Testing Button
          </Button>
          <Button color="danger" ghost disabled>
            Testing Button
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <Button color="success">Testing Button</Button>
          <Button color="success" ghost>
            Testing Button
          </Button>
          <Button color="success" disabled>
            Testing Button
          </Button>
          <Button color="success" ghost disabled>
            Testing Button
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <Button color="warning">Testing Button</Button>
          <Button color="warning" ghost>
            Testing Button
          </Button>
          <Button color="warning" disabled>
            Testing Button
          </Button>
          <Button color="warning" ghost disabled>
            Testing Button
          </Button>
        </div>
      </div>
    </main>
  );
}
