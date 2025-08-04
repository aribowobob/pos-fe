import { useState } from 'react';

import { useUserStore } from '@/lib/store/user-store';
import { useQuery } from '@tanstack/react-query';
import { getSalesReportFn } from '../fetchers';

export const useSalesReport = () => {
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [branch, setBranch] = useState('0');
  const { user } = useUserStore();
  const { stores } = user ?? {};

  const { data, error, isLoading } = useQuery({
    queryKey: ['salesReport', startDate, endDate, branch],
    queryFn: () => getSalesReportFn({ startDate, endDate, branchId: branch }),
    enabled: !!startDate && !!endDate,
    refetchOnWindowFocus: false,
  });

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    branch,
    setBranch,
    stores: stores ?? [],

    data,
    error,
    isLoading,
  };
};
