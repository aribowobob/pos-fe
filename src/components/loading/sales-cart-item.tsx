import type { FC } from 'react';

const LoadingSalesCartItem: FC = () => {
  return (
    <div className="bg-white p-4 flex flex-col gap-4 w-full rounded">
      <div className="flex gap-4 items-center">
        <div className="h-6 w-20 bg-slate-200 rounded animate-pulse" />
      </div>

      <div className="flex justify-between items-end">
        <span className="h-5 bg-slate-200 rounded animate-pulse w-32" />
        <span className="h-5 bg-slate-200 rounded animate-pulse w-16" />
      </div>

      <div className="border-t border-slate-300 pt-4 flex gap-4 justify-between items-center w-full">
        <span className="h-6 bg-slate-200 rounded animate-pulse w-20" />
        <span className="h-[34px] bg-slate-200 rounded animate-pulse w-48" />
      </div>
    </div>
  );
};

export default LoadingSalesCartItem;
