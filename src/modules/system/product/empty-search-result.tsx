import React from 'react';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

interface EmptySearchResultProps {
  message: string;
}
const EmptyProductSearchResult: React.FC<EmptySearchResultProps> = ({
  message,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NoSymbolIcon className="w-32 h-32 mb-8 text-slate-500 font-extralight" />
      <div className="text-slate-500 text-center">{message}</div>
    </div>
  );
};

export default EmptyProductSearchResult;
