import { Button, CurrencyInput, TextInput, Modal } from '@components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BottomSheet } from '@components';
import { IProductProps2 } from '@types';

interface IEditProductProps {
  id?: number;
  open: boolean;
  onSubmit: (formData: IProductProps2) => void;
  onCancel: () => void;
}

const dataAwal = {
  kode_sku: '',
  nama_produk: '',
  harga_beli: '',
  harga_jual: '',
  nama_satuan: '',
};

const FormProduct: React.FC<IEditProductProps> = ({
  id,
  open,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<IProductProps2>(dataAwal);

  const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!id) {
      setFormData(dataAwal);
    } else {
      console.log('Update Data');
      //berarti update
      //call api get product by Id
    }
  }, [open, id]);

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

  const handleSubmit = () => {
    onSubmit(formData); // Kirim formData ke parent
  };

  const handleCancle = () => {
    setFormData(dataAwal);
    onCancel();
  };

  return (
    <>
      <BottomSheet
        open={open}
        title={!!id ? 'Update Data produk' : 'Tambah Produk Baru'}
        onClose={handleCancle}
        footer={
          !!id ? (
            <div className="flex gap-4">
              <Button
                color="danger"
                ghost
                onClick={() => setIsShowDeleteConfirm(true)}
              >
                Hapus
              </Button>
              <Button block className="grow" onClick={() => handleSubmit()}>
                Simpan Perubahan
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => handleSubmit()}>
              Simpan
            </Button>
          )
        }
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
            name="harga_beli"
            value={harga_beli}
            label="Harga Beli"
            onChange={handleChange}
            className="mb-4"
          />
          <CurrencyInput
            name="harga_jual"
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
        </div>
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

export default FormProduct;
