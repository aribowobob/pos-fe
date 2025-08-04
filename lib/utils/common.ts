import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { DiscountType, ItemSubTotalCalculationParam } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Logging function that only logs in development mode
 * @param args Arguments to log
 */
export const devLog = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

/**
 * Format a number as currency with Indonesian Rupiah format
 * @param value Number to format
 * @param options Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  value?: number | string,
  options?: { withSymbol?: boolean }
): string {
  if (value === undefined || value === null) {
    return '';
  }
  const withSymbol = options?.withSymbol ?? true;
  const formatter = new Intl.NumberFormat('id-ID', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return '';
  }

  return formatter.format(value);
}

/**
 * Show error toast with better formatting
 * @param error The error object or message
 */
export function handleError(error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  toast.error(errorMessage || 'Terjadi kesalahan');
  console.error(error);
}

export function itemSubTotalCalculation(
  item: ItemSubTotalCalculationParam
): string {
  const basePrice = formatCurrency(item.base_price);
  let discount = '';
  if (item.discount_type === DiscountType.FIXED && item.discount_value > 0) {
    discount = `(- ${formatCurrency(item.discount_value)})`;
  } else if (
    item.discount_type === DiscountType.PERCENTAGE &&
    item.discount_value > 0
  ) {
    discount = `(- ${item.discount_value}%)`;
  }
  const subTotal = parseFloat(item.sale_price) * item.qty;
  const subTotalCalculationLabel = [
    basePrice,
    discount,
    `x ${item.qty}`,
    '=',
    formatCurrency(subTotal),
  ]
    .filter(Boolean)
    .join(' ');

  return subTotalCalculationLabel;
}
