import { Button, CurrencyInput, TextInput, Modal } from '@components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BottomSheet } from '@components';
import { useConfigProducts } from '@store';
import { ProductType } from '@types';
import { useProducts } from '@hooks';

interface IEditProductProps {
  id?: number | null | undefined;
  open: boolean;
  onSubmit: (formData: ProductType) => void;
  onCancel: () => void;
}

const dataAwal = {
  id: 0,
  sku: '',
  name: '',
  purchase_price: 0,
  sale_price: 0,
  unit_name: '',
};

const FormProduct: React.FC<IEditProductProps> = ({
  open,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProductType>(dataAwal);

  const {
    product: productById,
    setDataProduct,
    selectedById,
    deletedById,
    setDeletedById,
  } = useConfigProducts();

  const { fetchDataProductById } = useProducts();

  useEffect(() => {
    if (selectedById === null || selectedById === 0) {
      setFormData(dataAwal);
    } else {
      fetchDataProductById();
    }
  }, [open, selectedById]);

  useEffect(() => {
    console.log('productById : ', productById);
    if (!!productById && !Array.isArray(productById)) {
      setFormData({
        id: productById?.id,
        name: productById?.name,
        sku: productById?.sku,
        purchase_price: productById?.purchase_price,
        sale_price: productById?.sale_price,
        unit_name: productById?.unit_name,
      });
    }
  }, [productById]);

  const { sku, name, purchase_price, sale_price, unit_name } = formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = () => {
    alert(`Data ${name} sudah dihapus`);
    setDeletedById(deletedById);
  };

  const handleSubmit = () => {
    if (typeof formData.sale_price === 'string') {
      formData.sale_price = parseInt(
        (formData.sale_price as string).replace(/,/g, ''),
        10
      );
    }

    // purchase_price sudah dalam bentuk number, tidak perlu diubah jika sudah number
    if (typeof formData.purchase_price === 'string') {
      formData.purchase_price = parseInt(
        (formData.purchase_price as string).replace(/,/g, ''),
        10
      );
    }
    setDataProduct(formData);
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
        title={
          selectedById !== null && selectedById > 0
            ? 'Update Data produk'
            : 'Tambah Produk Baru'
        }
        onClose={handleCancle}
        footer={
          selectedById !== null && selectedById > 0 ? (
            <div className="flex gap-4">
              <Button
                color="danger"
                ghost
                onClick={() => setDeletedById(selectedById)}
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
            name="sku"
            value={sku}
            onChange={handleChange}
            className="mb-4"
          />
          <TextInput
            label="Nama Produk"
            name="name"
            value={name}
            onChange={handleChange}
            className="mb-4"
          />
          <CurrencyInput
            name="purchase_price"
            value={purchase_price || 0}
            label="Harga Beli"
            onChange={handleChange}
            className="mb-4"
          />
          <CurrencyInput
            name="sale_price"
            value={sale_price}
            label="Harga Jual"
            onChange={handleChange}
            className="mb-4"
          />
          <TextInput
            label="Nama Satuan"
            name="unit_name"
            value={unit_name}
            onChange={handleChange}
            className="mb-4"
            message="Boleh dikosongkan. Apabila dikosongkan akan diberi nilai default
          “unit”"
          />
        </div>
      </BottomSheet>
      {deletedById !== null && deletedById > 0 && (
        <Modal
          title="Konfirmasi Hapus Data"
          cancelText="Ya, hapus!"
          onCancel={handleDelete}
          onClose={() => setDeletedById}
          okText="Batal"
          onOk={() => setDeletedById(null)}
          isResist={true} // Set to true if you don't want modal to close when overlay is clicked
        >
          <p>{`Anda ingin menghapus ${name} ?`}</p>
        </Modal>
      )}
    </>
  );
};

export default FormProduct;
