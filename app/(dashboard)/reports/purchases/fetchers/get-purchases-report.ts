import { getData } from '@/lib/api/api-client';
import {
  APIResponse,
  PurchasesReportRequest,
  PurchasesReportResponse,
} from '@/lib/types';

export const getPurchasesReportFn = async (params: PurchasesReportRequest) => {
  const { startDate, endDate, branchId } = params;
  if (!startDate || !endDate) {
    throw new Error('Missing required parameters: startDate or endDate');
  }
  try {
    const response = await getData<APIResponse<PurchasesReportResponse>>(
      '/api/purchases/report',
      {
        params: {
          store_id: branchId,
          start_date: startDate,
          end_date: endDate,
        },
      }
    );

    if (response.status !== 'success') {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
