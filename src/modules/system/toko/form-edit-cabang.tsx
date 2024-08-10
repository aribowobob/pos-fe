import React, { ChangeEvent, useEffect, useState } from 'react';
import { ICabangEditProps } from '../../../types/toko.types';
import { BottomSheet, Button, TextInput } from '@components';

interface IFormEditCabangProps {
  title?: string;
  isBranchFormDisplayed: boolean;
  setIsBranchFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  dataCabang?: ICabangEditProps;
}
const FormEditCabang: React.FC<IFormEditCabangProps> = ({
  title = 'Tambah Cabang/Gudang',
  isBranchFormDisplayed,
  setIsBranchFormDisplayed,
  dataCabang,
}) => {
  const cabangData: ICabangEditProps = {
    id: 0,
    namaCabang: '',
    alias: '',
  };
  const [formData, setFormData] = useState<ICabangEditProps>(
    dataCabang || cabangData
  );

  useEffect(() => {
    if (dataCabang) {
      setFormData(dataCabang);
    }
  }, [dataCabang]);

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
