import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const PrintPurchasesTransaction = () => {
  return (
    <Button variant="secondary">
      <Printer className="w-4 h-4" />
      Cetak Struk
    </Button>
  );
};
