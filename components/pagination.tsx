import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
  page: number;
  // size: number;
  // total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  // size,
  // total,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null; // No pagination needed if there's only one page
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ArrowLeftToLine className="size-4" />
      </Button>
      <p className="text-sm text-muted-foreground">{`${page} / ${totalPages}`}</p>
      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ArrowRightToLine className="size-4" />
      </Button>
    </div>
  );
};
