import clsx from 'clsx';

import { ProductType } from '@types';

type ProductListProps = {
  data: ProductType[];
  storeInitial: string;
  onProductSelect: (product: ProductType) => void;
};

const ProductList = ({
  data,
  storeInitial,
  onProductSelect,
}: ProductListProps) => {
  const handleClick = (product: ProductType) => {
    onProductSelect(product);
  };

  if (!data.length) {
    return null;
  }

  return (
    <ul>
      {data.map(product => (
        <li
          key={product.id}
          onClick={() => {
            if (Number(product?.stock || 0) > 0) {
              handleClick(product);
            } else {
              alert('Stok habis');
            }
          }}
          className="block p-4 bg-white hover:bg-slate-100 cursor-pointer border-t border-slate-200"
        >
          <p className="font-medium text-sm m-0">{product.name}</p>
          <p className="text-xs flex w-full justify-between">
            <span className="grow">{`Harga: ${product.sale_price}`}</span>
            <span
              className={clsx({ 'text-red-500': product.stock === 0 })}
            >{`Stok ${storeInitial}: ${product.stock}`}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
