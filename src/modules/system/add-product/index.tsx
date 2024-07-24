import { TextInput } from '@components';
import React, { ChangeEvent, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { money } from '@utils';

interface IProductData {
  kode_sku: string;
  nama_produk: string;
  harga_beli: string;
  harga_jual: string;
  harga_satuan: string;
}

const AddProduct = () => {
  const productData: IProductData = {
    kode_sku: '',
    nama_produk: '',
    harga_beli: '',
    harga_jual: '',
    harga_satuan: '',
  };
  const [formData, setFormData] = useState<IProductData>(productData);

  const { kode_sku, nama_produk, harga_beli, harga_jual, harga_satuan } =
    formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const displayHargaJual = money(parseInt(harga_jual));

  return (
    <div className="w-full p-4 bg-white">
      <div className="flex justify-between text-lg mb-4">
        <label>Tambah Produk</label>
        <XCircleIcon className="w-7 h-7" />
      </div>
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
        <TextInput
          label="Harga Beli"
          name="harga_beli"
          value={harga_beli}
          onChange={handleChange}
          className="mb-4"
        />
        <TextInput
          label="Harga Jual"
          name="harga_jual"
          value={displayHargaJual}
          onChange={handleChange}
          className="mb-4"
        />
        <TextInput
          label="Harga Satuan"
          name="harga_satuan"
          value={harga_satuan}
          onChange={handleChange}
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default AddProduct;
