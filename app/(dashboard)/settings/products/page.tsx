'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { EllipsisVertical, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

// Sample product data - in a real app, this would come from an API
const sampleProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  code: `P${String(i + 1).padStart(3, '0')}`,
  price: Math.floor(Math.random() * 1000000) + 10000, // Random price between 10k and 1M
  stock: Math.floor(Math.random() * 100), // Random stock between 0 and 99
}));

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current search params
  const currentSearch = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  // State for search input
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct new URL with search param and reset page to 1
    const params = new URLSearchParams(searchParams);
    params.set('search', searchInput);
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    router.push(`?${params.toString()}`);
  };

  // Filter products based on search
  const filteredProducts = currentSearch
    ? sampleProducts.filter(
        product =>
          product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
          product.code.toLowerCase().includes(currentSearch.toLowerCase())
      )
    : sampleProducts;

  // Calculate pagination
  const pageSize = 20;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/settings">Pengaturan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-semibold">Pengaturan Produk</h1>

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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode SKU</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead className="text-right">Harga Jual</TableHead>
              <TableHead className="text-center">Stok</TableHead>
              <TableHead className="text-center">
                <Menu className="h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {product.price.toLocaleString('id-ID')}
                </TableCell>
                <TableCell className="text-center">{product.stock}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical className="cursor-pointer h-4 w-4" />
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-center py-4 sticky bottom-0 bg-white">
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
