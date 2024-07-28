import { Button, CurrencyInput, TextInput } from '@components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BottomSheet } from '@components';
import { IProductProps } from './type';

interface IAddProductProps {
  title?: string;
  isProductFormDisplayed: boolean;
  setIsProductFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  dataProduct?: IProductProps;
}

const FormEditProduct: React.FC<IAddProductProps> = ({
  title = 'Ubah Data Produk',
  isProductFormDisplayed,
  setIsProductFormDisplayed,
  dataProduct,
}) => {
  const productData: IProductProps = {
    kode_sku: '',
    nama_produk: '',
    harga_beli: '',
    harga_jual: '',
    nama_satuan: '',
  };
  const [formData, setFormData] = useState<IProductProps>(
    dataProduct || productData
  );

  useEffect(() => {
    if (dataProduct) {
      setFormData(dataProduct);
    }
  }, [dataProduct]);

  const { kode_sku, nama_produk, harga_beli, harga_jual, nama_satuan } =
    formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <BottomSheet
      open={isProductFormDisplayed}
      title={title}
      onClose={() => setIsProductFormDisplayed(!isProductFormDisplayed)}
    >
      <div>
        <TextInput
          label="Kode SKU"
          name="kode_sku"
          value={kode_sku}
          onChange={handleChange}
          className="mb-4"
        />
        <TextInput
          label="Nama Produk"
          name="nama_produk"
          value={nama_produk}
          onChange={handleChange}
          className="mb-4"
        />
        <CurrencyInput
          name="Harga Beli"
          value={harga_beli}
          label="Harga Beli"
          onChange={handleChange}
          className="mb-4"
        />
        <CurrencyInput
          name="Harga Jual"
          value={harga_jual}
          label="Harga Jual"
          onChange={handleChange}
          className="mb-4"
        />
        <TextInput
          label="Nama Satuan"
          name="nama_satuan"
          value={nama_satuan}
          onChange={handleChange}
          className="mb-4"
          message="Boleh dikosongkan. Apabila dikosongkan akan diberi nilai default
          “unit”"
        />
        <div className="flex gap-4">
          <Button className="w-1/4" color="danger" ghost>
            Hapus
          </Button>
          <Button className="w-3/4">Simpan Perubahan</Button>
        </div>
      </div>
      {/* {JSON.stringify(formData)} */}
    </BottomSheet>
  );
};

export default FormEditProduct;
