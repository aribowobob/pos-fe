import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import { EmptyCart, LoadingFullScreen } from '@components';
import { useSales } from '@store';
import { getRuntimeEnv } from '@utils';

import SalesCartItems from './sales-cart-item';

const SalesCart = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const getCartUrl = `${API_URL}/sales-transaction/list`;
  const [loading, setLoading] = useState(false);
  const { items, setData } = useSales();
  const getCart = async () => {
    setLoading(true);

    const getCartResponse = await fetch(getCartUrl, {
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    })
      .catch(() => {
        alert('Error get cart');
      })
      .finally(() => {
        setLoading(false);
      });

    if (getCartResponse) {
      const { code, data } = await getCartResponse.json();

      if (code === 200 && !!data) {
        setData({ ...data });
      }
    }
  };

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {loading && <LoadingFullScreen />}
    </div>
  );
};

export default SalesCart;
