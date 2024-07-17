import { ReactNode } from 'react';

type StickyFooterProps = {
  children: ReactNode;
};
const StickyFooter = ({ children }: StickyFooterProps) => {
  return (
    <div className="fixed bottom-0 bg-slate-200 w-full sm:max-w-[608px] md:max-w-[736px] lg:max-w-[992px] xl:max-w-[1248px] 2xl:max-w-[1504px]">
      {children}
    </div>
  );
};

export default StickyFooter;
