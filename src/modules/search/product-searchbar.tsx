import { useState } from 'react';
import type { FC } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { TextInput } from '@components';

type SearchProductProps = {
  onSubmit: (keyword: string) => void;
};

const SearchProduct: FC<SearchProductProps> = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState('');
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(keyword);
  };

  return (
    <div className="p-4 border-t border-slate-500 bg-white">
      <form onSubmit={handleSubmitSearch}>
        <TextInput
          type="text"
          name="keyword"
          placeholder="Cari produk apa?"
          prefix={
            <button type="submit" className="p-0 m-0 flex items-center">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
          }
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchProduct;
