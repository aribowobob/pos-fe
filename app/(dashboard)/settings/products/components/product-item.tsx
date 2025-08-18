import { useState } from 'react';

import { Edit, EllipsisVertical, Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductType } from '@/lib/types';
import useDeleteProduct from '../hooks/useDeleteProduct';
import { handleApiError } from '@/lib/api/api-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';

interface ProductItemProps {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { push } = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteProduct = useDeleteProduct();
  const handleDeleteProduct = async () => {
    try {
      setShowDeleteDialog(false);
      const result = await deleteProduct.mutateAsync(product.id);
      if (result.data) {
        toast.success('Produk berhasil dihapus.');
      } else {
        toast.error('Gagal menghapus produk.');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div key={product.id} className="border border-border rounded-sm p-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-muted-foreground text-xs">{`SKU: ${product.sku}`}</p>
          <p className="font-medium">
            {product.name}
            <small className="ml-1 text-muted-foreground">{`(${product.unit_name})`}</small>
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="cursor-pointer h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              onClick={() => push(`/settings/products/${product.id}/edit`)}
            >
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-end justify-between mt-2 gap-4">
        <div className="flex items-start gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Harga Beli</span>
            <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">
              {formatCurrency(product.purchase_price)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Harga Jual</span>
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
              {formatCurrency(product.sale_price)}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          {product.category_name && (
            <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs">
              {product.category_name}
            </span>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus {product.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus produk dari sistem. Semua data terkait
              produk ini akan hilang. Apakah Anda yakin ingin melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>
              Ya, hapus!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductItem;
