import { getData } from '@/lib/api/api-client';
import {
  APIResponse,
  SalesReportRequest,
  SalesReportResponse,
} from '@/lib/types';

export const getSalesReportFn = async (params: SalesReportRequest) => {
  const { startDate, endDate, branchId } = params;
  if (!startDate || !endDate) {
    throw new Error('Missing required parameters: startDate or endDate');
  }
  try {
    const response = await getData<APIResponse<SalesReportResponse>>(
      '/api/sales/report',
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
