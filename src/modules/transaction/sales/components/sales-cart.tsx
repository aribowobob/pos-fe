import { EmptyCart, LoadingSalesCartItem } from '@components';
import { useSalesCart } from '@hooks';
import { useSales } from '@store';

import SalesCartItems from './sales-cart-item';

const SalesCart = () => {
  const { items, loading } = useSales();
  const { removeItem } = useSalesCart();

  if (loading) {
    const loadingItems = items.length > 0 ? items.length : 1;

    return (
      <div className="pt-4">
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: loadingItems }).map((_, index) => (
            <LoadingSalesCartItem key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <SalesCartItems key={item.id} data={item} onRemove={removeItem} />
          ))}
        </div>
      ) : (
        <EmptyCart text="Sekarang keranjangmu kosong" />
      )}
    </div>
  );
};

export default SalesCart;
