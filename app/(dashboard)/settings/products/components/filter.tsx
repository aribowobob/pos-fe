'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

const Filter = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  // State for search input
  const [searchInput, setSearchInput] = useState('');

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct new URL with search param and reset page to 1
    const params = new URLSearchParams(searchParams);
    params.set('search', searchInput);
    params.set('page', '1');
    setSearchInput(''); // Clear input after search

    push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <Card className="p-2 flex-row shadow-none rounded-sm gap-2">
        <form onSubmit={handleSearch} className="flex gap-2 grow">
          <div className="relative w-full">
            <Input
              placeholder="Cari produk..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="grow rounded-sm pr-10"
              required
            />
            {searchInput.length > 0 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                type="button"
                onClick={() => {
                  setSearchInput('');
                }}
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <Button type="submit">Cari</Button>
        </form>

        <Separator orientation="vertical" className="!h-auto" />

        <Link href="/settings/products/add">
          <Button>Tambah Produk</Button>
        </Link>
      </Card>

      {currentSearch && (
        <div className="text-xs bg-secondary text-muted-foreground py-1 px-2 border border-border rounded-sm w-fit flex items-center gap-1">
          <div>
            Cari: <strong>{currentSearch}</strong>
          </div>
          <button
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('search');
              params.set('page', '1'); // Reset to first page
              push(`?${params.toString()}`);
            }}
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
