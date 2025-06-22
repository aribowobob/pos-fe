'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Filter = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  // State for search input
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct new URL with search param and reset page to 1
    const params = new URLSearchParams(searchParams);
    params.set('search', searchInput);
    params.set('page', '1');

    push(`?${params.toString()}`);
  };

  return (
    <Card className="p-2 flex-row shadow-none rounded-sm gap-2">
      <form onSubmit={handleSearch} className="flex gap-2 grow">
        <Input
          placeholder="Cari produk..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="grow rounded-sm"
        />
        <Button type="submit">Cari</Button>
      </form>

      <Separator orientation="vertical" className="!h-auto" />

      <Link href="/settings/products/add">
        <Button>Tambah Produk</Button>
      </Link>
    </Card>
  );
};

export default Filter;
