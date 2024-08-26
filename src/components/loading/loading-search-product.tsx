import type { FC } from 'react';

const LoadingSearchProduct: FC = () => {
  return (
    <ul>
      {[...new Array(3)].map((_, index) => (
        <li
          key={index}
          className="block p-4 bg-white border-t border-slate-200 select-none"
        >
          <div className="h-5 bg-slate-200 rounded animate-pulse w-2/3" />
          <div className="flex w-full justify-between mt-1">
            <span className="h-3 bg-slate-200 rounded animate-pulse w-16" />
            <span className="h-3 bg-slate-200 rounded animate-pulse w-8" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LoadingSearchProduct;
