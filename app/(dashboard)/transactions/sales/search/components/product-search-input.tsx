'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';

import { Input } from '@/components/ui/input';

interface ProductSearchInputProps {
  onSearchChange: (search: string) => void;
  placeholder?: string;
}

export const ProductSearchInput = ({
  onSearchChange,
  placeholder = 'Cari produk...',
}: ProductSearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  // Call the search change handler when debounced value changes
  useEffect(() => {
    onSearchChange(debouncedSearchValue);
  }, [debouncedSearchValue, onSearchChange]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 size-6 -translate-y-1/2 rounded-sm text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="pl-13 h-12 !text-xl"
      />
    </div>
  );
};
