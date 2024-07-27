import React from 'react';

interface IProductProps {
  kode_sku: string;
  nama_produk: string;
  harga_beli: string;
  harga_jual: string;
  nama_satuan: string;
}

const ProductCard = ({
  kode_sku,
  nama_produk,
  harga_beli,
  harga_jual,
  nama_satuan,
}: IProductProps) => {
  const editProduct = (value: string) => {
    alert(`You edit ${value}`);
  };

  return (
    <div
      className="w-full flex flex-col bg-white mb-4 p-4 rounded-lg"
      onClick={() => editProduct('SC')}
    >
      <div className="p-1">
        <span className="font-semibold">SKU</span> {kode_sku}
      </div>
      <div className="p-1">{nama_produk}</div>
      <div className="flex gap-2 justify-between">
        <div className="p-1 flex gap-2">
          <span className="bg-red-600 rounded-md p-1 min-w-20 text-center">
            Rp{harga_beli}
          </span>
          <span className="bg-teal-600 rounded-md p-1 min-w-20 text-center">
            Rp{harga_jual}
          </span>
        </div>
        <div className="p-1">Satuan: {nama_satuan}</div>
      </div>
    </div>
  );
};
export default ProductCard;
