import { useRouter } from 'next/router';

import { Button, CircleButton, StickyFooter } from '@/components';
import { useSales } from '@store';
import { money } from '@utils';

type ContinuePaymentProps = {
  onNext: () => void;
};

const ContinuePayment = ({ onNext }: ContinuePaymentProps) => {
  const { push } = useRouter();
  const { items, subTotal } = useSales();
  const isEmtpyCart = (items || []).length === 0;

  return (
    <StickyFooter>
      <div className="bg-white px-4 pt-4 py-6 flex gap-4 justify-between items-center relative">
        <div className="grow">
          <p className="mb-1 text-xs leading-normal">Subtotal</p>
          <p className="text-base font-semibold leading-normal">
            {money(subTotal || 0)}
          </p>
        </div>

        <Button onClick={onNext} disabled={isEmtpyCart}>
          Lanjutkan Pembayaran
        </Button>
        <CircleButton
          onClick={() => {
            push('/transaction/sales/search-product');
          }}
          className="absolute right-4 bottom-28"
        />
      </div>
    </StickyFooter>
  );
};

export default ContinuePayment;
