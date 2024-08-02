import { Button, CurrencyInput, TextInput, Modal } from '@components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BottomSheet } from '@components';
import { IProductProps, productData } from './type';

interface IEditProductProps {
  title?: string;
  isProductFormDisplayed: boolean;
  setIsProductFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  dataProduct?: IProductProps;
}

const FormEditProduct: React.FC<IEditProductProps> = ({
  title = 'Ubah Data Produk',
  isProductFormDisplayed,
  setIsProductFormDisplayed,
  dataProduct,
}) => {
  const [formData, setFormData] = useState<IProductProps>(
    dataProduct || productData
  );

  const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);

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

  const handleDelete = () => {
    alert(`Data ${nama_produk} sudah dihapus`);
    setIsShowDeleteConfirm(false);
  };

  const handleClose = () => {
    setIsShowDeleteConfirm(false);
  };

  return (
    <>
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
            <Button
              className="w-1/4"
              color="danger"
              ghost
              onClick={() => setIsShowDeleteConfirm(true)}
            >
              Hapus
            </Button>
            <Button className="w-3/4">Simpan Perubahan</Button>
          </div>
        </div>
        {/* {JSON.stringify(formData)} */}
      </BottomSheet>
      {isShowDeleteConfirm && (
        <Modal
          title="Konfirmasi Hapus Data"
          cancelText="Ya, hapus!"
          onCancel={handleDelete}
          onClose={handleClose}
          okText="Batal"
          onOk={handleClose}
          isResist={true} // Set to true if you don't want modal to close when overlay is clicked
        >
          <p>{`Anda ingin menghapus ${nama_produk} ?`}</p>
        </Modal>
      )}
      ;
    </>
  );
};

export default FormEditProduct;
