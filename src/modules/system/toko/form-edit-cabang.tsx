import React, { ChangeEvent, useState } from 'react';
import { ICabangProps } from './type';
import { BottomSheet, Button, TextInput } from '@components';

interface IEditCabangProps {
  title?: string;
  isBranchFormDisplayed: boolean;
  setIsBranchFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  dataCabang?: ICabangProps;
}
const FormEditCabang: React.FC<IEditCabangProps> = ({
  title = 'Tambah Cabang/Gudang',
  isBranchFormDisplayed,
  setIsBranchFormDisplayed,
}) => {
  const cabangData: ICabangProps = {
    namaCabang: '',
    alias: '',
  };
  const [formData, setFormData] = useState<ICabangProps>(
    cabangData || cabangData
  );

  const { namaCabang, alias } = formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <BottomSheet
      open={isBranchFormDisplayed}
      title={title}
      onClose={() => setIsBranchFormDisplayed(!isBranchFormDisplayed)}
    >
      <div>
        <TextInput
          label="Nama Cabang/Gudang"
          name="namaCabang"
          value={namaCabang}
          onChange={handleChange}
          className="mb-4"
        />
        <TextInput
          label="Alias"
          name="alias"
          value={alias.toUpperCase()}
          onChange={handleChange}
          className="mb-4"
          maxLength={3}
          message="Alias dipakai untuk identifier cabang/gudang di laporan. Agar tidak terlalu panjang alias terdiri dari 3 karakter (huruf/angka) saja. Wajib diisi."
        />
        <Button className="w-full">Simpan</Button>
      </div>
    </BottomSheet>
  );
};

export default FormEditCabang;
