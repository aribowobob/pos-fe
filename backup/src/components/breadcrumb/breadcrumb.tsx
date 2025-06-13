import { Fragment } from 'react';

import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type BreadcrumbItem = {
  label: string;
  onClick?: () => void;
};
type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  currentStep?: number;
};

const Breadcrumb = ({ items, currentStep = 0 }: BreadcrumbProps) => {
  if (Array.isArray(items) && (items || []).length > 0) {
    const itemsLength = items.length;

    return (
      <div className="flex gap-2 items-center">
        {items.map((item, index) => {
          const { label, onClick } = item;
          const isLast = index === itemsLength - 1;

          return (
            <Fragment key={label}>
              <button
                type="button"
                className={clsx(
                  'text-xs leading-normal',
                  index > currentStep ? 'text-slate-400' : 'text-slate-900'
                )}
                onClick={typeof onClick === 'function' ? onClick : () => null}
              >
                {label}
              </button>
              {!isLast && (
                <ChevronDoubleRightIcon className="w-3.5 h-3.5 text-slate-400" />
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }

  return null;
};

export default Breadcrumb;
