import clsx from 'clsx';

export type ProductItemType = {
  id: number;
  name: string;
  price: number;
  stock: number;
};
type ProductListProps = {
  data: ProductItemType[];
  storeInitial: string;
  onProductSelect: (product: ProductItemType) => void;
};

const ProductList = ({
  data,
  storeInitial,
  onProductSelect,
}: ProductListProps) => {
  const handleClick = (product: ProductItemType) => {
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
          onClick={() => handleClick(product)}
          className="block p-4 bg-white hover:bg-slate-100 cursor-pointer border-t border-slate-200"
        >
          <p className="font-medium text-sm m-0">{product.name}</p>
          <p className="text-xs flex w-full justify-between">
            <span className="grow">{`Harga: ${product.price}`}</span>
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
