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
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
