import React, { ChangeEvent, useState } from 'react';
import {
  cabangData,
  IAddCabangProps,
  ICabangProps,
} from '../../../types/toko.types';
import { BottomSheet, Button, TextInput } from '@components';

const FormAddCabang: React.FC<IAddCabangProps> = ({
  title = 'Tambah Cabang/Gudang',
  isBranchFormDisplayed,
  setIsBranchFormDisplayed,
}) => {
  const [formData, setFormData] = useState<ICabangProps>(cabangData);

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

export default FormAddCabang;
