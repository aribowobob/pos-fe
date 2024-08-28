import { useSales } from '@store';
import { money } from '@utils';

const SummaryItems = () => {
  const { items, subTotal } = useSales();

  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-base leading-5">Rincian</p>

      <ol className="flex flex-col gap-4">
        {items.map((item, index) => {
          const {
            name,
            qty,
            base_price,
            sale_price,
            discount_type,
            discount_value,
            discount_amount,
          } = item;
          const totalPrice = sale_price * qty;
          const strDiscount =
            discount_type === 'PERCENTAGE'
              ? `(-${discount_value}%)`
              : `(-${money(discount_value)})`;
          const txtPriceCalculation = [
            money(base_price),
            discount_amount > 0 ? strDiscount : null,
            'x',
            qty,
            '=',
            money(totalPrice),
          ]
            .filter(strItem => !!strItem)
            .join(' ');

          return (
            <li key={item.id} className="flex w-full gap-2">
              <span className="min-w-[24px]">{index + 1}.</span>
              <span className="grow">
                <span className="block">{name}</span>
                <span className="block mt-1 text-right">
                  {txtPriceCalculation}
                </span>
              </span>
            </li>
          );
        })}

        <li className="flex w-full gap-1 pt-4 border-t border-dashed border-slate-500">
          <span className="grow text-right">Total</span>
          <span className="shrink">=</span>
          <span className="shrink">{money(subTotal)}</span>
        </li>
      </ol>
    </div>
  );
};

export default SummaryItems;
