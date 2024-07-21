import { EmptyCart } from '@components';
import { useSales } from '@store';

import SalesCartItems from './sales-cart-items';

const SalesCart = () => {
  const { items } = useSales();

  return (
    <div className="pt-4">
      {items.length > 0 ? (
        <SalesCartItems />
      ) : (
        <EmptyCart text="Sekarang keranjangmu kosong" />
      )}
    </div>
  );
};

export default SalesCart;
