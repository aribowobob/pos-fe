import clsx from 'clsx';

import { ProductType } from '@types';
import { LoadingSearchProduct } from '@components';

type ProductListProps = {
  data: ProductType[];
  storeInitial: string;
  isLoading?: boolean;
  onProductSelect: (product: ProductType) => void;
  onSelectEmptyStock?: () => void;
};

const ProductList = ({
  data,
  storeInitial,
  isLoading,
  onProductSelect,
  onSelectEmptyStock,
}: ProductListProps) => {
  const handleClick = (product: ProductType) => {
    onProductSelect(product);
  };

  if (isLoading) {
    return <LoadingSearchProduct />;
  }

  if (!isLoading && !data.length) {
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
              onSelectEmptyStock?.();
            }
          }}
          className="block p-4 bg-white hover:bg-slate-200 cursor-pointer border-t border-slate-200 select-none"
        >
          <p
            className={clsx('font-medium text-sm m-0', {
              'text-slate-400': product.stock === 0,
            })}
          >
            {product.name}
          </p>
          <p className="text-xs flex w-full justify-between">
            <span
              className={clsx({ 'text-slate-400': product.stock === 0 })}
            >{`Harga: ${product.sale_price}`}</span>
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
