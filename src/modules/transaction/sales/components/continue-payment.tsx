import { Button, StickyFooter } from '@/components';

type ContinuePaymentProps = {
  onNext: () => void;
};

const ContinuePayment = ({ onNext }: ContinuePaymentProps) => {
  return (
    <StickyFooter>
      <div className="bg-white px-4 pt-4 py-6 flex gap-4 justify-between items-center">
        <div className="grow">
          <p className="mb-1 text-xs leading-normal">Subtotal</p>
          <p className="text-base font-semibold leading-normal">Rp0</p>
        </div>

        <Button onClick={onNext}>Lanjutkan Pembayaran</Button>
      </div>
    </StickyFooter>
  );
};

export default ContinuePayment;
