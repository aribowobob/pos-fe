import { ShoppingCartIcon } from '@heroicons/react/24/outline';

type EmptyCartProps = {
  text: string;
};

const EmptyCart = ({ text }: EmptyCartProps) => {
  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center px-4 py-8">
      <ShoppingCartIcon className="w-32 h-32 text-slate-400" />
      <p className="font-medium text-slate-400 leading-normal text-center">
        {text}
      </p>
    </div>
  );
};

export default EmptyCart;
