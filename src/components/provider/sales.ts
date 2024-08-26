import { useEffect } from 'react';

import { useUser } from '@store';
import { useSalesCart } from '@hooks';

const SalesProvider = () => {
  const { store } = useUser();
  const { id: storeId } = store || {};

  const { fetchSalesCart } = useSalesCart();

  useEffect(() => {
    if (!!storeId && fetchSalesCart) {
      fetchSalesCart();
    }
  }, [fetchSalesCart, storeId]);

  return null;
};

export default SalesProvider;
