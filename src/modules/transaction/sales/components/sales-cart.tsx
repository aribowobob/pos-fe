import { EmptyCart } from '@components';
import { useSales } from '@store';

import SalesCartItems from './sales-cart-item';

const SalesCart = () => {
  const { items } = useSales();

  return (
    <div className="pt-4">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <SalesCartItems key={item.productId} data={item} />
          ))}
        </div>
      ) : (
        <EmptyCart text="Sekarang keranjangmu kosong" />
      )}
    </div>
  );
};

export default SalesCart;
