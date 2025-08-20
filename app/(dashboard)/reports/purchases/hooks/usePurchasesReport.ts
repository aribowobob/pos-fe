import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAfter, isValid, parseISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserStore } from '@/lib/store/user-store';
import { getPurchasesReportFn } from '../fetchers';

// Form validation schema for startDate, endDate, and branch
const formSchema = z
  .object({
    startDate: z.string().refine(date => isValid(parseISO(date)), {
      message: 'Harus diisi',
    }),
    endDate: z.string().refine(date => isValid(parseISO(date)), {
      message: 'Harus diisi',
    }),
    branch: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const { startDate, endDate } = values;
    if (
      startDate &&
      endDate &&
      isAfter(parseISO(startDate), parseISO(endDate))
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Pilih yang benar',
      });
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'Pilih yang benar',
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;

export const usePurchasesReport = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;
  const branch = searchParams.get('branch') || undefined;
  const isValidstartDate = isValid(parseISO(startDate ?? ''));
  const isValidEndDate = isValid(parseISO(endDate ?? ''));
  const isValidFilter =
    isValidstartDate &&
    isValidEndDate &&
    !isAfter(parseISO(startDate ?? ''), parseISO(endDate ?? ''));
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: isValidFilter ? startDate : '',
      endDate: isValidFilter ? endDate : '',
      branch: branch ?? '0',
    },
  });
  const onSubmit = async (data: FormData) => {
    const { startDate, endDate, branch } = data;
    const params = new URLSearchParams();
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (branch) params.set('branch', branch);

    replace(`/reports/purchases?${params.toString()}`);
  };
  const { user } = useUserStore();
  const { stores } = user ?? {};

  const { data, error, isLoading } = useQuery({
    queryKey: ['purchasesReport', startDate, endDate, branch],
    queryFn: () =>
      getPurchasesReportFn({
        startDate,
        endDate,
        branchId: branch ? Number(branch) : undefined,
      }),
    enabled: isValidFilter,
    refetchOnWindowFocus: false,
  });

  return {
    form,
    onSubmit,

    stores: stores ?? [],

    data,
    error,
    isLoading,
    isValidFilter,
  };
};
